import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, deletePost, voteDispatch} from '../actions/actions'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import Error from './Error'

class Post extends Component {

  removePost(){
    this.props.deletePost(this.props.id)
    .then(()=>this.props.path.push("/"))
  }

  componentDidMount(){
    this.props.getPost(this.props.id)
  }

  voteUpdate(id,option, type){
    this.props.vote(id,option, type)
    .then(()=> this.props.getPost(this.props.id))
  }

  render(){
    const {title, author, voteScore, id, timestamp, commentCount, category, body, error} = this.props.posts
    return(
      
      error || (id === undefined) ? <Error/> :
      <div className='content'>
        <div className='btns'>
          <button
            className='back'
            onClick = {()=>this.props.path.push("/")} >
            ← Back
          </button>
          <details>
            <summary>Options</summary>
            <div className='tooltip'>
              <button onClick={() =>
                this.voteUpdate(id, "upVote", 'post') }>
                Vote Up
              </button>

              <button onClick={() =>
                this.voteUpdate(id, "downVote", 'post') }>
                Vote Down
              </button>
              <Link to = {`/posts/edit/${id}`}><button>Edit</button></Link>

              <button onClick = {() =>
                this.removePost()} >
                Delete
              </button>
            </div>
          </details>
        </div>
        <div className='img-container'/>

        <div>
          <h2>{title}</h2>
          <p className='details'>
            Posted on {category} by {author} on {moment(timestamp).format('ll')}
            · Vote Score {voteScore}
          </p>
          <p className='post-body'>{body}</p>

        </div>

        <Comments
          id = {this.props.id}
          path = {this.props.path}
          commentCount = {commentCount}
        />
      </div>
   )
  }
}

const mapStateToProps = ({posts}) => ({
  posts
})

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id)),
  deletePost: (id) => dispatch(deletePost(id)),
  vote: (id, option, type) => dispatch(voteDispatch(id, option, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
