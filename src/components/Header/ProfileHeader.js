import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class ProfileHeader extends Component {
    render() {
        return (
            <div className="header-root">
                <div className="header-content-container">
                    <div className="header-logo-container">
                        <p className="helo-word">Helo</p>
                        <Link to="/dashboard"><p><img src="https://github.com/DevMountain/simulation-3/blob/master/assets/home.png?raw=true" alt="" className="home-img"/></p></Link>
                        <Link to="/search"><p><img src="https://github.com/DevMountain/simulation-3/blob/master/assets/search.png?raw=true" alt="" className="search-img"/></p></Link>
                    </div>
                    <div>
                        <p className="dashboard-word">Profile</p>
                    </div>
                    <div className="logout-header">
                       <a href='http://localhost:3002/auth/logout'><p>Logout</p></a>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProfileHeader;