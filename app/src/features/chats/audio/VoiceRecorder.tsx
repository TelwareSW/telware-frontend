import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import RecordInput from "../SendButton";
import { useUploadMedia } from "../media/hooks/useUploadMedia";

export type RecordingStates = "idle" | "recording" | "pause";

type VoiceRecorderProps = {
  recordingMimeType?: string;
  isRecording: RecordingStates;
  setIsRecording: Dispatch<SetStateAction<RecordingStates>>;
  setError: Dispatch<SetStateAction<string>>;
  Error: string;
  handleSendMessage: (data: string, file: string) => void;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  handleSendMessage,
  recordingMimeType = "audio/webm",
  isRecording,
  setIsRecording,
  setError,
  Error,
}) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { data: voiceNoteURL, mutate: uploadVoiceNote } = useUploadMedia();

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
    if (!Error.length) setIsRecording("recording");
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
