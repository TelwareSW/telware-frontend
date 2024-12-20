import { useState } from "react";
import styled from "styled-components";
import Checkbox from "@components/Checkbox";

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

interface Permission {
  id: string;
  label: string;
  enabled: boolean;
}

//TODO: Integrate with backend
function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "post",
      label: "Send messages",
      enabled: false,
    },
    {
      id: "vidoe",
      label: "Download video messages",
      enabled: false,
    },
    {
      id: "audio",
      label: "Download audio messages",
      enabled: false,
    },
  ]);

  const togglePermission = (id: string) => {
    setPermissions(
      permissions.map((perm) =>
        perm.id === id ? { ...perm, enabled: !perm.enabled } : perm
      )
    );
  };

  return (
    <Container>
      <P>What can members of this chat do?</P>
      {permissions.map((permission) => (
        <PermissionRow key={permission.id}>
          <Checkbox
            checked={permission.enabled}
            onChange={() => togglePermission(permission.id)}
            data-testid={`permission-${permission.id}`}
          />
          <PermissionText>{permission.label}</PermissionText>
        </PermissionRow>
      ))}
    </Container>
  );
}

export default Permissions;
