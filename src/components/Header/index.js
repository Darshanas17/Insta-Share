import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import {RxHamburgerMenu} from 'react-icons/rx'
import {IoIosCloseCircle} from 'react-icons/io'

import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const activeTabConstants = {
  HOME: '/',
  PROFILE: '/my-profile',
}

class Header extends Component {
  state = {
    showMobileMenu: false,
    showSearchBar: false,
  }

  // Toggle mobile menu visibility
  onClickHamburgerMenu = () => {
    this.setState(prevState => ({
      showMobileMenu: !prevState.showMobileMenu,
    }))
  }

  onClickHamburgerMenuClose = () => {
    this.setState({
      showMobileMenu: false,
    })
  }

  toggleSearchActiveTab = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickSearch = () => {
    console.log('Search Button Clicked')
  }

  render() {
    const {location} = this.props
    const currentPath = location.pathname

    const isHomeActive = currentPath === activeTabConstants.HOME
    const isProfileActive = currentPath === activeTabConstants.PROFILE

    const {showMobileMenu} = this.state

    return (
      <>
        <div className="header-bg-container">
          <div className="header-container">
            {/* Logo Section */}
            <div className="header-logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1751363307/insta_share_logo_n7l2xq.png"
                  className="header-logo-image"
                  alt="website logo"
                />
              </Link>
              <h1 className="header-logo-name">Insta Share</h1>
            </div>

            {/* Desktop View */}
            <div className="header-laptop-container">
              <div className="header-search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search Caption"
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearch}
                >
                  <FaSearch className="search-icon" testid="searchIcon" />
                </button>
              </div>

              <div className="header-list-items-container">
                <Link to="/">
                  <p
                    className={`header-list-item ${
                      isHomeActive ? 'active-tab' : ''
                    }`}
                  >
                    Home
                  </p>
                </Link>

                <Link to="/my-profile">
                  <p
                    className={`header-list-item ${
                      isProfileActive ? 'active-tab' : ''
                    }`}
                  >
                    Profile
                  </p>
                </Link>

                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Mobile Hamburger */}
            <div className="header-mobile-container">
              <button
                type="button"
                className="humburger-menu"
                onClick={this.onClickHamburgerMenu}
              >
                <RxHamburgerMenu />
              </button>
            </div>
          </div>
          {/* Mobile Dropdown Menu */}
          {showMobileMenu && (
            <div className="show-mobile-menu">
              <Link to="/">
                <p
                  className={`header-list-item ${
                    isHomeActive ? 'active-tab' : ''
                  }`}
                >
                  Home
                </p>
              </Link>

              <p
                className="header-list-item"
                onClick={this.toggleSearchActiveTab}
              >
                Search
              </p>

              <Link to="/my-profile">
                <p
                  className={`header-list-item ${
                    isProfileActive ? 'active-tab' : ''
                  }`}
                >
                  Profile
                </p>
              </Link>

              <button
                type="button"
                className="logout-button header-list-item"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="humburger-menu-close header-list-item"
                onClick={this.onClickHamburgerMenuClose}
              >
                <IoIosCloseCircle />
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
