import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../store/categories';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };
const handleEdit = (id) => {
  dispatch(deleteCategory(id));
}
  return (
    <Container>
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" size="small" onClick={() => handleEdit(category.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => handleDelete(category.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default Categories;
