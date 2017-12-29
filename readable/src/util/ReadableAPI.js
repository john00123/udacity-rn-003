const api = 'http://localhost:3001';

let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)


const headers = {
  'Accept': 'application/json',
  'Content-Type' : 'application/json',
  'Authorization': token
}

//fetch

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const fetchPosts = category => {
  const url = category ? `${api}/${category}/posts` : `${api}/posts`
  return fetch(url, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)


//add

export const newPost = (postData) => {

  return fetch(`${api}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers
   })
   .then(res => res.json())
   .then(data => data)
}

//update

export const editPost = (id, post) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers
   })
   .then(res => res.json())
   .then(data => data)
}

//remove

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
   })
    .then(res => res.json())
    .then(data => data)


//vote

export const vote = (id, option, type) => {
  const voteData = {id, option};

  if(type === 'post'){
    return fetch(
      `${api}/posts/${id}`,
      {
        method: 'POST',
        body: JSON.stringify(voteData),
        headers
      }
    )
    .then(response => response.json())
    .then(data => data)
  } else {
    return fetch(
      `${api}/comments/${id}`,
      {
        method: 'POST',
        body: JSON.stringify(voteData),
        headers
      }
    )
    .then(response => response.json())
    .then(data => data)
  }
};

// COMMENTS --------
// fetch

export const getComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)


export const getComment = id =>
  fetch(`${api}/comments/${id}`, { method:'GET', headers })
    .then(res => res.json())
    .then(data => data)


//add
export const addComment = comment => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers
   })
    .then(res => res.json())
    .then(data => data)
}

//edit

export const editComment = (id, comment) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers
  })
  .then(res => res.json())
  .then(data => data)
}

//remove

export const deleteComment = comment =>
  fetch(`${api}/comments/${comment}`, {
    method: 'DELETE',
    headers,
   })
    .then(res => res.json())
    .then(data => data)
