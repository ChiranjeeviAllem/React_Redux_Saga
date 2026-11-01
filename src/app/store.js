import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import postsReducer from '../features/posts/postsSlice'
import { rootSaga } from '../features/posts/postsSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)