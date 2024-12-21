import { useState, useCallback } from "react";
import styled from "styled-components";
import Checkbox from "@components/Checkbox";
import { useSocket } from "@hooks/useSocket";
import { useParams } from "react-router-dom";
import { useGroupInfo } from "./hooks/useGroupInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const P = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.875rem;
`;

const PermissionRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
`;

const PermissionText = styled.span`
  color: var(--color-text);
  font-size: 0.875rem;
`;

interface PermissionsState {
  [key: string]: boolean;
}

const Permissions = () => {
  const { group, isCurrUserAdmin } = useGroupInfo();
  const { chatId } = useParams<{ chatId: string }>();

  const [permissions, setPermissions] = useState<PermissionsState>({
    post: group?.messagingPermission!,
    video: group?.downloadingPermission!,
    audio: false
  });

  const { setPermission: socketSetPermission } = useSocket();

  const togglePermission = useCallback((id: string) => {
    setPermissions((prev) => {
      const isEnabled = !prev[id];

      console.log(id, isEnabled);

      if (id === "post") {
        socketSetPermission({
          chatId: chatId!,
          type: "post",
          who: isEnabled ? "everyone" : "admins"
        });
      }

      return { ...prev, [id]: isEnabled };
    });
  }, []);

  const permissionLabels: { [key: string]: string } = {
    post: "Send messages",
    video: "Download video messages",
    audio: "Download audio messages"
  };

  return (
    <Container>
      <P>What can members of this chat do?</P>
      {Object.entries(permissionLabels).map(([id, label]) => (
        <PermissionRow key={id}>
          <Checkbox
            checked={permissions[id]}
            onChange={() => togglePermission(id)}
            data-testid={`permission-${id}`}
            disabled={!isCurrUserAdmin}
          />
          <PermissionText>{label}</PermissionText>
        </PermissionRow>
      ))}
    </Container>
  );
};

export default Permissions;
