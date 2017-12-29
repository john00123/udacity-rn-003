import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, addPost } from '../actions/actions'
import uuid from 'uuid'

class New extends Component {

  state = {
    id: uuid(),
    author: 'You',
    category: '',
    title: '',
    body: '',
    timestamp: Date.now(),
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validate() {
    let msg = '';
    if(this.state.author === '') {
      msg = msg + 'Author is required.\n';
    }
    if(this.state.title === '') {
      msg = msg +'Title is required.\n';
    }
    if(this.state.body === '') {
      msg = msg +'Body is required.\n';
    }
    if(this.state.category === '') {
      msg = msg +'Category is required.\n'
    }
    if(msg === '') {
      return ;
    }
    return alert(msg);
  }

  componentDidMount(){
    this.props.fetchCategories()
  }


  handleAdd() {
    const postData = this.state;
    this.validate()
    this.props.addPost(postData)
    this.props.path.push("/")
 }

  render(){
    const {categories} = this.props
    
    return (
      <div className='post-body'>
        <h2> New Post</h2>
        <p> Create your article underneath, make sure to Publish your work.</p>
        <div className='options'>
          <select
            name='category'
            onChange={(e) => this.handleChange(e)}
            >
            {categories.length > 0 && categories.map(
              (category) => <option key={category.path}>{category.path === 'all' ? 'Select Category' : category.path}</option>
            )}
          </select>
          <div>
            <button onClick={()=> window.history.back()}> Cancel </button>
            <button type='submit' onClick={() => this.handleAdd()} >
              Publish
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
            value = {this.state.title}
          />
          <br/>
          <br/>
          <textarea
            name='body'
            id='body'
            placeholder='Start here'
            type='text'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.body}
          />
        </form>
      </div>
    )
  }

}


const mapStateToProps = ({categories}) => ({
  categories,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  addPost: (postData) => dispatch(addPost(postData))
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
