import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComment, editComment } from '../actions/actions'

class EditC extends Component {


  componentDidMount(){
    this.props.getComment(this.props.id)
  }

  handleAdd() {
    this.props.editComment(this.props.comments.id, this.state)
    .then(()=> this.props.path.push(`/${this.props.category}/${this.props.comments.parentId}`))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  state = {
    body: this.props.body
  }

  render(){
    const {author, body} = this.props.comments
    return (

      <div className='post-body'>
        <h2>Edit Comment by {author}</h2>
        <div className='options'>

          <button onClick={()=> window.history.back()}> Cancel </button>
          <button type='submit' onClick={() => this.handleAdd()} >
            Save Changes
          </button>
        </div>
        <textarea
          name='body'
          id='body'
          autoFocus
          placeholder='Comment'
          type='text'
          onChange={(e) => this.handleChange(e)}
          value = {this.state.body
                  || this.state.body === ''
                  ? this.state.body
                  : body}
        />


      </div>
    )
  }
}


const mapStateToProps = ({posts, comments}) => ({posts, comments})

const mapDispatchToProps = (dispatch) => ({
  getComment: (id,comment) => dispatch(getComment(id, comment)),
  editComment: (id, comment) => dispatch(editComment(id, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditC)
