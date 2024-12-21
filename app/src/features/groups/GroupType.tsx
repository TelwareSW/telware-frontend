import { useState } from "react";
import styled from "styled-components";
import { useGroupInfo } from "./hooks/useGroupInfo";
import { useSocket } from "@hooks/useSocket";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const RadioButton = styled.div<{ selected: boolean }>`
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid var(--color-text-secondary);
  border-color: ${({ selected }) =>
    selected ? "var(--accent-color)" : "var(--color-text-secondary)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::after {
    content: "";
    width: ${({ selected }) => (selected ? "0.7rem" : "0")};
    height: ${({ selected }) => (selected ? "0.7rem" : "0")};
    background-color: var(--accent-color);
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Title = styled.p`
  font-weight: 500;
  color: var(--color-text);
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

function GroupType() {
  const { group, chatId } = useGroupInfo();
  const { setPrivacy } = useSocket();
  const [selectedGroupType, setSelectedGroupType] = useState<
    "private" | "public"
  >(group?.privacy ? "private" : "public");

  return (
    <Container>
      <Option
        onClick={() => {
          setSelectedGroupType("private");
          setPrivacy({
            chatId: chatId!,
            privacy: selectedGroupType === "private"
          });
        }}
      >
        <RadioButton selected={selectedGroupType === "private"} />
        <Details>
          <Title>Private {group?.type}</Title>
          <Description>
            Private {group?.type} can not be found in search.
          </Description>
        </Details>
      </Option>

      <Option
        onClick={() => {
          setSelectedGroupType("public");
          setPrivacy({
            chatId: chatId!,
            privacy: selectedGroupType === "private"
          });
        }}
      >
        <RadioButton selected={selectedGroupType === "public"} />
        <Details>
          <Title>Public {group?.type}</Title>
          <Description>
            Public {group?.type} can be found in search.
          </Description>
        </Details>
      </Option>
    </Container>
  );
}

export default GroupType;
