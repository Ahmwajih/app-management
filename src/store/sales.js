import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://20004.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const salesSlice = createSlice({
  name: 'sales',
  initialState: { data: [] },
  reducers: {
    getSales(state, action) {
      state.data = action.payload
    },
    createSale(state, action) {
      state.data.push(action.payload)
    },
    deleteSale(state, action) {
      state.data = state.data.filter((s) => s.id !== action.payload)
    },
    editSale(state, action) {
      let index = state.data.findIndex((s) => s.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const salesReducer = salesSlice.reducer

export const getSales = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(salesSlice.actions.getSales(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createSale = (sale) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: sale,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Sale was successfully added!')
        dispatch(salesSlice.actions.createSale(res.data))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const deleteSale = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Sale was successfully deleted.')
        dispatch(salesSlice.actions.deleteSale(id))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const editSale = (sale) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/${sale.id}`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: sale,
      })

      if (res.status === 200) {
        toast.success('Sale successfully updated.')
        dispatch(salesSlice.actions.editSale(sale))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
