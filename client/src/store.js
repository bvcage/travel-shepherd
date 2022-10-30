import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

const composedEnhancer = composeWithDevTools()

const store = configureStore(
   {reducer: rootReducer},
   composedEnhancer
)

export default store