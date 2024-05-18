import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, deleteBrand, createBrand, editBrand } from "../store/brands";
import { Box, Button, Modal, TextField, Typography, Container, Grid, Card, CardContent, CardActions, CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
});

function Brands() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '', address: '', image: '' });
  const brands = useSelector((state) => state.brands.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBrand(id));
  };

  const handleEdit = (brand) => {
    setEdit(true);
    setInitialValues(brand);
    setOpen(true);
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    if (edit) {
      dispatch(editBrand(values));
    } else {
      dispatch(createBrand(values));
    }
    actions.resetForm();
    setOpen(false);
  };

  const handleNewBrand = () => {
    setEdit(false);
    setInitialValues({ name: '', address: '', image: '' });
    setOpen(true);
  };

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h4">Brands</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleNewBrand}>Add Brand</Button>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {brands.map((brand) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={brand.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={brand.image}
                  alt={brand.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {brand.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); handleEdit(brand); }}>Edit</Button>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); handleDelete(brand.id); }}>Delete</Button>
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
          <Typography variant="h6">{edit ? 'Edit Brand' : 'Add New Brand'}</Typography>
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

export default Brands;
