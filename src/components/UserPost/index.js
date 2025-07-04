import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPost extends Component {
  state = {apiStatus: apiStatusConstants.success, usersPosts: []}

  componentDidMount() {
    this.getPostsData()
  }

  getPostsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const postsAPI = 'https://apis.ccbp.in/insta-share/posts'
    const accessToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(postsAPI, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log('Fetched Posts Data: ', fetchedData)
      const updatedPosts = fetchedData.posts.map(post => ({
        id: post.post_id, // Use post_id instead of user_id if you want unique post key
        userId: post.user_id,
        userName: post.user_name,
        profilePic: post.profile_pic,
        postImage: post.post_details.image_url,
        caption: post.post_details.caption,
        likesCount: post.likes_count,
        comments: post.comments.map(comment => ({
          userName: comment.user_name,
          userId: comment.user_id,
          comment: comment.comment,
        })),
        createdAt: post.created_at,
      }))

      this.setState({
        usersPosts: updatedPosts,
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

  renderStoriesSliderView = () => {
    const {usersPosts} = this.state

    return (
      <div>
        {usersPosts.map(eachpost => (
          <div className="post-container" key={eachpost.id}>
            <div className="post-header">
              <div className="profile-border">
                <img
                  className="post-user-profile"
                  alt="user profile"
                  src={eachpost.profilePic}
                />
              </div>
              <p className="post-username">{eachpost.userName}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" data-testid="loader">
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
    return (
      <div className="slider-bg-container">{this.renderAllSliderViews()}</div>
    )
  }
}

export default UserPost
