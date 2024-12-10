export let callState = "idle";
const stunServers = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun.l.google.com:5349"] },
  ],
};
async function getVoiceInput(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
}
export let peerConnection: RTCPeerConnection;
let localStream: MediaStream | null;
let RemoteStream: MediaStream;
export const connectToPeer = async () => {
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

export const createAnswer = async (offer: string) => {
  await connectToPeer();
  const offer_parsed = JSON.parse(offer);
  await peerConnection.setRemoteDescription(offer_parsed);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  return JSON.stringify(answer);
};
export const startCall = async (answer: string) => {
  callState = "ongoing"
  const offer_parsed = JSON.parse(answer);
  await peerConnection.setRemoteDescription(offer_parsed);
  //start call
};
