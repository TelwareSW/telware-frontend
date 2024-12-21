export let callState = "idle";
const stunServers = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun.l.google.com:5349"] }
  ]
};
export async function getVoiceInput(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
}

const RemoteStream: MediaStream = new MediaStream();
export const connectToPeer = async (
  peerConnection: RTCPeerConnection | null,
  localStream: MediaStream | null
) => {
  callState = "connecting";
  peerConnection = new RTCPeerConnection(stunServers);
  if (!localStream) localStream = await getVoiceInput();
  console.log(localStream);
  localStream?.getTracks().forEach((t) => {
    peerConnection.addTrack(t, localStream);
  });

  peerConnection.ontrack = (e) => {
    e.streams[0]?.getTracks().forEach((track) => RemoteStream.addTrack(track));
  };

  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(null);
    }, 10000);

    peerConnection.onicecandidate = (event) => {
      if (!event.candidate) {
        clearTimeout(timeout);
        resolve(null);
      }
    };
  });
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  return JSON.stringify(offer);
};
export const createOffer = async (
  peerConnection: RTCPeerConnection | null,
  localStream: MediaStream | null
) => {
  peerConnection = new RTCPeerConnection(stunServers);
  if (!localStream) localStream = await getVoiceInput();
  console.log(localStream);
  localStream?.getTracks().forEach((t) => {
    peerConnection.addTrack(t, localStream);
  });

  peerConnection.ontrack = (e) => {
    e.streams[0]?.getTracks().forEach((track) => RemoteStream.addTrack(track));
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  return JSON.stringify(offer);
};
export const handleIceCandidates = async (
  peerConnection: RTCPeerConnection,
  sendCandidate: (candidate: string) => void
) => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(null);
    }, 10000);

    peerConnection.onicecandidate = (event) => {
      if (!event.candidate) {
        clearTimeout(timeout);
        resolve(null);
      }
      sendCandidate(JSON.stringify(event.candidate));
    };
  });
};
export const createAnswer = async (offer: string) => {
  await connectToPeer();
  const offer_parsed = JSON.parse(offer);
  await peerConnection.setRemoteDescription(offer_parsed);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  return JSON.stringify(answer);
};
export const startCall = async (answer: string) => {
  callState = "ongoing";
  const offer_parsed = JSON.parse(answer);
  await peerConnection.setRemoteDescription(offer_parsed);
};
