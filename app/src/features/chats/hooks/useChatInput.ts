import { clearActiveMessage } from "@state/messages/activeMessage";
import { useState } from "react";
import { RecordingStates } from "../audio/VoiceRecorder";
import { useMessageSender } from "./useMessageSender";
import { useAppDispatch } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";

function useChatInput() {
  const { chatId } = useParams<{ chatId: string }>();

  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isRecording, setIsRecording] = useState<RecordingStates>("idle");
  const [error, setError] = useState<string>("");

  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
  const { handleSendMessage } = useMessageSender();
  const dispatch = useAppDispatch();

  const sendGIF = (gif: string) => {
    handleSendMessage("", chatId, gif, "GIF");
    setIsEmojiSelectorOpen(false);
  };

  const sendSticker = (sticker: string) => {
    handleSendMessage("", chatId, sticker, "sticker");
    setIsEmojiSelectorOpen(false);
  };
  const handleSubmit = (e: Event, voiceNoteName = "") => {
    console.log(voiceNoteName);
    e.preventDefault();
    setIsEmojiSelectorOpen(false);
    if (isRecording !== "idle") return;
    handleSendMessage(input, chatId, voiceNoteName, "audio");
    dispatch(clearActiveMessage());
    setInput("");
  };

  function handleCloseFilePreview() {
    setFile(null);
    setIsFilePreviewOpen(false);
  }

  return {
    input,
    setInput,
    file,
    setFile,
    isFilePreviewOpen,
    setIsFilePreviewOpen,
    isRecording,
    setIsRecording,
    error,
    setError,
    isEmojiSelectorOpen,
    setIsEmojiSelectorOpen,
    sendGIF,
    sendSticker,
    handleSubmit,
    handleCloseFilePreview
  };
}

export default useChatInput;
