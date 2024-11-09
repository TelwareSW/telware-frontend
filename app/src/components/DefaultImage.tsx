import styled from "styled-components";

interface Props {
  name: string;
}
const StyledDefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-color-shade);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: white;
`;

function DefaultImage(props: Props) {
  const { name } = props;
  const firstName = name?.split(" ")[0] || "";
  const lastName = name?.split(" ")[1] || "";
  const intials = (firstName[0] + " " + lastName[0]).toUpperCase();
  return <StyledDefaultImage>{intials}</StyledDefaultImage>;
}

export default DefaultImage;
