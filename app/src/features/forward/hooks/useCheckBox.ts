import { useAppSelector, useAppDispatch } from "@hooks/useGlobalState";
import { SelectMessage, removeSelectedMessage } from "@state/messages/messages";
import { useState, useEffect } from "react";

function useCheckBox({ id }: { id: string }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const showCheckBox = useAppSelector((state) => state.messages.showCheckBox);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsChecked(isChecked && showCheckBox);
  }, [showCheckBox]);

  function toggleCheckBox() {
    if (!isChecked) {
      dispatch(SelectMessage({ id: id }));
    } else {
      dispatch(removeSelectedMessage({ id: id }));
    }
    setIsChecked(!isChecked);
  }

  return {
    isChecked,
    toggleCheckBox,
    showCheckBox,
  };
}

export default useCheckBox;
