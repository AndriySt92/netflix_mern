import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/AuthSlice'
import movieReducer from './reducers/movieReducer/MovieSlice'

const rootReducer = combineReducers({
    authReducer,
    movieReducer
})

export const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
