import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, deleteComment, addComment, voteDispatch } from '../actions/actions'
import uuid from 'uuid'
import * as moment from 'moment'



class Comments extends Component {

  state = {
    author: 'John',
    body: '',
    parentId: this.props.id,
    id: uuid(),
    timestamp: Date.now(),
  }

  handlerDelete(comment){
    this.props.deleteComment(comment)
    .then(() => this.props.getComments(this.props.id))
  }

  handlerAdd(){
    if (this.state.body !== ''){
    this.setState({ id: uuid()})
    this.setState({ timeStamp: Date.now()})
    this.props.addComment(this.state)
    .then(() => {
      this.props.getComments(this.props.id)
      this.setState({body: ''})
      }
    )
  } else { alert('No data entered')}
  }

  componentDidMount(){
    this.props.getComments(this.props.id)

    document.getElementById("comment-input").addEventListener("keydown", function() {
      if (window.event.keyCode === 13) {
        document.getElementById('submit-comment').click()
      }
    }, false);
  }

  voteUpdate(id,option, type){
    this.props.vote(id,option, type)
    .then(()=> this.props.getComments(this.props.id))
  }


  handleChange(k) {
    this.setState({ [k.target.name]: k.target.value })
  }

  render(){
    const {comments, path} = this.props

    return (
      <div>

        <div className='comment-input'>
          <input
            name='body'
            id='comment-input'
            autoFocus
            type ='text'
            placeholder='New comment here'
            onChange={(e) => this.handleChange(e)}
          />

          <button
            id='submit-comment'
            onClick = {() => {
              this.handlerAdd()
              document.getElementById('comment-input').value = ''
            }}
          >
            Submit
          </button>
        </div>
        <p className='footer'>{comments.length} Comments</p>
        <div className='comment-container'>
          {comments.length > 0 && comments.map(comment =>
            <div className='comment' key={comment.id}>
              <p className='comment-body'>
                {comment.body}<br/>
                by {comment.author} {moment(comment.timestamp).fromNow()} · Score {comment.voteScore}
              </p>

              <details>
              <summary>Options</summary>
              <div className='tooltip'>
                <button onClick={() => this.voteUpdate(comment.id, "upVote", 'comment') }> Vote Up
                </button>

                <button onClick={() => this.voteUpdate(comment.id, "downVote", 'comment') }> Vote Down
                </button>

                <button onClick={() => path.push(`/comments/${comment.id}`)}>
                  Edit
                </button>

                <button onClick = {()=> this.handlerDelete(comment.id)}>
                  Delete
                </button>
              </div>
              </details>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({comments}) => ({comments})


const mapDispatchToProps = (dispatch) => ({
  getComments: (id) => dispatch(getComments(id)),
  deleteComment: (id) => dispatch(deleteComment(id)),
  addComment:(comment) => dispatch(addComment(comment)),
  vote: (id, option, type) => dispatch(voteDispatch(id, option, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
