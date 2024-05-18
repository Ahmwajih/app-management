import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Menu, MenuItem } from "@mui/material";
import { Avatar } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AdminPanelSettings,
  Dashboard,
  Inventory2,
  Receipt,
  AddShoppingCart,
  AccountBalance,
  Stars,
  Category,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const drawerWidth = 240;

const menu = [
  {
    title: "Admin Panel",
    icon: <AdminPanelSettings />,
    path: "/stock/dashboard",
  },
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/stock/dashboard",
  },
  {
    title: "Products",
    icon: <Inventory2 />,
    path: "/stock/products",
  },
  {
    title: "Sales",
    icon: <Receipt />,
    path: "/stock/sales",
  },
  {
    title: "Purchases",
    icon: <AddShoppingCart />,
    path: "/stock/purchases",
  },
  {
    title: "Firms",
    icon: <AccountBalance />,
    path: "/stock/firms",
  },
  {
    title: "Brands",
    icon: <Stars />,
    path: "/stock/brands",
  },
  {
    title: "Categories",
    icon: <Category />,
    path: "/stock/categories",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  backgroundColor: "#1976D2",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = sessionStorage.getItem("username");
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => (open ? handleDrawerClose() : handleDrawerOpen())}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Clarusway Stock App
            </Typography>
          </Box>
          {currentUser && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ cursor: "pointer", mr: 2 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar src="/broken-image.jpg" alt={currentUser.toUpperCase()} />
              </Box>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Avatar
                      src="/broken-image.jpg"
                      alt={currentUser.toUpperCase()}
                      variant="square"
                    />
                    <Stack direction="column" textAlign="center">
                      <Typography
                        ml="50px"
                        variant="h6"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {currentUser}
                      </Typography>
                      <Typography
                        ml="50px"
                        variant="subtitle2"
                        sx={{ textTransform: 'capitalize', color: 'gray' }}
                      >
                        {sessionStorage.getItem('admin') ? 'Admin' : 'User'}
                      </Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate('/stock/profile')}>
                  <PasswordIcon sx={{ mr: 2 }} />
                  Change Password
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => dispatch(logout(navigate))}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {menu.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    Color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Stack>
          <Card sx={{ minWidth: 275 }} xs={12} sm={4} md={5}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom  
            >
              <Outlet/>
            </Typography>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}  