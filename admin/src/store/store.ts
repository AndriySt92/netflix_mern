import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/AuthSlice'
import usersReducer from './reducers/usersReducer/UsersSlice'


const rootReducer = combineReducers({
    authReducer,
    usersReducer,
})

export const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch