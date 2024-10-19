import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.25rem;
      font-weight: 450;
    `}
  
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1rem;
      font-weight: 400;
    `}

    ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-text-secondary) !important;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 0.5rem;
    `}

  color: var(--color-text);
  line-height: 1.4;
`;

export default Heading;
