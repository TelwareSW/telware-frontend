import styled from "styled-components";

import google from "/google.png";
import gitHub from "/gitHub.png";
import facebook from "/facebook.png";

const Icon = styled.div`
  display: flex;

  width: 2.5rem;
  height: 2.5rem;

  border: 2px solid var(--color-borders-input);
  border-radius: 50%;

  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const Img = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const Icons = styled.div`
  display: flex;
  gap: 1rem;

  margin: 0 auto;
`;

const OtherMethods = styled.div`
  display: flex;
  flex-direction: column;

  color: var(--color-text-secondary);
  align-items: center;

  gap: 0.2rem;
`;

function OauthOptions() {
  return (
    <OtherMethods>
      <p>Or</p>
      
      <Icons>
        <Icon>
          <Img src={google} alt="google" />
        </Icon>
        <Icon>
          <Img src={facebook} alt="facebook" />
        </Icon>
        <Icon>
          <Img src={gitHub} alt="github" />
        </Icon>
      </Icons>
    </OtherMethods>
  );
}

export default OauthOptions;
