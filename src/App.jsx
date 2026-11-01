import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsRequested } from "./features/posts/postsSlice";
import "./styles.css";

function App() {
  const dispatch = useDispatch();
  const { items, status, error, lastUpdated } = useSelector(
    (state) => state.posts,
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPostsRequested());
  }, [dispatch]);

  const filteredPosts = items.filter((post) =>
    `${post.title} ${post.body}`.toLowerCase().includes(query.toLowerCase()),
  );
  const currentStep = status === "loading" ? 2 : status === "idle" ? 1 : 4;
  const statusLabel = {
    idle: "Ready to fetch",
    loading: "Fetching posts",
    succeeded: "Synced to Redux",
    failed: "Request failed",
  }[status];

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Saga Posts home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>state / stories</span>
        </a>
        <div className="topbar-meta">
          <span className="topbar-dot" /> REDUX SAGA LAB{" "}
          <span className="meta-divider">/</span> DEMO 01
        </div>
      </header>

      <main id="top" className="workspace">
        <section className="intro-row">
          <div>
            <p className="eyebrow">A small, live data flow</p>
            <h1>
              Posts from an API<span className="title-period">.</span>
            </h1>
            <p className="intro-copy">
              Follow one request from dispatch to the Redux store.
            </p>
          </div>
          <div className={`sync-status status-${status}`} aria-live="polite">
            <span className="status-indicator" />
            <span className="sync-copy">
              <small>REQUEST STATUS</small>
              <strong>{statusLabel}</strong>
            </span>
            <span className="sync-code">
              {status === "loading"
                ? "GET"
                : status === "failed"
                  ? "ERR"
                  : "OK"}
            </span>
          </div>
        </section>

        <section className="source-strip" aria-label="Data source">
          <div className="source-label">
            <span className="source-symbol" aria-hidden="true">
              ↗
            </span>
            <span>DATA SOURCE</span>
          </div>
          <a
            href="https://jsonplaceholder.typicode.com/posts"
            target="_blank"
            rel="noreferrer"
          >
            jsonplaceholder.typicode.com/posts
          </a>
          <span className="source-note">
            PUBLIC REST API <span>·</span> FIRST 8 POSTS
          </span>
        </section>

        <section className="summary-row" aria-label="Request summary">
          <div className="summary-item">
            <span className="summary-number">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="summary-label">POSTS IN STORE</span>
          </div>
          <div className="summary-item">
            <span className="summary-number summary-number--accent">
              {String(filteredPosts.length).padStart(2, "0")}
            </span>
            <span className="summary-label">MATCHING VIEW</span>
          </div>
          <div className="summary-updated">
            <span className="summary-label">LAST UPDATED</span>
            <span>
              {lastUpdated
                ? new Date(lastUpdated).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Waiting for first fetch"}
            </span>
          </div>
          <span className="summary-state">
            {status === "succeeded"
              ? "STATE: CURRENT"
              : status === "loading"
                ? "STATE: UPDATING"
                : "STATE: " + status.toUpperCase()}
          </span>
        </section>

        <div className="content-grid">
          <section className="posts-panel" aria-labelledby="posts-heading">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">THE RESPONSE</p>
                <h2 id="posts-heading">
                  Latest posts <span>{items.length}</span>
                </h2>
              </div>
              <div className="panel-actions">
                <label className="search-box">
                  <span className="search-icon" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Filter posts"
                    aria-label="Filter posts"
                  />
                  {query && (
                    <button
                      className="clear-search"
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </label>
                <button
                  className="fetch-button"
                  type="button"
                  onClick={() => dispatch(fetchPostsRequested())}
                  disabled={status === "loading"}
                >
                  <span
                    className={
                      status === "loading"
                        ? "refresh-glyph is-spinning"
                        : "refresh-glyph"
                    }
                    aria-hidden="true"
                  >
                    ↻
                  </span>
                  Fetch again
                </button>
              </div>
            </div>

            {error && (
              <div className="error-banner" role="alert">
                <span className="error-mark">!</span>
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => dispatch(fetchPostsRequested())}
                >
                  Retry
                </button>
              </div>
            )}

            {status === "loading" && items.length === 0 ? (
              <div className="post-list" aria-label="Loading posts">
                {[1, 2, 3].map((item) => (
                  <div className="post-skeleton" key={item}>
                    <span />
                    <div>
                      <i />
                      <i />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="post-list">
                {filteredPosts.map((post, index) => (
                  <article className="post-row" key={post.id}>
                    <span className="post-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                      <span className="post-author">
                        USER ID <b>{String(post.userId).padStart(2, "0")}</b>
                      </span>
                    </div>
                    <span className="post-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-mark">∅</span>
                <strong>
                  {items.length ? "No matching posts" : "No posts loaded yet"}
                </strong>
                <span>
                  {items.length
                    ? "Try another search term."
                    : "The response will appear here after the request completes."}
                </span>
              </div>
            )}

            <div className="list-footer">
              <span>
                SHOWING {String(filteredPosts.length).padStart(2, "0")} OF{" "}
                {String(items.length).padStart(2, "0")} RECORDS
              </span>
              <span>
                JSON <b>·</b> REST
              </span>
            </div>
          </section>

          <aside className="flow-panel" aria-labelledby="flow-heading">
            <div className="flow-heading">
              <div>
                <p className="eyebrow">UNDER THE HOOD</p>
                <h2 id="flow-heading">Saga flow</h2>
              </div>
              <span className="flow-badge">4 STEPS</span>
            </div>
            <ol className="flow-list">
              <li
                className={
                  currentStep > 1
                    ? "flow-step is-complete"
                    : "flow-step is-current"
                }
              >
                <span className="step-number">01</span>
                <div>
                  <h3>Dispatch action</h3>
                  <code>fetchPostsRequested()</code>
                  <p>The component asks Redux to load posts.</p>
                </div>
              </li>
              <li
                className={
                  currentStep > 2
                    ? "flow-step is-complete"
                    : currentStep === 2
                      ? "flow-step is-current"
                      : "flow-step"
                }
              >
                <span className="step-number">02</span>
                <div>
                  <h3>Saga watches</h3>
                  <code>takeLatest(...)</code>
                  <p>The watcher starts the latest request.</p>
                </div>
              </li>
              <li
                className={
                  currentStep > 3
                    ? "flow-step is-complete"
                    : currentStep === 3
                      ? "flow-step is-current"
                      : "flow-step"
                }
              >
                <span className="step-number">03</span>
                <div>
                  <h3>Call the API</h3>
                  <code>call(getPosts)</code>
                  <p>A worker saga handles the async fetch.</p>
                </div>
              </li>
              <li
                className={
                  currentStep >= 4 ? "flow-step is-current" : "flow-step"
                }
              >
                <span className="step-number">04</span>
                <div>
                  <h3>Store the result</h3>
                  <code>put(fetchPostsSucceeded)</code>
                  <p>The slice saves the response in Redux.</p>
                </div>
              </li>
            </ol>
            <div className="flow-note">
              <span className="note-spark" aria-hidden="true">
                ✳
              </span>
              <p>
                <strong>Why Saga?</strong> It keeps async work outside the
                component, where it can be watched, cancelled, and tested.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <footer className="page-footer">
        <span>
          STATE / STORIES <b>—</b> REDUX SAGA EXAMPLE
        </span>
        <span>BUILT WITH REDUX TOOLKIT + REDUX-SAGA</span>
      </footer>
    </div>
  );
}

export default App;
