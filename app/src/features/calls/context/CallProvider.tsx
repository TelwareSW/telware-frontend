import React, { ReactNode, useCallback, useRef } from "react";
import { CallContext } from "./CallContext";
import { useAppSelector } from "@hooks/useGlobalState";
import { createOffer, getVoiceInput } from "../call";
import { callStatusEmitter } from "./callStatusEmitter";
import { CallStatus } from "types/calls";

export const CallProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const userId = useAppSelector((state) => state.user.userInfo.id);

  const callAccepted = useRef<string | null>(null);
  const callIdRef = useRef<string | null>(null);
  const senderIdRef = useRef<string | null>(null);
  const chatIdRef = useRef<string | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const offer = useRef<string | null>(null);
  const answer = useRef<string | null>(null);
  const callStatus = useRef<CallStatus>("inactive");

  const setCallStatus = (status: typeof callStatus.current) => {
    callStatus.current = status;
    console.log(status);
    callStatusEmitter.emit("update", status);
  };

  const joinCall = useCallback(
    (newSenderId: string, newChatId: string, newCallId: string) => {
      console.log(callIdRef.current, newCallId);
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
    [userId]
  );

  const endCall = useCallback(() => {
    setCallStatus("inactive");
    callIdRef.current = null;
    senderIdRef.current = null;
    chatIdRef.current = null;
    callAccepted.current = null;
    peerConnection.current?.close();
    peerConnection.current = null;
    localStream.current = null;
  }, []);

  const acceptCall = useCallback(() => {
    setCallStatus("active");
    callAccepted.current = callIdRef.current;
  }, []);

  const startPeerConnection = useCallback(async () => {
    localStream.current = await getVoiceInput();
    offer.current = await createOffer(
      peerConnection.current,
      localStream.current
    );
  }, []);

  const recieveICE = useCallback(async (candidate: RTCIceCandidateInit) => {
    if (peerConnection.current) {
      try {
        await peerConnection.current.addIceCandidate(candidate);
        console.log("ICE candidate added successfully.");
      } catch (error) {
        console.error("Failed to add ICE candidate:", error);
      }
    }
  }, []);

  const recieveAnswer = useCallback(() => {}, []);

  const contextValue = {
    peerConnection: peerConnection,
    callId: callIdRef,
    senderId: senderIdRef,
    chatId: chatIdRef,
    startPeerConnection,
    offer: offer,
    answer: answer,
    acceptCall,
    callAccepted: callAccepted,
    joinCall,
    endCall,
    recieveICE,
    recieveAnswer
  };

  return (
    <CallContext.Provider value={contextValue}>{children}</CallContext.Provider>
  );
};
