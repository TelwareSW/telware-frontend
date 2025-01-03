import { STATIC_MEDIA_URL } from "@constants";
import styled from "styled-components";
import { getAvatarName } from "utils/helpers";

const StyledAvatar = styled.div<{ $image?: string; $size?: string }>`
  width: ${({ $size }) =>
    $size === "small" ? "2.625rem" : $size === "large" ? "7.5rem" : "3.125rem"};
  height: ${({ $size }) =>
    $size === "small" ? "2.625rem" : $size === "large" ? "7.5rem" : "3.125rem"};

  border-radius: 50%;
  margin-right: ${({ $size }) => ($size === "large" ? "0" : "1rem")};

  background: ${({ $image }) =>
    $image ? `url(${$image}) center/cover no-repeat` : "var(--color-avatar)"};

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-weight: bold;
  font-size: ${({ $size }) => ($size === "large" ? "1.5rem" : "1rem")};
  text-transform: uppercase;
  z-index: 1;
`;

type PropsType = {
  image?: string | undefined;
  name: string | undefined;
  size?: string;
  onClick?: () => void;
};

function Avatar({ image, name, size, onClick }: PropsType) {
  if (image && !image.startsWith("http")) {
    image = STATIC_MEDIA_URL + image;
  }

  return (
    <StyledAvatar onClick={onClick} $image={image} $size={size || "small"}>
      {!image && getAvatarName(name)}
    </StyledAvatar>
  );
}

export default Avatar;
