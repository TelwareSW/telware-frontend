import styled from "styled-components";

const ProgressBarContainer = styled.div`
  position: relative;
  height: 80%;
  width: 2px;
  background-color: var(--color-background-secondary);
  border-radius: 2px;
  margin-left: 0.5rem;
`;

const ProgressBarSegment = styled.div<{ active: boolean }>`
  flex-grow: 1;
  height: 100%;
  background-color: ${(props) =>
    props.active ? "var(--accent-color)" : "var(--color-background-tertiary)"};
  transition: background-color 0.3s ease-in-out;
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

type PinnedMessageProgressBarProps = {
  pinnedMessages: { id: string; content: string; isPinned: boolean }[];
  currentPinnedIndex: number;
};

const PinnedMessageProgressBar: React.FC<PinnedMessageProgressBarProps> = ({
  pinnedMessages,
  currentPinnedIndex,
}) => {
  return (
    <ProgressBarContainer data-testid="progress-bar-container">
      <ProgressBar>
        {pinnedMessages.map((_, index) => (
          <ProgressBarSegment
            key={index}
            active={index === currentPinnedIndex}
          />
        ))}
      </ProgressBar>
    </ProgressBarContainer>
  );
};

export default PinnedMessageProgressBar;
