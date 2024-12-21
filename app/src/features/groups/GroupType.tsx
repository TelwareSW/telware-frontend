import { useState } from "react";
import styled from "styled-components";

import GroupTypeOption from "./GroupTypeOption";

import { useGroupInfo } from "./hooks/useGroupInfo";
import { useSocket } from "@hooks/useSocket";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

function GroupType() {
  const { group, chatId } = useGroupInfo();
  const { setPrivacy } = useSocket();
  const [selectedGroupType, setSelectedGroupType] = useState<
    "private" | "public"
  >(group?.privacy ? "private" : "public");

  const handleSelection = (type: "private" | "public") => {
    setSelectedGroupType(type);
    setPrivacy({
      chatId: chatId!,
      privacy: type === "private"
    });
  };

  return (
    <Container>
      <GroupTypeOption
        type="private"
        selected={selectedGroupType === "private"}
        onClick={() => handleSelection("private")}
        groupType={group?.type}
      />
      <GroupTypeOption
        type="public"
        selected={selectedGroupType === "public"}
        onClick={() => handleSelection("public")}
        groupType={group?.type}
      />
    </Container>
  );
}

export default GroupType;
