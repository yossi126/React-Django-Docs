/**
 * Renders the sidebar component that displays a list of links, a dark mode toggle, and user information.
 */
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography, Switch } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsClosing, setMobileOpen } from "../store/features/sideBarSlice";
import { setDarkTheme } from "../store/features/themeSlice";
import { Link, useFetcher } from "react-router-dom";
import { links } from "../types/types";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";

const Content = () => {
  let fetcher = useFetcher();
  const { isDarkTheme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(setIsClosing(false));
    dispatch(setMobileOpen(false));
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6">Docs</Typography>
      </Toolbar>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {allLinks.map((link) => {
            return (
              <ListItem key={link.name} disablePadding>
                <ListItemButton onClick={handleDrawerClose}>
                  <ListItemIcon>
                    {/* Render the appropriate icon based on the link */}
                    {link.icon}
                  </ListItemIcon>
                  <Typography>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* dark mode toggle */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {isDarkTheme ? <NightlightIcon /> : <LightModeIcon />}
              </ListItemIcon>
              <Switch
                onChange={() => dispatch(setDarkTheme())}
                checked={isDarkTheme}
              />
            </ListItemButton>
          </ListItem>
        </List>
        {/* user  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mb: 4,
          }}
        >
          <Avatar>YB</Avatar>
          <Typography>Yossi Braunshtein</Typography>
          <Typography variant="caption">yossi126@gmail.com</Typography>
          {/* log out button */}
          <fetcher.Form method="post" action="/logout">
            <IconButton size="medium" type="submit">
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </fetcher.Form>
        </Box>
      </div>
    </>
  );
};

// side bar links
const allLinks: Array<links> = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    name: "Tutorials",
    icon: <ArticleIcon />,
    path: "/tutorials",
  },
  {
    name: "Favorites",
    icon: <FavoriteIcon />,
    path: "/favorites",
  },
  {
    name: "Queries",
    icon: <CodeIcon />,
    path: "/queries",
  },
];

/**
 * Renders the sidebar component that displays a list of links, a dark mode toggle, and user information.
 */
const SideBar = () => {
  const dispatch = useAppDispatch();
  const { mobileOpen } = useAppSelector((state) => state.sideBar);

  const handleDrawerTransitionEnd = () => {
    dispatch(setIsClosing(false));
  };

  const handleDrawerClose = () => {
    dispatch(setIsClosing(false));
    dispatch(setMobileOpen(false));
  };
  return (
    <>
      {/* main permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { sm: "block" },
          // boxSizing: "border-box",
          // width: "10%",

          "& .MuiDrawer-paper": {
            width: "10%",
            minWidth: "200px",
          },
        }}
      >
        <Content />
      </Drawer>
      {/* hamburger menu for smaller screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          // "& .MuiDrawer-paper": {
          //   width: "200px",
          // },
        }}
      >
        <Content />
      </Drawer>
    </>
  );
};

export default SideBar;
