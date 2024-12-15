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

const NoResultsFound: React.FC = () => {
  return (
    <NoResultsContainer>
      <NoResultsIcon>
        <Lottie animationData={noResultsAnimation} />
      </NoResultsIcon>
      <NoResultsText>No results found</NoResultsText>
      <NoResultsSubText>Try searching for something else</NoResultsSubText>
    </NoResultsContainer>
  );
};

export default NoResultsFound;
