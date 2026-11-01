import { call, put, takeLatest } from "redux-saga/effects";
import { getPosts } from "./postsApi";
import {
  fetchPostsFailed,
  fetchPostsRequested,
  fetchPostsSucceeded,
} from "./postsSlice";

function* fetchPostsWorker() {
  try {
    const items = yield call(getPosts);
    yield put(
      fetchPostsSucceeded({ items, receivedAt: new Date().toISOString() }),
    );
  } catch (error) {
    yield put(fetchPostsFailed(error.message || "Unable to load posts"));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchPostsRequested.type, fetchPostsWorker);
}
