import styled from "styled-components";

interface Props {}

const StyledPopup = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
function CreateStory(props: Props) {
  const {} = props;

  return <StyledPopup></StyledPopup>;
}

export default CreateStory;
