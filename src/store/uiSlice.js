import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    modalData: {},
    lat: 0,
    lng: 0,
  },
  reducers: {
    toggleMenu(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setModalData(state, action) {
      state.modalData = action.payload
    },
    setCoord(state, action) {
      state.lat = action.payload.lat
      state.lng = action.payload.lng
    },
  },
})

const uiReducer = uiSlice.reducer
const uiActions = uiSlice.actions
export { uiReducer, uiActions }
