import axios from 'axios'
import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const url ='https://28217.fullstack.clarusway.com'

const token = sessionStorage.getItem('token')

const firmSlice = createSlice({
  name: 'firms',
  initialState: { data: [] },
  reducers: {
    getFirms(state, action) {
      state.data = action.payload
    },
    createFirm(state, action) {
      state.data.push(action.payload)
    },
    deleteFirm(state, action) {
      state.date = state.data.filter((f) => f.id !== action.payload)
    },
    editFirm(state, action) {
      let index = state.data.findIndex((f) => f.id === action.payload.id)
      state.data[index] = action.payload
    },
  },
})

export const firmReducer = firmSlice.reducer

export const getFirms = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 200) {
        dispatch(firmSlice.actions.getFirms(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const createFirm = (firm) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: firm,
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 201) {
        toast.success('Firm was successfully created!')
        dispatch(firmSlice.actions.createFirm(res.data))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const deleteFirm = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/${id}/`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      })

      if (res.status === 204) {
        toast.success('Firm was successfully deleted.')
        dispatch(firmSlice.actions.deleteFirm(id))
      }
    } catch (err) {
      console.log(err.response.data.detail)
    }
  }
}

export const editFirm = (firm) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/firms/${firm.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: firm,
      })

      if (res.status === 200) {
        toast.success('Firm was successfully updated.')
        dispatch(firmSlice.actions.editFirm(firm))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
