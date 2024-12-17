import { getIcon, iconStrings } from "@data/icons";
import styled from "styled-components";

const Row = styled.li`
  padding: 0.5rem 1rem;
  list-style: none;

  display: flex;
  gap: 1.5rem;
  color: var(--color-text);
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: var(--color-chat-hover);
  }
`;

const Title = styled.p`
  text-transform: capitalize;
`;

const Subtitle = styled.p`
  text-transform: capitalize;
  font-size: small;

  color: var(--color-text-secondary);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

type SettingsRowProps = {
  icon: iconStrings;
  title: string;
  subtitle: string;
  onClick: () => void;
};

function SettingsRow({ icon, title, subtitle, onClick }: SettingsRowProps) {
  return (
    <Row onClick={onClick}>
      {getIcon(icon)}
      <Content>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </Row>
  );
}

export default SettingsRow;
