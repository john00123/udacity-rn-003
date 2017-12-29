import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts , deletePost, voteDispatch, sortPosts } from '../actions/actions'
import * as moment from 'moment'
import { Link } from 'react-router-dom'

class Posts extends Component {

  removePost(id){
    this.props.deletePost(id)
    .then(() => this.props.fetchPosts(this.props.category) )
  }

  componentDidMount(){
    this.props.fetchPosts(this.props.category)
  }

  voteUpdate(id,option, type){
    this.props.vote(id,option, type)
    .then(()=>this.props.fetchPosts(this.props.category))
  }

  sortUpdate(){

  }


  render(){
    const {posts, sortPosts} = this.props
    const imgUrl = `https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=500&q=60`

    return(
      <div>

        <div className='sort-btns'>
          <li> Showing {this.props.posts.length} articles</li>
          <div className='jr'>
            <li> Sorted by</li>
            <select
              id='sorter'
              onChange={() => sortPosts(document.getElementById('sorter').value.toLowerCase(), this.props.category)}
            >
              <option>Time</option>
              <option>Title</option>
              <option>Votes</option>
            </select>
          </div>
        </div>

        {posts.length > 0 && posts.map((post) =>
          <div className='post'key={post.id}>
            <img className='image' src={imgUrl} alt='lady with flowers'/>

            <div className='text'>
              <Link to = {`/posts/${post.id}`} key = {post.id}>
                <h3 className='title'>{post.title}</h3>
                <p className='body'>{post.body}</p>
                <p className='footer'>
                  Published on {moment(post.timestamp).format('ll')}<br/><br/>
                  {post.commentCount} Comments · Score {post.voteScore}
                </p>
              </Link>

              <details>
              <summary>Options</summary>
                <div className='tooltip'>
                  <button onClick={() =>
                    this.voteUpdate(post.id, "upVote", 'post') }>
                    Vote Up
                  </button>

                  <button onClick={() =>
                    this.voteUpdate(post.id, "downVote", 'post') }>
                    Vote Down
                  </button>

                  <Link to = {`/posts/edit/${post.id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick = {() =>
                    this.removePost(post.id)} >
                    Delete
                  </button>
                </div>
              </details>
            </div>
        </div>

      )}
      </div>
    )
  }
}


const mapStateToProps = ({posts}) => ({posts})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (category) => dispatch(fetchPosts(category)),
  deletePost: (id) => dispatch(deletePost(id)),
  vote: (id, option, type) => dispatch(voteDispatch(id, option, type)),
  sortPosts: (option, category) => dispatch(sortPosts(option, category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
