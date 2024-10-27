import { useEffect } from "react";
import Heading from "@components/Heading";
import { useAppDispatch } from "hooks/useRedux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  activeStatesStrings,
  privacySettingsInterface,
  privacyStatesStrings,
  updateActivityInterface,
  updateInfoInterface,
  updatePrivacyInterface,
  userInfoInterface,
} from "types/user";
import changeSettings from "features/privacy-settings/service/changeSettings";
import { updateUserActivity, updateUserPrivacy } from "state/user/user";

interface RadioOptionInterface {
  id: string;
  label: string;
  value: privacyStatesStrings | activeStatesStrings;
}

interface RadioInputInterface {
  id:
    | keyof userInfoInterface
    | keyof privacySettingsInterface
    | "readReceiptsPrivacy";
  title: string;
  options: RadioOptionInterface[];
}

type paramType =
  | updatePrivacyInterface
  | updateInfoInterface
  | updateActivityInterface;

interface RadioInputProps {
  header?: string;
  state?: string;
  data: RadioInputInterface;
  enable?: boolean;
  updateFnType: boolean; // 0-> activity , 1-> privacy
}

const StyledForm = styled.div`
  width: 100%;
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
  align-items: center;
`;

const StyledInput = styled.input`
  border: var(--border-width) solid var(--color-text-secondary);
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: var(font-size);
  color: var(--color-text);
`;

function RadioInput({ state, data, enable, updateFnType }: RadioInputProps) {
  const { title, options } = data;
  console.log(state);
  const { register, watch } = useForm({
    defaultValues: {
      [data.id]: options.find((item) => item.label === state)?.value,
    },
  });

  const updateFn = updateFnType ? updateUserPrivacy : updateUserActivity;
  const dispatch = useAppDispatch();

  let selectedValue = watch(data.id);

  useEffect(() => {
    async function submit() {
      if (selectedValue) {
        const payload = { key: data.id, value: selectedValue };
        console.log("payload: ", payload);
        dispatch(updateFn(payload));
        await changeSettings(payload);
      }
    }
    submit();
  }, [selectedValue, data.id, dispatch, updateFn]);

  return (
    <StyledForm>
      <Heading as="h6">{title}</Heading>
      <OptionsDiv>
        {options.map((option: RadioOptionInterface) => {
          const { id, label, value } = option;
          return (
            <StyledOption key={id}>
              <StyledInput
                type="radio"
                id={id}
                value={value}
                {...register(data.id)}
                disabled={enable ? !enable : false}
                checked={selectedValue === value}
              />
              <Label htmlFor={id} id={id}>
                {label}
              </Label>
            </StyledOption>
          );
        })}
      </OptionsDiv>
    </StyledForm>
  );
}

export default RadioInput;
export type { RadioOptionInterface, RadioInputInterface, RadioInputProps };
