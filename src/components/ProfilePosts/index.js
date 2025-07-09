import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const ProfilePosts = props => {
  const {profileData, altValues} = props
  const {posts} = profileData

  const {post} = altValues

  return (
    <div className="user-posts-container">
      <h1 className="user-posts-heading">
        <BsGrid3X3 className="grid-icon" /> Posts
      </h1>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts-container">
            <div className="camera-container">
              <BiCamera className="camera-icon" />
            </div>
            <h1 className="no-post-description">No Posts</h1>
          </div>
        ) : (
          <ul className="posts-list-container">
            {posts.map(eachPost => (
              <li className="post-list-item" key={eachPost.id}>
                <img src={eachPost.image} alt={post} className="posts-image" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfilePosts
