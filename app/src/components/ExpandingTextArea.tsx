import { useRef } from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  outline: none;
  border: none;

  flex: 1;
  caret-color: var(--accent-color);
  color: var(--color-text);

  resize: none;
  overflow: hidden;

  font-size: 1rem;
  line-height: 1.5;
`;

function ExpandingTextArea() {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleInput() {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }

  return (
    <Textarea
      ref={ref}
      placeholder="Message"
      rows={1}
      onInput={handleInput}
    />
  );
}

export default ExpandingTextArea;
