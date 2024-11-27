import styled from "styled-components";
import { Session } from "../types/sessions";
import Lottie from "lottie-react";
import linuxAnimation from "@data/animations/linux_30.json";
import windowsAnimation from "@data/animations/windows_30.json";
import androidAnimation from "@data/animations/android_30.json";
import chromeAnimation from "@data/animations/chrome_30.json";

const SessionItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const SessionItemIcon = styled.div<{ $color?: string }>`
  width: 60px;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid var(--color-item-hover);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    padding: 3px;
    width: 100%;
    height: 100%;
  }

  ${({ $color }) => $color && `background-color: ${$color};`}
`;
const SessionItemContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fre;
  width: 100%;
`;
const SessionItemTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--color-text);
`;
const SessionItemSubtitle = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

const SessionItemDate = styled.p`
  justify-self: end;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
`;

type SessionItemProps = {
  session: Session;
};

function SessionItem({ session }: SessionItemProps) {
  let sessionIcon;
  let sessionColor;

  switch (session?.agent?.os) {
    case "Windows":
      sessionIcon = windowsAnimation;
      sessionColor = "#0078d7";
      break;
    case "Linux":
      sessionIcon = linuxAnimation;
      sessionColor = "#fbbc05";
      break;
    case "Andorid":
      sessionIcon = androidAnimation;
      sessionColor = "#34c759";
      break;
    case "Chrome":
      sessionIcon = chromeAnimation;
      sessionColor = "#fbbc05";
      break;
    default:
      sessionIcon = androidAnimation;
      sessionColor = "#34c759";
  }

  return (
    <SessionItemWrapper>
      <SessionItemIcon $color={sessionColor}>
        <Lottie animationData={sessionIcon} />
      </SessionItemIcon>
      <SessionItemContent>
        <SessionItemTitle>{session?.agent?.os || "Postman"}</SessionItemTitle>
        <SessionItemDate>
          {new Date(session?.lastSeenTime).toLocaleDateString()}
        </SessionItemDate>
        <SessionItemSubtitle>
          {session?.agent?.browser || "Postman WebView"}
        </SessionItemSubtitle>
      </SessionItemContent>
    </SessionItemWrapper>
  );
}

export default SessionItem;
