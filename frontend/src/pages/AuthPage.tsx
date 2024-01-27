/**
 * Represents the authentication page component.
 */
import {
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  Link,
  Box,
  IconButton,
} from "@mui/material";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
} from "react-router-dom";
import { fakeAuthProvider } from "../auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../store/store";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setDarkTheme } from "../store/features/themeSlice";

const AuthPage = () => {
  /**
   * Retrieves the action data from the router.
   */
  let actionData = useActionData() as { error: string } | undefined;

  /**
   * Retrieves the dark theme state from the store.
   */
  const { isDarkTheme } = useAppSelector((state) => state.theme);

  /**
   * Dispatches the setDarkTheme action.
   */
  const dispatch = useAppDispatch();

  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      bgcolor={"background.default"}
      color={"text.primary"}
    >
      {/* left side - picture */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={8}
        sx={{
          // backgroundColor: "primary.main",
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Welcome 👋
          </Typography>
          <Box sx={{ alignSelf: "end" }}>
            <IconButton size="small" onClick={() => dispatch(setDarkTheme())}>
              {isDarkTheme ? (
                <NightlightIcon fontSize="inherit" />
              ) : (
                <LightModeIcon fontSize="inherit" />
              )}
            </IconButton>
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "error.main", alignSelf: "center" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography variant="body2" gutterBottom>
            Don't have an account?{" "}
            <Link href="#" underline="hover">
              {"Email us"}
            </Link>
          </Typography>
          <Form method="post">
            <TextField
              type="email"
              name="email"
              // variant="outlined"
              margin="normal"
              size="medium"
              label="Email Address"
              fullWidth
              autoFocus
              // required
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Typography variant="body1" color="error">
              {actionData?.error}
            </Typography>
          </Form>

          <Box component="footer" bgcolor={"background.default"} sx={{ py: 3 }}>
            <Typography textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

/**
 * Loader function that checks if the user is already authenticated and redirects accordingly.
 * @returns A redirect object if the user is authenticated, otherwise null.
 */
export const loader = async () => {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

/**
 * Action function that handles the form submission and authentication.
 * @param request - The request object containing the form data.
 * @returns An object with an error message if the login attempt is invalid, otherwise redirects to the proper destination.
 */
export const action = async ({ request }: LoaderFunctionArgs) => {
  let formData = await request.formData();
  let username = formData.get("email") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a email to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username!);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }
  return redirect("/");
};

export default AuthPage;
