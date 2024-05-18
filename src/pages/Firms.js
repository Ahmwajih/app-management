import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirms, deleteFirm, createFirm, editFirm } from '../store/firms';
import { Box, Button, Modal, Typography, Container, Grid, Card, CardContent, CardActions, CardMedia, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
});

function Firms() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '', address: '', image: '' });
  const firms = useSelector((state) => state.firms.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFirms());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFirm(id));
  };

  const handleEdit = (firm) => {
    setEdit(true);
    setInitialValues(firm);
    setOpen(true);
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    if (edit) {
      dispatch(editFirm(values));
    } else {
      dispatch(createFirm(values));
    }
    actions.resetForm();
    setOpen(false);
  };

  const handleNewFirm = () => {
    setEdit(false);
    setInitialValues({ name: '', address: '', image: '' });
    setOpen(true);
  };

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h4">Firms</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleNewFirm}>New Firm</Button>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {firms.map((firm) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={firm.id}>
              <Card onClick={() => navigate(`/map/${firm.id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={firm.image}
                  alt={firm.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {firm.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); handleEdit(firm); }}>Edit</Button>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); handleDelete(firm.id); }}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box p={3} sx={{ backgroundColor: 'white', borderRadius: '8px', width: '400px' }}>
          <Typography variant="h6">{edit ? 'Edit Firm' : 'Add New Firm'}</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  name="name"
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Address"
                  name="address"
                  margin="normal"
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Image URL"
                  name="image"
                  margin="normal"
                  error={touched.image && Boolean(errors.image)}
                  helperText={touched.image && errors.image}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
}

export default Firms;
