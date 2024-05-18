import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url =
  process.env.REACT_APP_BACKEND === 'true'
    ? process.env.REACT_APP_BASE_URL
    : 'https://20004.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: { data: [] },
  reducers: {
    getPurchases(state, action) {
      state.data = action.payload
    },
    createPurchase(state, action) {
      state.data.push(action.payload)
    },
    deletePurchase(state, action) {
      state.data = state.data.filter((p) => p.id !== action.payload)
    },
    editPurchase(state, action) {
      let index = state.data.findIndex((p) => p.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const purchasesReducer = purchasesSlice.reducer

export const getPurchases = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(purchasesSlice.actions.getPurchases(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createPurchase = (purchase) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: purchase,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Purchase was successfully added!')
        dispatch(purchasesSlice.actions.createPurchase(res.data))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const deletePurchase = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Purchase was successfully deleted.')
        dispatch(purchasesSlice.actions.deletePurchase(id))
      }
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }
}

export const editPurchase = (purchase) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/purchases/${purchase.id}`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: purchase,
      })

      if (res.status === 200) {
        toast.success('Purchase successfully updated.')
        dispatch(purchasesSlice.actions.editPurchase(purchase))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
