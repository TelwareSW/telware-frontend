import CircleIcon from "@components/CircleIcon";
import { useGroupInfo } from "./hooks/useGroupInfo";

function AddMembersButton({ onClick }: { onClick: () => void }) {
  const { isCurrUserAdmin, isPending } = useGroupInfo();

  if (isPending || !isCurrUserAdmin) return;

  return (
    <CircleIcon
      type="submit"
      as="button"
      $icon="AddMembers"
      $right={1}
      $bottom={2}
      $size={3.3}
      $padding={0.8}
      $color="white"
      $bgColor="var(--accent-color)"
      onClick={onClick}
      testid="add-members-button"
    />
  );
}

export default AddMembersButton;
