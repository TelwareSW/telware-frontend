import { getIcon, iconStrings } from "@data/icons";
import styled from "styled-components";

const Row = styled.li<{ $type: string }>`
  padding: 0.5rem 1rem;
  list-style: none;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  color: ${(props) =>
    props.$type === "Delete" ? "var(--color-error)" : "var(--color-text)"};

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$type === "Delete"
        ? "var(--color-error-shade)"
        : "var(--color-chat-hover)"};
  }

  & svg {
    fill: ${(props) =>
      props.$type === "Delete" ? "var(--color-error)" : "var(--color-text)"};
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
  subtitle: string | number;
  onClick: () => void;
};

function SettingsRow({ icon, title, subtitle, onClick }: SettingsRowProps) {
  return (
    <Row onClick={onClick} $type={icon}>
      {getIcon(icon)}
      <Content>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </Row>
  );
}

export default SettingsRow;
