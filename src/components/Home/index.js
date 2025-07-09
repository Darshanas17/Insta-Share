import {Component} from 'react'

import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import UserPost from '../UserPost'
import SearchedResultsPost from '../SearchedResultsPost'

import './index.css'

class Home extends Component {
  state = {searchInput: '', isSearchClicked: false, searchTrigger: 0}

  onChangeSearchInputHandler = value => {
    this.setState({searchInput: value})
  }

  onClickSearchButtonHandler = () => {
    const {searchInput} = this.state
    if (searchInput.trim() === '') {
      this.setState({isSearchClicked: false})
    } else {
      this.setState(prevState => ({
        isSearchClicked: true,
        searchTrigger: prevState.searchTrigger + 1,
      }))
    }
  }

  render() {
    const {searchInput, isSearchClicked, searchTrigger} = this.state
    return (
      <div className="home-bg-container">
        <Header
          onChangeSearchInputHandler={this.onChangeSearchInputHandler}
          onClickSearchButtonHandler={this.onClickSearchButtonHandler}
        />
        <div className="app-container-home">
          <div className="home-content-container">
            {!isSearchClicked && <StoriesSlider />}
            {!isSearchClicked ? (
              <UserPost />
            ) : (
              <SearchedResultsPost
                searchInput={searchInput}
                searchTrigger={searchTrigger}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
