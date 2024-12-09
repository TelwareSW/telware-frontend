import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import FloatingLabelInput from "@components/inputs/float-label-input/FloatingLabelInput";
import UploadImage from "@components/UploadImage";
import CircleIcon from "@components/CircleIcon";
import { NewGroupForm } from "./NewGroup";

import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

import { useAppSelector } from "@hooks/useGlobalState";
import { clearSelectedUsers } from "@state/groups/selectedUsers";

const Form = styled.form`
  padding: 1rem;
  background-color: var(--color-background);

  & button {
    z-index: 1;
  }
`;

function GroupInfoForm() {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const { register, handleSubmit, watch } = useForm<NewGroupForm>({
    mode: "onChange",
    defaultValues: {
      photo: "",
      groupName: "",
    },
  });

  const groupName = watch("groupName");
  const dispatch = useDispatch();
  const members = useAppSelector((state) => state.selectedUsers);

  const onSubmit = (data: NewGroupForm) => {
    const newGroupData = {
      groupName: data.groupName,
      photo: selectedImageFile || null,
      members: members.map((member) => member._id),
    };

    console.log("New Group Data:", newGroupData);
    dispatch(updateSideBarView({ redirect: sideBarPages.CHATS }));
    dispatch(clearSelectedUsers());
  };

  return (
    <Form data-testid="new-group-form" onSubmit={handleSubmit(onSubmit)}>
      <UploadImage
        setSelectedImageFile={setSelectedImageFile}
        selectedImageFile={selectedImageFile}
      />

      <FloatingLabelInput<NewGroupForm>
        id="groupName"
        label="Group Name"
        register={register}
        watch={watch}
        data-testid="group-name"
      />

      {!!groupName && (
        <CircleIcon
          type="submit"
          as="button"
          data-testid="confirm-create-group-button"
          $icon="ArrowForward"
          $right={1}
          $bottom={2}
          $size={3.3}
          $padding={0.5}
          $color="white"
          $bgColor="var(--accent-color)"
          $opacity={0.95}
        />
      )}
    </Form>
  );
}

export default GroupInfoForm;
