# React Redux Saga Posts Demo

A small React app that fetches posts from JSONPlaceholder, stores them in Redux, and displays the request lifecycle.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page requests the first 8 posts on load. Use **Fetch again** to repeat the request or filter the results with the search field.

## Request flow

1. `App.jsx` dispatches `fetchPostsRequested()`.
2. `postsSaga.js` watches with `takeLatest` and invokes the worker saga.
3. The worker calls `getPosts()` using the `call` effect.
4. On success or failure, the worker dispatches a result action with `put`.
5. `postsSlice.js` stores the result and request status; React reads it with `useSelector`.

The Redux store and saga middleware are configured in `src/app/store.js`. The API helper is in `src/features/posts/postsApi.js`.
