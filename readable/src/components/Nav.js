import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/actions'
import { Link } from 'react-router-dom'
// import sortBy from 'sort-by'

class Nav extends Component {

  componentDidMount(){
   this.props.fetchCategories()
  }

  render(){
    const {categories} = this.props
    return (
      <div className='master-header'>
        <header>
          <Link to='/'
          onClick = { ()=> this.props.fetchPosts() }
          >
            <h2> Readable </h2>
          </Link>

          <Link to='/new'>
            <button>Create a Post</button>
          </Link>
        </header>

        <div className='subheader-container' >
          <div className='subheader'>
            {categories.length > 0 && categories.map((category) =>
              <li key = { category.path } >
                <Link
                  to = { category.path === 'all' ?
                  `/` : `/category/${category.path}` }
                  onClick = { ()=> this.props.fetchPosts(category) }
                >
                  { category.name }
                </Link>
              </li>
            )}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => ({
  categories,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
