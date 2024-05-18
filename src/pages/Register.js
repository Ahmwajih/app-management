import * as React from 'react';
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
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';
import { register } from '../store/authSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Copyright(props) {
  return (
    <div>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Ahmed
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate(); // Hook for navigation
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup.string().max(255).required('Username is required'),
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    firstName: yup.string().max(255).required('First name is required'),
    lastName: yup.string().max(255).required('Last name is required'),
    password: yup.string().max(255).required('Password is required'),
  });
  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    dispatch(register({ ...values, password2: values.password }));
    actions.resetForm();
   navigate('/stock/dashboard');
  };

  return (
    <div className="">
      <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
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
                        name="username"
                        label="Username"
                        type="text"
                        autoComplete="username"
                        error={Boolean(errors.username) && Boolean(touched.username)}
                        helperText={Boolean(touched.username) ? errors.username : ''}
                      />
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
                        helperText={Boolean(touched.email) ? errors.email : ''}
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        type="text"
                        autoComplete="first-name"
                        error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                        helperText={Boolean(touched.firstName) ? errors.firstName : ''}
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        type="text"
                        autoComplete="last-name"
                        error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                        helperText={Boolean(touched.lastName) ? errors.lastName : ''}
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        error={Boolean(errors.password) && Boolean(touched.password)}
                        helperText={Boolean(touched.password) ? errors.password : ''}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormControlLabel
                        control={<Field as={Checkbox} name="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
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
                    {/* Use Link for navigation */}
                    <Link onClick={() => navigate('/')} variant="body2">
                      {'Already have an account? Sign In'}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Stack>
    </div>
  );
}
