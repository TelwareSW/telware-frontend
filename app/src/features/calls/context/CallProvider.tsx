import React, { ReactNode, useCallback, useRef } from "react";
import { CallContext } from "./CallContext";
import { useAppSelector } from "@hooks/useGlobalState";
import { callStatusEmitter } from "./callStatusEmitter";
import { CallStatus } from "types/calls";
import { TURN_USERNAME, TURN_PASSWORD } from "@constants";
console.log(TURN_PASSWORD, TURN_USERNAME);
const Servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: TURN_USERNAME,
      credential: TURN_PASSWORD
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: TURN_USERNAME,
      credential: TURN_PASSWORD
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: TURN_USERNAME,
      credential: TURN_PASSWORD
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: TURN_USERNAME,
      credential: TURN_PASSWORD
    }
  ]
};
export const CallProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const callIdRef = useRef<string | null>(null);
  const senderIdRef = useRef<string | null>(null);
  const chatIdRef = useRef<string | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const offer = useRef<RTCSessionDescriptionInit | null>(null);
  const callStatus = useRef<CallStatus>("inactive");
  const clientIdRef = useRef<
    Map<string, { connection: RTCPeerConnection | null; offerSent: boolean }>
  >(new Map());

  const addClientId = useCallback(
    (
      clientId: string,
      connection: RTCPeerConnection | null,
      offerSent: boolean
    ) => {
      clientIdRef.current.set(clientId, { connection, offerSent });
    },
    []
  );

  const removeClientId = useCallback((clientId: string) => {
    if (clientIdRef.current.has(clientId)) {
      clientIdRef.current.delete(clientId);
    }
  }, []);

  const clearClientIds = useCallback(() => {
    clientIdRef.current.clear();
  }, []);
  const setChatId = useCallback((chatId: string) => {
    chatIdRef.current = chatId;
  }, []);
  const hasClientId = useCallback(
    (clientId: string, offerSent: boolean | null = null) => {
      const clientData = clientIdRef.current.get(clientId);
      return (
        !!clientData &&
        (offerSent === null || clientData.offerSent === offerSent)
      );
    },
    []
  );

  const setCallStatus = useCallback((status: CallStatus) => {
    callStatus.current = status;
    callStatusEmitter.emit("update", status);
  }, []);

  const joinCall = useCallback(
    (newSenderId: string, newChatId: string, newCallId: string) => {
      if (!callIdRef.current) {
        if (newSenderId === userId) {
          setCallStatus("calling");
        } else {
          setCallStatus("incoming");
        }
        callIdRef.current = newCallId;
        senderIdRef.current = newSenderId;
        chatIdRef.current = newChatId;
      }
    },
    [setCallStatus, userId]
  );

  const endCall = useCallback(
    (clientId = null) => {
      if (clientId) {
        const clientData = clientIdRef.current.get(clientId);
        if (clientData?.connection) clientData.connection.close();
        removeClientId(clientId);
      } else {
        setCallStatus("inactive");
        callIdRef.current = null;
        senderIdRef.current = null;
        chatIdRef.current = null;
        if (localStream.current) {
          localStream.current.getTracks().forEach((track) => {
            track.stop();
          });
        }
        clientIdRef.current.forEach((clientData, clientId) => {
          if (clientData.connection) {
            clientData.connection.close();
          }

          removeClientId(clientId);
        });
        const remoteAudioElements = document.querySelectorAll("audio");
        remoteAudioElements.forEach((audio) => audio.remove());

        localStream.current = null;
        clearClientIds();
      }
    },
    [clearClientIds, removeClientId, setCallStatus]
  );

  const mute = () => {
    if (localStream.current)
      localStream.current.getAudioTracks()[0].enabled = false;
  };
  const unmute = () => {
    if (localStream.current)
      localStream.current.getAudioTracks()[0].enabled = true;
  };
  const acceptCall = useCallback(() => {
    if (callIdRef.current && chatIdRef.current) {
      if (
        senderIdRef.current === userId &&
        (!clientIdRef.current || clientIdRef.current.size === 0)
      ) {
        setCallStatus("calling");
      } else {
        setCallStatus("active");
      }
    }
  }, [setCallStatus, userId]);

  const startPeerConnection = useCallback(
    async (clientId: string) => {
      if (!clientId) return null;
      if (!localStream.current) {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
      }

      if (!localStream.current) {
        alert("Failed to get voice input.");
        endCall();
        return null;
      }
      const peerConnection = new RTCPeerConnection(Servers);
      localStream.current.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream.current);
      });
      peerConnection.oniceconnectionstatechange = () => {
        const state = peerConnection.iceConnectionState;

        switch (state) {
          case "connected":
            console.log("Peer connection established.");
            break;
          case "disconnected":
            console.warn("Peer connection disconnected.");
            break;
          case "failed":
            console.error("Peer connection failed. Restarting ICE?");
            break;
          case "closed":
            console.log("Peer connection closed.");
            break;
          default:
            console.log("ICE connection state:", state);
            break;
        }
      };

      peerConnection.ontrack = (event) => {
        console.log("audio");
        if (event.track.kind === "audio") {
          const remoteAudio = document.createElement("audio");
          remoteAudio.srcObject = event.streams[0];
          remoteAudio.autoplay = true;
          remoteAudio.controls = true;
          document.body.appendChild(remoteAudio);
        }
      };
      const offer = await peerConnection.createOffer();
      console.log(clientIdRef.current);
      if (!hasClientId(clientId) || hasClientId(clientId, false)) {
        await peerConnection.setLocalDescription(offer);
        addClientId(clientId, peerConnection, true);
        setCallStatus("active");
        return offer;
      }
      return null;
    },
    [addClientId, endCall, hasClientId, setCallStatus]
  );

  const recieveICE = useCallback(
    async (candidate: RTCIceCandidateInit, senderId: string) => {
      if (hasClientId(senderId, true)) {
        const clientData = clientIdRef.current.get(senderId);
        if (clientData) {
          if (!clientData.connection) return;
          clientData.connection.addIceCandidate(candidate);
        }
      }
    },
    [hasClientId]
  );

  const recieveAnswer = useCallback(
    (data: RTCSessionDescriptionInit, senderId: string) => {
      if (hasClientId(senderId, true)) {
        const clientData = clientIdRef.current.get(senderId);
        if (clientData && clientData.connection) {
          clientData.connection.setRemoteDescription(data);
          setCallStatus("active");
        }
      }
    },
    [hasClientId, setCallStatus]
  );
  const createAnswer = useCallback(
    async (data: RTCSessionDescriptionInit, senderId: string) => {
      if (!senderId || !data) {
        console.warn("Invalid senderId or data provided.");
        return null;
      }

      try {
        const peerConnection = new RTCPeerConnection(Servers);
        if (!localStream.current) {
          localStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
          });
        }

        if (!localStream.current) {
          alert("Failed to get voice input.");
          endCall();
          return null;
        }
        localStream.current.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream.current);
        });

        peerConnection.ontrack = (event) => {
          console.log("adiooo");
          if (event.track.kind === "audio") {
            const remoteAudio = document.createElement("audio");
            remoteAudio.srcObject = event.streams[0];
            remoteAudio.autoplay = true;
            remoteAudio.controls = false;
            document.body.appendChild(remoteAudio);
          }
        };
        peerConnection.oniceconnectionstatechange = () => {
          const state = peerConnection.iceConnectionState;

          switch (state) {
            case "connected":
              console.log("Peer connection established.");
              break;
            case "disconnected":
              console.warn("Peer connection disconnected.");
              break;
            case "failed":
              console.error("Peer connection failed. Restarting ICE?");
              break;
            case "closed":
              console.log("Peer connection closed.");
              break;
            default:
              console.log("ICE connection state:", state);
              break;
          }
        };
        await peerConnection.setRemoteDescription(data);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        addClientId(senderId, peerConnection, false);
        return answer;
      } catch (error) {
        console.error("Error creating answer:", error);
        return null;
      }
    },
    [addClientId, endCall]
  );

  const getPeerConnection = useCallback((clientId: string) => {
    const clientData = clientIdRef.current.get(clientId);
    if (clientData) {
      return clientData.connection;
    }
    return null;
  }, []);

  const contextValue = {
    callId: callIdRef,
    senderId: senderIdRef,
    chatId: chatIdRef,
    startPeerConnection,
    offer,
    clientId: clientIdRef,
    setChatId,
    acceptCall,
    joinCall,
    createAnswer,
    endCall,
    recieveICE,
    recieveAnswer,
    mute,
    unmute,
    getPeerConnection
  };

  return (
    <CallContext.Provider value={contextValue}>{children}</CallContext.Provider>
  );
};
