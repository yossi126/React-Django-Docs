import { TextField, Button, Typography } from "@mui/material";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
} from "react-router-dom";
import { fakeAuthProvider } from "../auth";

const AuthPage = () => {
  let actionData = useActionData() as { error: string } | undefined;

  return (
    <Form method="post">
      <TextField
        type="email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        // required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body1" color="error">
        {actionData?.error}
      </Typography>
    </Form>
  );
};

export const loader = async () => {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

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
