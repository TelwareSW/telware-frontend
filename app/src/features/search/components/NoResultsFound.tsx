import Lottie from "lottie-react";
import styled from "styled-components";
import noResultsAnimation from "@data/animations/not_found.json";

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 2rem;
`;

const NoResultsIcon = styled.div`
  --icon-size: 8rem;
  width: var(--icon-size);
  height: var(--icon-size);
`;

const NoResultsText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const NoResultsSubText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-secondary);
`;

interface NoResultsFoundProps {
  message?: string;
  subMessage?: string;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({
  message = "No results found",
  subMessage = "Try searching for something else",
}) => {
  return (
    <NoResultsContainer data-testid="no-results-container">
      <NoResultsIcon>
        <Lottie animationData={noResultsAnimation} key="no-results-image" />
      </NoResultsIcon>
      <NoResultsText data-testid="no-results-text">{message}</NoResultsText>
      <NoResultsSubText>{subMessage}</NoResultsSubText>
    </NoResultsContainer>
  );
};

export default NoResultsFound;
