import {Component} from 'react'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import StoryItem from '../StoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class StoriesSlider extends Component {
  state = {apiStatus: apiStatusConstants.success, usersStories: []}

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const userStoriesAPI = 'https://apis.ccbp.in/insta-share/stories'
    const accessToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userStoriesAPI, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log('Fetched User Stroies Data: ', fetchedData)
      const updatedData = fetchedData.users_stories.map(eachStory => ({
        id: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      this.setState({
        usersStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAllSliderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStoriesSliderView()
      case apiStatusConstants.inProgress:
        return this.renderStoriesLoadingView()
      case apiStatusConstants.failure:
        return this.renderStoriesFailureView()
      default:
        return null
    }
  }

  renderStoriesFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751977032/alert-triangle_c9ttfz.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.getStoriesData}
        className="retry-button"
      >
        Try again
      </button>
    </div>
  )

  renderStoriesSliderView = () => {
    const {usersStories} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {usersStories.map(eachStory => (
            <div className="slide-item" key={eachStory.id}>
              <StoryItem userStoryDetails={eachStory} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#4094EF"
        height={48}
        width={48}
        className="desktop-stories-loader"
      />
    </div>
  )

  render() {
    return <div className="main-container">{this.renderAllSliderViews()}</div>
  }
}

export default StoriesSlider
