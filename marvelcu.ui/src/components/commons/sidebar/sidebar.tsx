import { Container, SwipeableDrawer } from "@mui/material";
import React, { FC, ReactNode, SetStateAction } from "react";
import { containerSx } from "./styles";

interface SidebarProps {
  children: ReactNode[] | ReactNode;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}

const Sidebar: FC<SidebarProps> = ({ children, openState }) => {
  const [open, setOpen] = openState;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      <Container sx={containerSx}>{children}</Container>
    </SwipeableDrawer>
  );
};

export default Sidebar;
