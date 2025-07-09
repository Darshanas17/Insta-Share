import './index.css'

const ProfileDetails = props => {
  const {profileData, altValues} = props
  const {
    userId,
    profilePic,
    userName,
    userBio,
    followersCount,
    followingCount,
    postsCount,
    stories,
  } = profileData
  const {profile, story} = altValues
  console.log(profile)
  console.log(story)

  return (
    <div className="profile-details-bg-container">
      <div className="profile-details-container">
        <img alt={profile} src={profilePic} className="profile-photo" />

        <div className="profile-details">
          <h1 className="user-name-heading">{userName}</h1>

          <ul className="posts-follower-following">
            <li className="pff-item">
              <p className="p-f-f-number">{postsCount}</p>
              <p className="p-f-f-text">posts</p>
            </li>
            <li className="pff-item">
              <p className="p-f-f-number">{followersCount}</p>
              <p className="p-f-f-text">followers</p>
            </li>
            <li className="pff-item">
              <p className="p-f-f-number">{followingCount}</p>
              <p className="p-f-f-text">following</p>
            </li>
          </ul>
          <p className="user-name">{userId}</p>
          <p className="user-bio">{userBio}</p>
        </div>
      </div>

      <div className="profile-details-container-mobile">
        <h1 className="user-name-heading">{userName}-Mobile</h1>

        <div className="profile-details-photo-pff">
          <img alt={profile} src={profilePic} className="profile-photo" />
          <div className="posts-follower-following">
            <p className="p-f-f-text">
              <span className="p-f-f-number">{postsCount}</span> posts
            </p>
            <p className="p-f-f-text">
              <span className="p-f-f-number">{followersCount}</span> followers
            </p>
            <p className="p-f-f-text">
              <span className="p-f-f-number">{followingCount}</span> following
            </p>
          </div>
        </div>
        <p className="user-name">{userName}</p>
        <p className="user-bio">{userBio}</p>
      </div>

      <div className="stories-container">
        <ul className="stories-list">
          {stories.map(eachStories => (
            <li className="stories-list-item" key={eachStories.id}>
              <img
                className="stories-image"
                src={eachStories.image}
                alt={story}
              />
            </li>
          ))}
        </ul>
      </div>
      <hr className="hr-line" />
    </div>
  )
}

export default ProfileDetails
