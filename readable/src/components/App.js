import React, { Component } from 'react'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import Post from '../components/Post'
import New from '../components/NewPost'
import Edit from '../components/EditPost'
import EditC from '../components/EditComment'
import {Route, Switch} from 'react-router-dom'
import '../App.css';

class App extends Component {

  render() {
    return (

    <div className="App">
      <Nav/>

      <Switch>
        <Route exact path ='/'
        component = {Posts} />

        <Route exact path='/category/:category'
          render = {({match}) => (<Posts category = {match.params.category}/>)}/>

        <Route exact path='/new'
          render = {({history}) => (< New path = { history }/> )}/>

        <Route exact path='/:category/:id'
          render = {({match, history}) => (<Post
          path = {history}
          id = {match.params.id}/>)}
        />

        <Route exact path='/:category/edit/:id'
          render = {({match, history}) => (<Edit
          path = {history}
          id = {match.params.id}/>)}
        />

        <Route exact path='/:category/comments/:id'
          render = {({match, history}) => (<EditC
          path = {history}
          id = {match.params.id}/>)}
        />

      </Switch>
    </div>
    );
  }
}

export default App
