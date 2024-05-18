import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import  {uiReducer}  from './uiSlice'
import { categoriesReducer } from './categories'
import { brandsReducer } from './brands'
import { firmReducer } from './firms'
import { productsReducer } from './products'
import { salesReducer } from './sales'
import { purchasesReducer } from './purchases'
//import all other reducer  brands, purchase, etc... //

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    firms: firmReducer,
    products: productsReducer,
    sales: salesReducer,
    purchases: purchasesReducer,
  },
})

export default store

