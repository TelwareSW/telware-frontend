import { RootState } from "@state/store";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SEARCH_TABS } from "../data/tabs-components-map";
import { setSelectedTab } from "@state/messages/global-search";

const TabedSearchContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: var(--color-background-secondary);
`;

const TabListWrapper = styled.div`
  display: flex;
  position: relative;
  overflow-x: scroll;
  box-shadow: 0 2px 2px var(--color-light-shadow);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ $active?: boolean }>`
  position: relative;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) =>
    props.$active ? "var(--accent-color)" : "var(--color-text-secondary)"};
  background: transparent;
  border: none;
  border-radius: 0;
  outline: none;
  box-shadow: none;
  z-index: 1;
`;

const TabUnderline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--accent-color);
  border-radius: 2px;
`;

const TabContent = styled(motion.div)`
  overflow-y: scroll;
  height: calc(100% - 96px);
`;

const TabedSearch: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedTab } = useSelector(
    (state: RootState) => state.globalSearch,
  );

  const isSearching = searchTerm.length > 0;

  return (
    <AnimatePresence>
      {isSearching && (
        <TabedSearchContainer
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", duration: 0.2 }}
          key="tap-search"
        >
          <LayoutGroup>
            <TabListWrapper>
              {SEARCH_TABS.map((tab) => (
                <TabButton
                  key={tab.title}
                  onClick={() => dispatch(setSelectedTab(tab.title))}
                  $active={selectedTab === tab.title}
                >
                  {tab.title}
                  {selectedTab === tab.title && (
                    <TabUnderline
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        duration: 0.3,
                      }}
                    />
                  )}
                </TabButton>
              ))}
            </TabListWrapper>

            <AnimatePresence mode="wait">
              <TabContent
                key={selectedTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                {SEARCH_TABS.find(
                  (tab) => tab.title === selectedTab,
                )?.component()}
              </TabContent>
            </AnimatePresence>
          </LayoutGroup>
        </TabedSearchContainer>
      )}
    </AnimatePresence>
  );
};

export default TabedSearch;
