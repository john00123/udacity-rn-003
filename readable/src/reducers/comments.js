import {
GET_COMMENT,
GET_COMMENTS,
ADD_COMMENT,
EDIT_COMMENT,
DELETE_COMMENT } from '../actions/constants'

const comments = (state = [], action) =>{
  const {comments, comment} = action

  switch(action.type){
    case GET_COMMENTS:
      return comments


    case GET_COMMENT:
      return {
        ...state,
        comment
    }

    case ADD_COMMENT:
      return {
        ...state,
        comment
      }

    case EDIT_COMMENT:
       return  comment

    case DELETE_COMMENT:
    return {
      ...state
    }

    default:
      return state
  }
}

export default comments
