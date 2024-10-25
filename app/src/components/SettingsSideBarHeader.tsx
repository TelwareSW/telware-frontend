import styled from "styled-components";
import Heading from "./Heading";
import { useAppSelector, useAppDispatch } from "../hooks";
import { updateSideBarView } from "../state/sideBar/sideBar";
import BackArrow from "./BackArrow";
import CircleIcon from "./CircleIcon";
import { sideBarPages } from "../data/sideBar";
const StyledSideBarHeader = styled.div`
  height: 4rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 2rem;
  padding-left: 1rem;

  background-color: var(--color-background);
  border-bottom: 2px solid var(--color-item-hover);
`;

function SettingsSideBarHeader() {
  const { title } = useAppSelector((state) => state.sideBarData);
  const dispatch = useAppDispatch();

  return (
    <StyledSideBarHeader>
      <BackArrow />
      <Heading as={"h4"}>{title}</Heading>
      {title === "Settings" && (
        <>
          <CircleIcon
            icon="Logout"
            onClick={() => console.log("Logout")}
            bottom="1rem"
            right="1rem"
            padding={0.2}
            size={1.8}
            color="var(--color-text)"
            bgColor="var(--color-pattern)"
          />
          <CircleIcon
            icon="Edit"
            onClick={() =>
              dispatch(updateSideBarView(sideBarPages.EDIT_PROFILE))
            }
            bottom="1rem"
            right="4rem"
            padding={0.2}
            size={1.8}
            color="var(--color-text)"
            bgColor="var(--color-pattern)"
          />
        </>
      )}
    </StyledSideBarHeader>
  );
}

export default SettingsSideBarHeader;
