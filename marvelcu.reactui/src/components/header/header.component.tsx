import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import { LogoIcon, HeaderBox, HeaderButton } from "./header.styles";
import {
  selectCurrentUser,
  setCredentials,
} from "../../store/reducers/user.slice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/auth.service";
import { findElement } from "../../utils/findElement";

const pages: string[] = ["Movies", "Heroes", "Actors", "News"];

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [logout] = authService.useLogoutMutation();

  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(setCredentials({ user: null, token: null }));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderBox>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: "none" }} to={`/${page}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </HeaderBox>

          <LogoIcon>
            <img src="/marvel.svg" alt="logo" />
          </LogoIcon>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                style={{ textDecoration: "none" }}
                to={`/${page}`}
              >
                <HeaderButton key={page}>{page}</HeaderButton>
              </Link>
            ))}
            {currentUser &&
              findElement(
                currentUser?.roles,
                process.env.REACT_APP_ADMIN_ROLE as string
              ) && (
                <Link style={{ textDecoration: "none" }} to={`/admin`}>
                  <HeaderButton>Admin</HeaderButton>
                </Link>
              )}
          </Box>

          <HeaderBox />
          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">{currentUser.firstName[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={"Profile"}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to="/profile"
                >
                  <Typography textAlign="center">{"Profile"}</Typography>
                </MenuItem>
                <MenuItem
                  key={"Logout"}
                  onClick={async () => {
                    handleCloseUserMenu();
                    await handleLogout();
                  }}
                  component={Link}
                  to="/login"
                >
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link style={{ textDecoration: "none" }} to={`/login`}>
              <HeaderButton>Login</HeaderButton>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
