import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";
import {
  selectUser,
  setCredentials,
} from "../../services/store/slices/user.slice";
import {
  BoxStyled,
  btnSx,
  iconSx,
  pagesSx,
  userBoxSx,
  userIconBoxSx,
  userMenuSx,
} from "./styles";
import AuthOnly from "../commons/authOnly/authOnly";

const pages: readonly string[] = ["movies", "heroes", "actors", "news"];

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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
    await logout();
    handleCloseUserMenu();

    const initialCredentials = { user: null, jwt: null };
    dispatch(setCredentials(initialCredentials));
  };

  // Components

  const Pages = (): JSX.Element => {
    return (
      <Box sx={pagesSx}>
        {pages.map((page) => (
          <Link key={page} className="linkNon" to={`/${page}`}>
            <Button sx={btnSx} key={page}>
              {page}
            </Button>
          </Link>
        ))}

        <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
          <AdminMenuItem />
        </AuthOnly>
      </Box>
    );
  };

  const LoginLink = (): JSX.Element => {
    return (
      <Link className="linkNon" to={`/login`}>
        <Button sx={btnSx}>Login</Button>
      </Link>
    );
  };

  const AdminMenuItem = (): JSX.Element => {
    return (
      <Link className="linkNon" to={`/admin`}>
        <Button sx={btnSx}>Admin</Button>
      </Link>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BoxStyled>
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
          </BoxStyled>

          <Icon sx={iconSx}>
            <img src="/marvel.svg" alt="logo" />
          </Icon>
          <Pages />
          <BoxStyled />
          {user ? (
            <Box sx={userBoxSx}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={userIconBoxSx}>
                  <Avatar alt="User">{user.firstName[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={userMenuSx}
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
                  onClick={handleLogout}
                  component={Link}
                  to="/login"
                >
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <LoginLink />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
