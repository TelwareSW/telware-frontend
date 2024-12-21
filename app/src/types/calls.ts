export interface CallContextType {
  callId: React.RefObject<string | null>;
  senderId: React.RefObject<string | null>;
  chatId: React.RefObject<string | null>;
  clientId: React.RefObject<
    Map<
      string,
      {
        connection: RTCPeerConnection | null;
        offerSent: boolean;
      }
    >
  >;
  // callAccepted: React.RefObject<string | null>;
  joinCall: (newCallId: string, newSenderId: string, newChatId: string) => void;
  endCall: (clientId: string | null) => void;

  acceptCall: () => void;
  startPeerConnection: (
    clientId: string
  ) => Promise<RTCSessionDescriptionInit | null>;
  offer: React.RefObject<RTCSessionDescriptionInit | null>;
  getPeerConnection: (clientId: string) => RTCPeerConnection | null;
  //recieveAnswer: (answer: string) => Promise<void>;
  recieveICE: (
    candidate: RTCIceCandidateInit,
    senderId: string
  ) => Promise<void>;
  createAnswer: (
    data: RTCSessionDescriptionInit,
    senderId: string
  ) => Promise<RTCSessionDescriptionInit | null>;
  setChatId: (chatId: string) => void;
  recieveAnswer: (answer: RTCSessionDescriptionInit, senderId: string) => void;
}
export type CallStatus =
  | "inactive"
  | "active"
  | "calling"
  | "incoming"
  | "ended";
