import { useEffect, useRef } from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  outline: none;
  border: none;

  flex: 1;
  align-self: center;

  caret-color: var(--accent-color);
  color: var(--color-text);

  resize: none;
  overflow: hidden;

  font-size: 1rem;
  line-height: 1.5;
  padding: 0.25rem;

  max-height: 300px;
`;

type PropsType = {
  input: string;
  setInput: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

function ExpandingTextArea({ input, setInput, onKeyDown }: PropsType) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleInput() {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }
  useEffect(() => {
    if (ref.current) {
      if (ref.current.value === "" || input === "") {
        ref.current.style.height = "32px";
      }
    }
  }, [input]);

  return (
    <Textarea
      ref={ref}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Message"
      rows={1}
      onInput={handleInput}
      onKeyDown={onKeyDown}
    />
  );
}

export default ExpandingTextArea;
