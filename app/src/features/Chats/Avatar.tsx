import styled from "styled-components";

const StyledAvatar = styled.div<{ image?: string }>`
  width: 2.625rem;
  height: 2.625rem;
  border-radius: 50%;

  background: ${({ image }) =>
    image
      ? `url(${image}) center/cover no-repeat`
      : "linear-gradient(135deg, #72C6EF, #004E92)"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  margin-right: 1rem;

  flex-shrink: 0;
`;

type PropsType = {
  image?: string | undefined;
  name: string;
};

function Avatar({ image, name }: PropsType) {
  return <StyledAvatar image={image}>{!image && name.charAt(0)}</StyledAvatar>;
}

export default Avatar;
