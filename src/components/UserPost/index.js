import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPost extends Component {
  state = {
    apiStatus: apiStatusConstants.success,
    usersPosts: [],
  }

  componentDidMount() {
    this.getPostsData()
  }

  // onClickSearchButton = () => {
  //   const {searchInput} = this.props
  //   console.log('Searched...')
  // }

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
        id: post.post_id,
        userId: post.user_id,
        userName: post.user_name,
        profilePic: post.profile_pic,
        postImage: post.post_details.image_url,
        caption: post.post_details.caption,
        likesCount: post.likes_count,
        comments: post.comments.map(comment => ({
          userName: comment.user_name,
          commentUserId: comment.user_id,
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

  renderAllPostViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostView()
      case apiStatusConstants.inProgress:
        return this.renderPostLoadingView()
      case apiStatusConstants.failure:
        return this.renderPostFailureView()
      default:
        return null
    }
  }

  renderPostFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751977032/alert-triangle_c9ttfz.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.getPostsData}
        className="retry-button"
      >
        Try again
      </button>
    </div>
  )

  renderPostView = () => {
    const {usersPosts} = this.state

    return (
      <ul className="post-list-container">
        {usersPosts.map(eachPost => (
          <li className="post-container" key={eachPost.id}>
            <div className="post-header">
              <div className="profile-border">
                <img
                  className="post-user-profile"
                  alt="post author profile"
                  src={eachPost.profilePic}
                />
              </div>
              <Link to={`/users/${eachPost.userId}`}>
                <p className="post-username">{eachPost.userName}</p>
              </Link>
            </div>
            <img className="post-image" alt="post" src={eachPost.postImage} />
            <div className="post-footer">
              <div className="post-icon-container">
                {eachPost.isLiked ? (
                  <button
                    testid="unLikeIcon"
                    className="icon-button"
                    type="button"
                    onClick={() => this.onClickLike(eachPost.id)}
                  >
                    <BsHeartFill className="icon heart-fiiled-icon" />
                  </button>
                ) : (
                  <button
                    testid="likeIcon"
                    className="icon-button"
                    type="button"
                    onClick={() => this.onClickLike(eachPost.id)}
                  >
                    <BsHeart className="icon" />
                  </button>
                )}

                <button className="icon-button" type="button">
                  <FaRegComment className="icon" />
                </button>
                <button className="icon-button" type="button">
                  <BiShareAlt className="icon" />
                </button>
              </div>
              <p className="post-total-likes">{eachPost.likesCount} likes</p>
              <p className="post-caption">{eachPost.caption} likes</p>
              <ul className="comments-list">
                {eachPost.comments.map(eachComment => (
                  <li key={eachComment.commentUserId}>
                    <p className="post-comment">
                      <span className="comment-username">
                        {eachComment.userName}
                      </span>{' '}
                      {eachComment.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="post-created-at">{eachPost.createdAt}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderPostLoadingView = () => (
    <div className="post-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#4094EF"
        height={48}
        width={48}
        className="post-loader"
      />
    </div>
  )

  // onClickLike = postId => {
  //   this.setState(prevState => ({
  //     usersPosts: prevState.usersPosts.map(post => {
  //       if (post.id === postId) {
  //         const updatedLikesCount = post.isLiked
  //           ? post.likesCount - 1
  //           : post.likesCount + 1
  //         return {
  //           ...post,
  //           likesCount: updatedLikesCount,
  //           isLiked: !post.isLiked,
  //         }
  //       }
  //       return post
  //     }),
  //   }))
  // }

  onClickLike = async postId => {
    const {usersPosts} = this.state
    const targetPost = usersPosts.find(eachPost => eachPost.id === postId)
    const likeStatus = !targetPost.isLiked

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({like_status: likeStatus}),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.setState(prevState => ({
        usersPosts: prevState.usersPosts.map(eachPost => {
          if (eachPost.id === postId) {
            const updatedLikesCount = eachPost.isLiked
              ? eachPost.likesCount - 1
              : eachPost.likesCount + 1
            return {
              ...eachPost,
              likesCount: updatedLikesCount,
              isLiked: !eachPost.isLiked,
            }
          }
          return eachPost
        }),
      }))
    } else {
      console.error('Failed to update like status')
    }
  }

  render() {
    return <div className="post-bg-container">{this.renderAllPostViews()}</div>
  }
}

export default UserPost
