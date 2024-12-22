import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MentionsInput, Mention } from "react-mentions";
import useMentionList from "@features/chats/hooks/useMentionList";

const StyledMentionsInput = styled.div`
  width: 100%;
  max-width: 27rem;
  color: var(--color-text);
`;

type PropsType = {
  input: string;
  setInput: (value: string) => void;
  onKeyDown?: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
};

function ExpandingTextArea({ input, setInput, onKeyDown }: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { filteredMembers } = useMentionList();

  function handleInput() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      if (textareaRef.current.value === "" || input === "") {
        textareaRef.current.style.height = "32px";
      }
    }
  }, [input]);

  return (
    <StyledMentionsInput>
      <MentionsInput
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        onKeyDown={onKeyDown!}
        onInput={handleInput}
        placeholder="Message"
        a11ySuggestionsListLabel="Suggested mentions"
        style={{
          input: {
            overflow: "hidden",
            border: "none",
            forcedColorAdjust: "none",
            color: "var(--color-text)",
            outline: "none"
          },
          suggestions: {
            list: {
              backgroundColor: "var(--color-background)",
              border: "none",
              borderRadius: "0.5rem",
              position: "absolute",
              zIndex: 1,
              bottom: "2rem",
              width: "20rem",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
            },
            item: {
              padding: "0.5rem 1rem",
              "&focused": {
                backgroundColor: "var(--accent-color)",
                color: "white"
              }
            }
          }
        }}
      >
        <Mention
          trigger="@"
          data={filteredMembers}
          displayTransform={(display) => `@${display}`}
          style={{
            backgroundColor: "transparent",
            color: "ButtonFace",
            border: "none"
          }}
        />
      </MentionsInput>
    </StyledMentionsInput>
  );
}

export default ExpandingTextArea;
