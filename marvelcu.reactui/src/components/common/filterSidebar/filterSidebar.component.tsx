import { FC, ReactNode, SetStateAction } from "react";
import { SidebarContainer } from "./filterSidebar.styles";
import { SwipeableDrawer } from "@mui/material";

type Props = {
  children: ReactNode[] | ReactNode;
  setShowSidebar: (value: SetStateAction<boolean>) => void;
  showSidebar: boolean;
};
const FilterSidebar: FC<Props> = ({
  children,
  setShowSidebar,
  showSidebar,
}) => {
  const handleOpen = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={handleClose}
      onOpen={handleOpen}
      open={showSidebar}
    >
      <SidebarContainer>{children}</SidebarContainer>
    </SwipeableDrawer>
  );
};

export default FilterSidebar;
