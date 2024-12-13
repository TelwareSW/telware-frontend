import styled from "styled-components";

interface ViewerProps {
  contentType: string;
  id: string;
  url: string;
  title: string;
}
const Gif = styled.img`
  width: 120px;
  height: 120px;
  object-fit: fill;
`;

function Viewer(props: ViewerProps) {
  const { id, url, title } = props;

  return <Gif id={id} src={url} alt={title} loading="lazy" />;
}

export default Viewer;
