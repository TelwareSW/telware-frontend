import { getIcon } from "@data/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMessageContext } from "./contexts/MessageProvider";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--accent-color);

  cursor: pointer;

  & svg {
    font-size: 1rem;
    color: var(--accent-color);
  }
`;

function Comments() {
  const { _id: id } = useMessageContext();
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/${id}`);
  }

  return (
    <Container onClick={handleClick}>
      <span>20 Comments</span>
      {getIcon("RightArrow")}
    </Container>
  );
}

export default Comments;
