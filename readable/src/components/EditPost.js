import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, editPost } from '../actions/actions'

class Edit extends Component {


  componentDidMount(){
    this.props.getPost(this.props.id).then(()=>
    this.setState({
      title: this.props.posts[0].title,
      body: this.props.posts[0].body,
      category: this.props.posts[0].category
    }))
  }

  handleAdd() {
    this.props.editPost(this.props.id, this.state)
    .then(()=> window.history.back())
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  state = {
    title: this.props.posts[0].title,
    body: this.props.posts[0].body,
    category: this.props.posts[0].category
  }

  render(){
    const {title, category, body} = this.props.posts

    const {categories} = this.props

    return (
      <div className='post-body'>
        <h2>Edit Post</h2>
        <div className='options'>

          <select
            name='category'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.category
                    || this.state.category === ''
                    ? this.state.category
                    : category}
            >
            {categories.length > 0 && categories.map(
              (category) =>
                <option key={category.path}>
                  {category.path === 'all' ? 'Select Category' : category.path}
                </option>
            )}
          </select>

          <div>
            <button onClick={()=> window.history.back()}> Cancel </button>
            <button type='submit' onClick={() => this.handleAdd()} >
              Save Changes
            </button>
          </div>

        </div>

        <form className='post-form'>
          <input
            name='title'
            autoFocus
            placeholder='Title'
            type='text'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.title
                    || this.state.title === ''
                    ? this.state.title
                    : title}
          />
          <br/>
          <br/>
          <textarea
            name='body'
            id='body'
            placeholder='Start here'
            type='text'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.body
                    || this.state.body === ''
                    ? this.state.body
                    : body}
          />
        </form>
      </div>
    )
  }
}


const mapStateToProps = ({posts, categories}) => ({posts, categories})

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id)),
  editPost: (id, post) => dispatch(editPost(id, post))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
