import CircleIcon from "@components/CircleIcon";

function AddMembersButton({ onClick }: { onClick: () => void }) {
  return (
    <CircleIcon
      data-testid="confirm-add-members-button"
      $icon="ArrowForward"
      $right={1}
      $bottom={2}
      $size={3.3}
      $padding={0.5}
      $color="white"
      $bgColor="var(--accent-color)"
      $opacity={0.95}
      onClick={onClick}
    />
  );
}

export default AddMembersButton;
