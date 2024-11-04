import Heading from "../components/Heading";
import { styled, keyframes } from "styled-components";
import SignupSection from "../features/authentication/signup/SignupSection";
import useAuthCheck from "@features/authentication/login/hooks/useAuthCheck";

const SignupLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  height: 100dvh;

  background-color: var(--color-background);
`;
const SideBar = styled.div`
  grid-row: 1 / -1;

  background-color: var(--accent-color);
`;

const Main = styled.main`
  margin: auto 8rem;
`;

const fadeIn = keyframes`
  0% {
    color: transparent;
  }
  100% {
    color: var(--accent-color);
  }
`;

const AnimatedTitle = styled(Heading).attrs({ as: "h1" })`
  animation: ${fadeIn} 2s ease-in-out forwards;
  width: 100vh;
`;

function Signup() {
  return (
    <SignupLayout>
      <SideBar />
      <Main>
        <AnimatedTitle>Welcome to Telware!</AnimatedTitle>

        <SignupSection />
      </Main>
    </SignupLayout>
  );
}

export default Signup;
