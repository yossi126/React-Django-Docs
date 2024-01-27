import { AppBar, IconButton, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMobileOpen } from "../store/features/sideBarSlice";

const AppBarComponent = () => {
  const dispatch = useAppDispatch();
  const { mobileOpen, isClosing } = useAppSelector((state) => state.sideBar);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      dispatch(setMobileOpen(!mobileOpen));
    }
  };
  return (
    <AppBar
      sx={{
        display: { md: "none" },
      }}
      position="static"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
