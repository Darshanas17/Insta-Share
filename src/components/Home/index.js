import {Component} from 'react'
import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import UserPost from '../UserPost'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="app-container-home">
          <div className="home-content-container">
            <StoriesSlider />
            <UserPost />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
