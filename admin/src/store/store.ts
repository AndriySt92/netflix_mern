import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/AuthSlice'
import usersReducer from './reducers/usersReducer/UsersSlice'
import moviesReducer from './reducers/moviesReducer/MoviesSlice'


const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    moviesReducer,
})

export const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch