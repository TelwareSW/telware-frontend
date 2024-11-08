import styled from "styled-components";
import Lottie from "lottie-react";
import { useGetAllSessions } from "./hooks/useGetAllSessions";
import { useGetCurrentSession } from "./hooks/useGetCurrentSessions";
import SessionItem from "./components/SessionItem";
import laptopAnimation from "@data/animations/devices.json";

const SideBarContainer = styled.div`
  overflow-y: auto;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-height: 100dvh;
    background-color: var(--color-background-secondary);
  }
`;

const SettingSection = styled.section`
  padding: 1rem 1.5rem;
  background-color: var(--color-background);

  &:not(:last-child) {
    border-bottom: 1rem solid var(--color-border);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
`;

const HeaderAnimatinoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;

  & > div {
    max-width: 200px;
  }
`;

function Devices() {
  const { data: allDevices } = useGetAllSessions();
  const { data: activeSession } = useGetCurrentSession();

  return (
    <SideBarContainer>
      <SettingSection>
        <HeaderAnimatinoContainer>
          <Lottie animationData={laptopAnimation} />
        </HeaderAnimatinoContainer>
      </SettingSection>
      <SettingSection>
        <SectionTitle>THIS DEVICE</SectionTitle>
        <SessionItem session={activeSession} />
      </SettingSection>
      <SettingSection>
        <SectionTitle>Active sessions</SectionTitle>
        {allDevices?.map((session) => (
          <SessionItem key={session.lastSeenTime} session={session} />
        ))}
      </SettingSection>
    </SideBarContainer>
  );
}

export default Devices;
