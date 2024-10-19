import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import { useSignup } from "./hooks/useSignup";
import ConfirmationEmailModal from "./ConfirmationEmailModal";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: relative;
`;

const P = styled.p`
  position: absolute;
  bottom: -4rem;

  margin: 0 auto;
  color: var(--color-text-secondary);

  left: 50%;
  transform: translateX(-50%);
`;

const StyledLink = styled(Link)`
  color: var(--accent-color);
  position: relative;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    border-radius: 4px;
    background-color: var(--accent-color);
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

function SignupSection() {
  return (
    <Container>
      <SignupForm />

      <P>
        Already have an account?{" "}
        <span>
          <StyledLink to="/login">Login</StyledLink>
        </span>
      </P>
    </Container>
  );
}

export default SignupSection;
