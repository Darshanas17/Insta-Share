import './index.css'

const StoryItem = props => {
  const {userStoryDetails} = props
  const {userName, storyUrl} = userStoryDetails
  return (
    <div className="slider-item-container">
      <img className="story-image" alt="user story" src={storyUrl} />
      <p className="story-username">{userName}</p>
    </div>
  )
}

export default StoryItem
