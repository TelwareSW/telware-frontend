import Heading from "@components/Heading";
import changeSettings from "features/privacy-settings/service/changeSettings";
import { useAppDispatch } from "hooks";
import styled from "styled-components";
import {
  activeStatesStrings,
  privacyStatesStrings,
  updateActivityInterface,
  updateInfoInterface,
  updatePrivacyInterface,
} from "types/user";

interface RadioOptionInterface {
  id: string;
  label: string;
  value: privacyStatesStrings | activeStatesStrings;
}

interface RadioInputInterface {
  id: string;
  title: string;
  options: RadioOptionInterface[];
}

type paramType =
  | updatePrivacyInterface
  | updateInfoInterface
  | updateActivityInterface;

interface RadioInputProps {
  data: RadioInputInterface;
  updateFn: (param: paramType) => { type: string; payload?: any };
  register?: any;
  errors?: any;
  enable: boolean;
}

const StyledDiv = styled.div`
  width: full;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  gap: 1.5rem;
`;

const StyledOption = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledInput = styled.input`
  border: var(--border-width) solid var(--color-text-secondary);
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: var(font-size);
`;

function RadioInput({ data, enable, register, updateFn }: RadioInputProps) {
  const { title, options } = data;
  const dispatch = useAppDispatch();

  const handleSelect = (payload: any) => {
    if (updateFn) dispatch(updateFn(payload));
    changeSettings(payload);
  };

  return (
    <StyledDiv>
      <Heading as="h6">{title}</Heading>

      <OptionsDiv>
        {options.map((option: RadioOptionInterface) => {
          const { id, label, value } = option;

          return (
            <StyledOption key={id}>
              <StyledInput
                type="radio"
                id={id}
                name={title}
                value={value}
                // {...register(data.id)}
                color="black"
                disabled={!enable}
                onClick={() =>
                  handleSelect({ key: "lastSeenPrivacy", value: value })
                }
              />
              <Label id={id}>{label}</Label>
            </StyledOption>
          );
        })}
      </OptionsDiv>
    </StyledDiv>
  );
}

export default RadioInput;

export type { RadioOptionInterface, RadioInputInterface };
