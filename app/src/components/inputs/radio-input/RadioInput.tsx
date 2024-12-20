import { useEffect } from "react";
import Heading from "@components/Heading";
import { useAppDispatch } from "@hooks/useGlobalState";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { privacySettingsInterface, userInfoInterface } from "types/user";

import {
  updateUserActivity,
  updateUserPermission,
  updateUserPrivacy,
} from "@state/user/user";
import { useUpdatePrivacy } from "@features/privacy-settings/hooks/useUpdatePrivacy";
import {
  activeStatesStrings,
  privacyStatesStrings,
  StatusType,
} from "types/sideBar";

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

interface RadioInputProps {
  header?: string;
  state?: string;
  data: RadioInputInterface;
  updateFnType: StatusType;
  type?: 'channel' | 'group';
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

function getUpdateFn(updateFnType: StatusType) {
  switch (updateFnType) {
    case StatusType.PRIVACY:
      return updateUserPrivacy;
    case StatusType.ACTIVITY:
      return updateUserActivity;
    case StatusType.PERMISSION:
      return updateUserPermission;
    default:
      throw new Error("No matching function");
  }
}

function RadioInput({ state, data, updateFnType }: RadioInputProps) {
  const { title, options } = data;
  const updateFn = getUpdateFn(updateFnType);

  const dispatch = useAppDispatch();
  const updatePrivacy = useUpdatePrivacy();

  const { register, watch } = useForm({
    defaultValues: {
      [data.id]: options.find((item) => item.label === state)?.value,
    },
  });

  async function handleSumbit(payload: any) {
    await updatePrivacy(payload);
    dispatch(updateFn(payload));
  }

  const selectedValue = watch(data.id);

  useEffect(() => {
    const payload = { key: data.id, value: selectedValue };
    handleSumbit(payload);
  }, [selectedValue]);

  return (
    <StyledForm>
      <Heading as="h6" data-testid={`radio-input-${title}`}>
        {title}
      </Heading>
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
                checked={selectedValue === value}
                data-testid={`radio-input-${id}`}
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
