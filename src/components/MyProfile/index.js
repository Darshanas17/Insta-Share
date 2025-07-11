import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import ProfilePosts from '../ProfilePosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const profileAPI = 'https://apis.ccbp.in/insta-share/my-profile'
    const accessToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(profileAPI, options)
    if (response.ok) {
      const data = await response.json()
      const {profile} = data
      const updatedProfile = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        postsCount: profile.posts_count,
        posts: profile.posts.map(post => ({
          id: post.id,
          image: post.image,
        })),
        stories: profile.stories.map(story => ({
          id: story.id,
          image: story.image,
        })),
      }

      this.setState({
        profileData: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={48} width={48} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751977032/alert-triangle_c9ttfz.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.getProfileData}
        className="retry-button"
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state

    const altValues = {
      profile: 'my profile',
      story: 'my story',
      post: 'my post',
    }

    return (
      <div className="profile-container">
        <ProfileDetails profileData={profileData} altValues={altValues} />
        <ProfilePosts profileData={profileData} altValues={altValues} />
      </div>
    )
  }

  renderProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="profile-bg-container">{this.renderProfileView()}</div>
      </>
    )
  }
}

export default MyProfile
