import CircleIcon from "@components/CircleIcon";

function AddMembersButton({ onClick }: { onClick: () => void }) {
  return (
    <CircleIcon
      type="submit"
      as="button"
      data-testid="add-members-button"
      $icon="AddMembers"
      $right={1}
      $bottom={2}
      $size={3.3}
      $padding={0.8}
      $color="white"
      $bgColor="var(--accent-color)"
      onClick={onClick}
    />
  );
}

export default AddMembersButton;
