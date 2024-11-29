import CircleIcon from "@components/CircleIcon";

interface ButtonType {
  type: "record" | "message";
  onClick: () => void;
}

function RecordInput({ type, onClick }: ButtonType) {
  return (
    <>
      <CircleIcon
        onClick={onClick}
        data-testid="record-icon"
        $icon={type === "record" ? "Record" : "Send"}
        $padding={0.6}
        $color="white"
        $bgColor="var(--accent-color)"
      />
    </>
  );
}

export default RecordInput;
