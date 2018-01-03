import * as ReadableAPI from '../util/ReadableAPI'
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  GET_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE,
  SORT_POSTS
} from './constants'


//categories ---

export const requestCategories = () => {
  return{ type: REQUEST_CATEGORIES }
}

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => {
  return dispatch =>{
    dispatch(requestCategories())
    return ReadableAPI.fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
  }
}


//posts ----

export const requestPosts = () => {
  return{
    type: REQUEST_POSTS
  }
}

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const fetchPosts = (category) => (dispatch) => {
  return (
    ReadableAPI.fetchPosts(category)
    .then(posts => dispatch( receivePosts(posts)) )
  )
}


// get post ----

export const getPostAction = (post, id) => {
  return {
    type: GET_POST,
    post,
    id
  }
}

export const getPost = (id) => (dispatch) => {
  return (
    ReadableAPI.getPost(id)
    .then(postData => dispatch(getPostAction(postData, id)))
  )
}


// add post ----

export const addPostAction = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const addPost = (postData) => (dispatch) => {
  return (
    ReadableAPI.newPost(postData)
    .then(postData => dispatch(addPostAction(postData)))
  )
}


//edit post

export const editPostAction = (id, post) => {
  return {
    type: EDIT_POST,
    id,
    post
  }
}

export const editPost = (id, post) => (dispatch) => {
  return ReadableAPI.editPost(id, post)
    .then(post => dispatch(editPostAction(post)))
}

//delete post ---

export const deletePostAction = (post, id) => {
  return {
    type: DELETE_POST,
    post,
    id
  }
}

export const deletePost = (id) => (dispatch) => {
  return (
    ReadableAPI.deletePost(id)
    .then(post => dispatch(deletePostAction(post, id)))
  )
}


//fetch comments ---

export const getCommentsAction = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
};

export const getComments = (id) => (dispatch) => {
  return (
    ReadableAPI.getComments(id)
    .then(comments => dispatch(getCommentsAction(comments)))
  )
}

//get comment ---

export const getCommentAction = (id, comment) => {
  return {
    type: GET_COMMENT,
    comment,
    id
  }
}

export const getComment = (id) => dispatch => {
  return ReadableAPI.getComment(id)
    .then(comment => dispatch(editCommentAction(id, comment)))
}

//add comment ---

export const addCommentAction = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const addComment = (comment) => dispatch => {
  return (
    ReadableAPI.addComment(comment)
    .then(comment => dispatch(addCommentAction(comment)))
  )
}

//edit comments ---

export const editCommentAction = (id, comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export const editComment = (id, comment) => dispatch => {
  return ReadableAPI.editComment(id, comment)
    .then(comment => dispatch(editCommentAction(id, comment)))
}


//delete comment ---

export const deleteCommentAction = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export const deleteComment = (comment) => dispatch => {
  return (
    ReadableAPI.deleteComment(comment)
    .then(comment => dispatch(deleteCommentAction(comment)))
  )
}


//vote

export const vote = (id, score) => {
  return {
    type: VOTE,
    id,
    score,
  }
}

export const voteDispatch = (id, option, type) => (dispatch) => {
  return ReadableAPI.vote(id, option, type)
    .then( data => dispatch(vote(id, data.voteScore)) )
}


//sort

export const sortPostsAction = (posts, option) => ({
  type: SORT_POSTS,
  posts,
  option
})

export const sortPosts = (option, category) => dispatch => {
  return ReadableAPI.fetchPosts(category)
  .then(posts => dispatch(sortPostsAction(posts, option)))
}
