import styled from "styled-components";
import { STATIC_MEDIA_URL } from "@constants";
import { getAvatarName } from "utils/helpers";
import { createPortal } from "react-dom";
import { getIcon } from "@data/icons";
import { useCallContext } from "./hooks/useCallContext";
import { getChatByID } from "@features/chats/utils/helpers";
import { useAppSelector } from "@hooks/useGlobalState";
import { useSocket } from "@hooks/useSocket";
import { EnableSpeaker } from "./SpeakerEnable";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.15s ease;
  z-index: 102;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.25);
`;

const ModalDialog = styled.div`
  border-radius: 5px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  max-width: 35rem;
  min-width: 17.5rem;
  margin: 2rem auto;
  background-color: var(--color-background);
  box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
  transform: translate3d(0, -1rem, 0);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
`;
const ButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  -webkit-user-select: none;
  user-select: none;
`;
const AvatarContainer = styled.div`
  border-radius: inherit;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    var(--color-white) -125%,
    var(--color-user)
  );
`;
const ModalContent = styled.div`
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  padding: 0;
`;
const StyledAvatar = styled.div<{ $image?: string }>`
  border-radius: inherit;
  width: 100%;
  height: 100%;

  background: ${({ $image }) =>
    $image
      ? `url(${STATIC_MEDIA_URL + $image}) center/cover no-repeat`
      : "var(--color-avatar)"};

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 5rem;
  text-transform: uppercase;
`;
const RoundButton = styled.button<{
  $bgColor?: string;
  $bgColorHover?: string;
}>`
  outline: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  border-radius: 50%;
  border: 0;
  background-color: ${({ $bgColor }) => $bgColor || "rgba(0, 0, 0, 0)"};
  background-size: cover;
  padding: 0.625rem;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition:
    background-color 0.15s,
    color 0.15s;
  text-decoration: none !important;
  text-transform: uppercase;
  text-align: right;
  font-size: 3.5rem;
  font-weight: 200;
  &:hover {
    background-color: ${({ $bgColorHover }) =>
      $bgColorHover || "rgba(0, 0, 0, 0.1)"};
  }
`;

const ButtonContainer = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonText = styled.div`
  color: #fff;
  font-size: 0.75rem;
  text-transform: lowercase;
  margin-top: 0.25rem;
  white-space: nowrap;
`;
const NameContainer = styled.div`
  position: absolute;
  top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  padding-top: 4rem;
  padding-bottom: 2rem;
  margin-bottom: auto;
  color: #fff;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
`;
const TopBar = styled.div`
  top: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  position: absolute;
  padding: 0.5rem;
  text-align: right;
`;
const ActiveHeaderOpen = styled.div`
  position: fixed;
  margin-bottom: 0.5rem;
  top: 0;
  left: 0;
  height: 1rem;
  width: 100vw;
  z-index: 6;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem;
  color: #fff;
  align-items: center;
  padding: 0 1rem;
  background: linear-gradient(135deg, rgb(49, 82, 232), rgb(143, 74, 172));
  transform: translateY(0);
  z-index: 102;
`;
type PropsType = {
  isCollapsed: boolean;
  setIsCollapsed: (arg0: boolean) => void;
  callStatus: string | undefined;
};

export default function CallLayout({
  isCollapsed,
  setIsCollapsed,
  callStatus
}: PropsType) {
  const { acceptCall, finishCall } = useSocket();
  const { endCall, chatId } = useCallContext();
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = getChatByID({
    chatID: chatId.current ?? "",
    chats: chats
  });

  return (
    <>
      {!isCollapsed
        ? createPortal(
            <ModalContainer>
              <ModalBackdrop> </ModalBackdrop>
              <ModalDialog>
                <ModalContent>
                  <AvatarContainer>
                    <StyledAvatar $image={chat?.photo}>
                      {!chat?.photo && getAvatarName(chat?.name)}
                    </StyledAvatar>
                    <TopBar>
                      <RoundButton onClick={() => setIsCollapsed(true)}>
                        &times;
                      </RoundButton>
                    </TopBar>
                    <NameContainer>
                      <h1>{chat?.name}</h1>
                      <span>{callStatus}...</span>
                    </NameContainer>
                    <ButtonsContainer>
                      <ButtonContainer>
                        <RoundButton>{getIcon("Mute")}</RoundButton>
                        <ButtonText>unmute</ButtonText>
                      </ButtonContainer>
                      {callStatus === "incoming" && (
                        <ButtonContainer>
                          <RoundButton
                            $bgColor="var(--color-success)"
                            $bgColorHover="var(--color-success-shade)"
                            onClick={() => acceptCall()}
                          >
                            {getIcon("CallAccept")}
                          </RoundButton>
                          <ButtonText>accept</ButtonText>
                        </ButtonContainer>
                      )}

                      {callStatus === "incoming" ? (
                        <ButtonContainer>
                          <RoundButton
                            onClick={() => endCall(null)}
                            $bgColor="var(--color-error)"
                            $bgColorHover="var(--color-error-shade)"
                          >
                            {getIcon("EndCall")}
                          </RoundButton>
                          <ButtonText>end call</ButtonText>
                        </ButtonContainer>
                      ) : (
                        <ButtonContainer>
                          <RoundButton
                            onClick={() => finishCall()}
                            $bgColor="var(--color-error)"
                            $bgColorHover="var(--color-error-shade)"
                          >
                            {getIcon("EndCall")}
                          </RoundButton>
                          <ButtonText>end call</ButtonText>
                        </ButtonContainer>
                      )}
                    </ButtonsContainer>
                  </AvatarContainer>
                </ModalContent>
              </ModalDialog>
            </ModalContainer>,
            document.body
          )
        : createPortal(
            <ActiveHeaderOpen onClick={() => setIsCollapsed(false)}>
              <span>{chat?.name}</span>
            </ActiveHeaderOpen>,
            document.body
          )}
    </>
  );
}
