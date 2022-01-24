import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer/AuthSlice'
import listsReducer from './reducers/ListsReducer/ListsSlice'
import movieReducer from './reducers/movieReducer/MovieSlice'

const rootReducer = combineReducers({
    authReducer,
    movieReducer,
    listsReducer,
})

export const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
