import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import vote from './votes'


export default combineReducers({
 categories,
 posts,
 comments,
 vote
})
