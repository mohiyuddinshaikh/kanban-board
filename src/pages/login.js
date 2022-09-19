import * as React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import * as userActions from "../store/reducers/user.slice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName");
    const password = data.get("password");

    const userRecord = users.filter(
      (user) =>
        (user.userName === userName || user.email === userName) &&
        user.password === password
    );

    if (!userRecord.length) {
      alert("Invalid username/email or password");
      return;
    }

    // reduxDispatch()

    let payload = {
      ...userRecord[0],
    };
    delete payload.password;
    dispatch(userActions.update(payload));
    goToDashboard();
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const redirectToRegister = () => {
    navigate("/signup");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="lastName"
                label="Username / Email"
                name="userName"
                autoComplete="family-name"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link variant="body2" onClick={redirectToRegister}>
                Not a member? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
