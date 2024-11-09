import styled from "styled-components";
import DefaultImage from "./DefaultImage";
import { STATIC_MEDIA_URL } from "@constants";

interface Props {
  avatar?: string;
  name: string;
}
const StyledImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
function Avatar(props: Props) {
  const { name, avatar } = props;

  return (
    <>
      {avatar ? (
        <StyledImage src={STATIC_MEDIA_URL + avatar} />
      ) : (
        <DefaultImage name={name} />
      )}
    </>
  );
}

export default Avatar;
