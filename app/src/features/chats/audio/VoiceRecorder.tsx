import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import RecordInput from "../SendButton";
import { useUploadMedia } from "../media/hooks/useUploadMedia";
import { useMessageSender } from "../hooks/useMessageSender";
import { ChatInputContext } from "../ChatBox";

export type RecordingStates = "idle" | "recording" | "pause";

const VoiceRecorder: React.FC = ({
  recordingMimeType = "audio/webm",
}: {
  recordingMimeType?: string;
}) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { data: voiceNoteURL, mutate: uploadVoiceNote } = useUploadMedia();

  const { isRecording, setIsRecording, setError } =
    useContext(ChatInputContext);

  const { handleSendMessage } = useMessageSender();

  useEffect(() => {
    if (isRecording === "recording") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream, {
            mimeType: recordingMimeType,
          });
          mediaRecorder.current = recorder;

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.current.push(event.data);
            }
          };

          recorder.onstop = () => {
            stream.getTracks().forEach((track) => track.stop());
          };

          recorder.start();
        })
        .catch((err) => {
          setError(`Error accessing microphone: ${err.message}`);
          setIsRecording("idle");
        });
    } else if (isRecording === "idle") {
      // Cleanup media recorder
      mediaRecorder.current?.stop();
      mediaRecorder.current = null;
    }

    return () => {
      mediaRecorder.current?.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorder.current = null;
    };
  }, [isRecording, recordingMimeType, setError, setIsRecording]);

  const handleStartRecording = useCallback(() => {
    audioChunks.current = [];
    setIsRecording("recording");
  }, [setIsRecording]);

  const handleStopRecording = useCallback(() => {
    setIsRecording("pause");
    mediaRecorder.current?.stop();
  }, [setIsRecording]);

  const handleSendRecord = useCallback(() => {
    if (isRecording === "pause") {
      const audioBlob = new Blob(audioChunks.current, {
        type: recordingMimeType,
      });
      const file = new File([audioBlob], "recording.webm", {
        type: audioBlob.type,
        lastModified: Date.now(),
      });
      audioChunks.current = [];
      uploadVoiceNote(file);
    }
  }, [isRecording, recordingMimeType, uploadVoiceNote]);

  useEffect(() => {
    if (voiceNoteURL && isRecording === "pause") {
      handleSendMessage("", voiceNoteURL);
      setIsRecording("idle");
      uploadVoiceNote(null);
    }
  }, [
    voiceNoteURL,
    isRecording,
    handleSendMessage,
    setIsRecording,
    uploadVoiceNote,
  ]);

  return (
    <>
      {isRecording !== "pause" ? (
        <RecordInput
          onClick={
            isRecording === "recording"
              ? handleStopRecording
              : handleStartRecording
          }
          type={"record"}
        />
      ) : (
        <RecordInput onClick={handleSendRecord} type={"message"} />
      )}
    </>
  );
};

export default VoiceRecorder;
