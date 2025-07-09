import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found-contianer">
        <img
          src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751952488/page_not_found_hhnesc.png"
          alt="page not found"
          className="page-not-found-image"
        />
        <h1 className="page-not-found-heading">Page Not Found</h1>
        <p className="page-not-found-description">
          we are sorry, the page you requested could not be found.Please go back
          to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="page-not-found-button">
            Home Page
          </button>
        </Link>
      </div>
    )
  }
}
export default NotFound
