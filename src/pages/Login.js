import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../store/authSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Ahmed
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().max(255).required("Password is required"),
  });
  const handleSubmit = (values, actions) => {
    dispatch(login(values, navigate)); // Dispatch login action
    actions.resetForm(); // Reset form after submission
  };

  return (
    <div className="">
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) ? errors.email : ""}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        Boolean(touched.password) ? errors.password : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="remember"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => navigate("/register")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
