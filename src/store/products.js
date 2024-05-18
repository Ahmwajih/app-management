import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://20004.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [] },
  reducers: {
    getProducts(state, action) {
      state.data = action.payload
    },
    createProduct(state, action) {
      state.data.push(action.payload)
    },
    deleteProduct(state, action) {
      state.data = state.data.filter((p) => p.id !== action.payload)
    },
    editProduct(state, action) {
      let index = state.data.findIndex((p) => p.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const productsReducer = productSlice.reducer

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(productSlice.actions.getProducts(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: product,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Product was successfully created!')
        dispatch(productSlice.actions.createProduct(res.data))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Product was successfully deleted.')
        dispatch(productSlice.actions.deleteProduct(id))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const editProduct = (product) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/${product.id}`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: product,
      })

      if (res.status === 200) {
        toast.success('Product successfully updated.')
        dispatch(productSlice.actions.editProduct(product))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
