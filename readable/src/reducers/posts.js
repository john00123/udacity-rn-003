import {
  RECEIVE_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  SORT_POSTS } from '../actions/constants'
import sortBy from 'sort-by'

const posts = (state = {}, action) =>{
  const {posts, post, option} = action

  switch(action.type){
    case RECEIVE_POSTS:
      return posts

    case GET_POST:
      return {
        ...state,
        ...post
      }

    case ADD_POST:
      return {
        ...state,
        post
      }

    case DELETE_POST:

      return{
        ...state,
        posts: state.posts
      }

    case SORT_POSTS :
      let sorted
      if (option === 'time'){
        sorted = posts.sort(sortBy('timestamp'))
      } else if (option === 'title'){
        sorted = posts.sort(sortBy('title'))
      } else if (option === 'votes'){
        sorted = posts.sort(sortBy('-voteScore'))
      }

      return sorted


    default:
      return state
  }
}

export default posts
