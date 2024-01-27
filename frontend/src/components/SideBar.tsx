import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { Box, Card, CardHeader, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsClosing, setMobileOpen } from "../store/features/sideBarSlice";
import { Link } from "react-router-dom";
import { links } from "../types/types";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Content = () => {
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(setIsClosing(false));
    dispatch(setMobileOpen(false));
  };
  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Docs
        </Typography>
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
                  <Typography fontFamily="Open Sans">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Card>
          <CardHeader
            avatar={<Avatar>R</Avatar>}
            action={
              <IconButton size="small">
                <LogoutIcon fontSize="inherit" />
              </IconButton>
            }
            title="Yossi B."
            // subheader="yossi126@gmail.com"
          />
        </Card>

        {/* <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AccountCircleIcon />

          <Box>
            <Typography variant="subtitle2">Yossi B.</Typography>
            <Typography variant="caption">yossi126@gmail.com</Typography>
          </Box>
          <IconButton size="small">
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Box> */}
      </div>
    </>
  );
};

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
            // width: "10%",
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
