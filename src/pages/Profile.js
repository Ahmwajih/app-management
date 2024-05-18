import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { changePassword } from '../store/authSlice'; // Assuming this is the correct path to your action
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const defaultTheme = createTheme();

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    currentPass: '',
    newPass: '',
    confirmPass: '',
  };

  const validationSchema = yup.object().shape({
    currentPass: yup.string().required('Required'),
    newPass: yup.string().required('Required'),
    confirmPass: yup
      .string()
      .oneOf([yup.ref('newPass')], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values, actions) => {
    const { currentPass, newPass } = values;
    dispatch(changePassword({ current_password: currentPass, new_password1: newPass, new_password2: newPass }))
      .then(() => {
        toast.success('Your password was changed successfully');
        actions.resetForm();
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              Change Password
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form>
                  <FormControl fullWidth margin="normal">
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="currentPass"
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      error={Boolean(touched.currentPass && errors.currentPass)}
                      helperText={touched.currentPass && errors.currentPass ? errors.currentPass : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="newPass"
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      error={Boolean(touched.newPass && errors.newPass)}
                      helperText={touched.newPass && errors.newPass ? errors.newPass : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPass"
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      error={Boolean(touched.confirmPass && errors.confirmPass)}
                      helperText={touched.confirmPass && errors.confirmPass ? errors.confirmPass : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Reset Password
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
