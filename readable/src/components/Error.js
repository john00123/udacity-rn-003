import React, { Component } from 'react'
import * as rooster from '../vid/rooster.mp4';

class Error extends Component {
  render(){
    return(
    <div className='error-container'>

    <video width="320" height="240" autoPlay loop>
    <source src={rooster} type="video/mp4"/>
    </video>
      <h4>Sorry the requested article is no longer available</h4>
      <button className='back' onClick={()=> window.history.back()}> Go back </button>
    </div>
  )
  }
}

export default(Error)
