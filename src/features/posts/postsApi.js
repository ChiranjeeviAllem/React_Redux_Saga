const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=8";

export async function getPosts() {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
