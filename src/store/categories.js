import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url ='https://28217.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { data: [] },
  reducers: {
    getCategories(state, action) {
      state.data = action.payload
    },
    createCategory(state, action) {
      state.data.push(action.payload)
    },
    deleteCategory(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload)
    },
    editCategory(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const categoriesReducer = categoriesSlice.reducer

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(categoriesSlice.actions.getCategories(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: category,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Category was successfully created!')
        dispatch(categoriesSlice.actions.createCategory(res.data))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Category was successfully deleted.')
        dispatch(categoriesSlice.actions.deleteCategory(id))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const editCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/categories/${category.id}`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: category,
      })

      if (res.status === 200) {
        toast.success('Category successfully updated.')
        dispatch(categoriesSlice.actions.editCategory(category))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
