import { STATIC_MEDIA_URL } from "@constants";
import styled from "styled-components";
import { getAvatarName } from "utils/helpers";

const StyledAvatar = styled.div<{ $image?: string; $size?: string }>`
  width: ${({ $size }) => ($size === "small" ? "2.625rem" : "3.125rem")};
  height: ${({ $size }) => ($size === "small" ? "2.625rem" : "3.125rem")};

  border-radius: 50%;
  margin-right: 1rem;

  background: ${({ $image }) =>
    $image ? `url(${$image}) center/cover no-repeat` : "var(--color-avatar)"};

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  z-index: 1;
`;

type PropsType = {
  image?: string | undefined;
  name: string | undefined;
  size?: string;
};

function Avatar({ image, name, size }: PropsType) {
  if (image && !image.startsWith("http")) {
    image = STATIC_MEDIA_URL + image;
  }

  return (
    <StyledAvatar $image={image} $size={size || "small"}>
      {!image && getAvatarName(name)}
    </StyledAvatar>
  );
}

export default Avatar;
