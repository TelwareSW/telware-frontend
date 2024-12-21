export interface CallContextType {
  callId: React.RefObject<string | null>;
  senderId: React.RefObject<string | null>;
  chatId: React.RefObject<string | null>;
  callAccepted: React.RefObject<string | null>;
  joinCall: (newCallId: string, newSenderId: string, newChatId: string) => void;
  endCall: () => void;
  acceptCall: () => void;
  startPeerConnection: () => Promise<void>;
  offer: React.RefObject<string | null>;
  answer: React.RefObject<string | null>;
  peerConnection: React.RefObject<RTCPeerConnection | null>;
  //recieveAnswer: (answer: string) => Promise<void>;
  recieveICE: (candidate: RTCIceCandidateInit) => Promise<void>;
}
export type CallStatus = "inactive" | "active" | "calling" | "incoming" | "ended";