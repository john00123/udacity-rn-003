import {
  RECEIVE_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  SORT_POSTS, VOTE } from '../actions/constants'
import sortBy from 'sort-by'

const posts = (state = {}, action) =>{
  const {posts, post, option, id, score} = action

  switch(action.type){
    case RECEIVE_POSTS:
      return posts

    case GET_POST:
      return [post]


    case ADD_POST:
      return {
        ...state,
        post
      }

    case DELETE_POST:
      return state.filter(post => post.id !== id)
      // {
      //   ...state,
      //   posts: state.posts
      // }

    case VOTE:
    return state.map(post => post.id === id ?
      {
        ...post,
        voteScore : score
      }
      : post )


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
