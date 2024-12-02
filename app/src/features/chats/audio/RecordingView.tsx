import styled, { keyframes } from "styled-components";
import { RecordingStates } from "./VoiceRecorder";
import { Dispatch, SetStateAction } from "react";
import Icon from "@components/Icon";
import { getIcon } from "@data/icons";

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const GlowingBlinkingIcon = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  width: 16px;
  height: 16px;
  font-size: 50%;
  border-radius: 50%;
  background: var(--color-error);
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
  animation: ${blinkAnimation} 1s steps(5, start) infinite;
`;
const StyledP = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--color-text-secondary);
`;
const InvisibleButton = styled.button`
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  display: inline-block;
  cursor: pointer;
`;
type RecordingViewProps = {
  isRecording: RecordingStates;
  setIsRecording: Dispatch<SetStateAction<RecordingStates>>;
};
//TODO: add voice note wave form :)
export default function RecordingView({
  isRecording,
  setIsRecording,
}: RecordingViewProps) {
  const handleCanelReecord = () => {
    setIsRecording("idle");
  };
  return (
    <>
      {isRecording == "recording" && (
        <>
          <StyledP>Recording...</StyledP>
          <GlowingBlinkingIcon />
        </>
      )}
      {isRecording == "pause" && (
        <>
          <StyledP>Record</StyledP>
          <InvisibleButton onClick={handleCanelReecord}>
            <Icon>{getIcon("Delete")}</Icon>
          </InvisibleButton>
        </>
      )}
    </>
  );
}
