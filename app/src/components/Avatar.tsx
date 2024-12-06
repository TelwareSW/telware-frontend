import { STATIC_MEDIA_URL } from "@constants";
import styled from "styled-components";
import { getAvatarName } from "utils/helpers";

const StyledAvatar = styled.div<{ $image?: string }>`
  width: 2.625rem;
  height: 2.625rem;

  border-radius: 50%;
  margin-right: 1rem;

  background: ${({ $image }) =>
    $image
      ? `url(${STATIC_MEDIA_URL + $image}) center/cover no-repeat`
      : "var(--color-avatar)"};

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
`;

type PropsType = {
  image?: string | undefined;
  name: string | undefined;
};

function Avatar({ image, name }: PropsType) {
  return (
    <StyledAvatar $image={image}>{!image && getAvatarName(name)}</StyledAvatar>
  );
}

export default Avatar;
