import CircleIcon from "@components/CircleIcon";
import FloatingLabelInput from "@components/inputs/float-label-input/FloatingLabelInput";
import UploadImage from "@components/UploadImage";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { sideBarPages } from "types/sideBar";

export interface NewGroupForm {
  photo: string;
  groupName: string;
}

const Container = styled.div`
  padding: 1rem;
`;

export default function NewGroup() {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [photoChanged, setPhotoChanged] = useState(false);
  const { register, handleSubmit, watch } = useForm<NewGroupForm>({
    mode: "onChange",
    defaultValues: {
      photo: "",
      groupName: "",
    },
  });

  const dispatch = useDispatch();
  const groupName = watch("groupName");

  const onSubmit = (data: NewGroupForm) => {
    const newGroupData = {
      groupName: data.groupName,
      photo: selectedImageFile || null,
    };

    console.log("New Group Data:", newGroupData);
    dispatch(updateSideBarView({ redirect: sideBarPages.CHATS }));
  };

  return (
    <Container>
      <form data-testid="new-group-form" onSubmit={handleSubmit(onSubmit)}>
        <UploadImage
          setSelectedImageFile={setSelectedImageFile}
          selectedImageFile={selectedImageFile}
          setPhotoChanged={setPhotoChanged}
        />
        <FloatingLabelInput<NewGroupForm>
          id="groupName"
          label="Group Name"
          register={register}
          watch={watch}
          data-testid="group-name"
        />

        {groupName && (
          <CircleIcon
            as="button"
            type="submit"
            data-testid="create-new-group"
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
      </form>
    </Container>
  );
}
