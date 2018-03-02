import React, { Component } from 'react';
import './Dashboard.css';
import DashboardHeader from '../Header/DashboardHeader.js';
import { Link } from 'react-router-dom';
import { getOtherUsers, getCurrentUser, sortOtherUsers, addFriend } from '../../ducks/reducer.js';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            otherusers: this.props.otherusers,
            currentUser: this.props.currentUser,
            sortby: '',
            friends: []
        }
       this.handleSortBy = this.handleSortBy.bind(this)
       this.addFriend = this.addFriend.bind(this)
    }

// componentDidMount(){
//     if (!this.state.currentUser){
        
//     }
// }

componentWillMount(){
    const { getOtherUsers, getCurrentUser } = this.props
    axios.get('/auth/me')
    .then((res) => {
        console.log('this is the response', res)
        if (!res.data.id) {
            this.props.history.push('/');
        }
    })
    getCurrentUser()
    getOtherUsers()

}

handleSortBy(event){
    // console.log('state in the sort funcit\\', this.state)
    var sortby;

    switch(event.target.value){
        case 'first-name':
          sortby = 'firstname'
          break;
        case 'last-name':
          sortby = 'lastname'
          break;
        case 'gender':
          sortby = 'gender'
          break;
        case 'hobby':
          sortby = 'hobby'
          break;
        case 'hair-color':
          sortby = 'haircolor'
          break;
        case 'eye-color':
          sortby = 'eyecolor'
          break;
        case 'birthday':
          sortby = 'birthdayday'
          break;
        default: 
          sortby = 'firstname'
    }
        var filteredFriends = _.orderBy(this.props.otherusers, [sortby], ['asc'])
        console.log('filtered friends', filteredFriends)
            this.props.sortOtherUsers(filteredFriends)
}

addFriend(){
    console.log('current user', this.props.currentUser)
    console.log('other users id', this.props.otherusers)
    this.props.addFriend(this.props.currentUser.id, this.props.otherusers[25].id)
}

    render() {
        const otherusers = this.props.otherusers
        // console.log('state in the render function', this.state)
        return (
            <div className="dashboard-root">
                <DashboardHeader />
                <div className="top-container-dashboard">
                    <div className="edit-profile-tile">
                        <img src={this.props.currentUser.userimg} alt="" className="profile-image-dash" />
                        <div className="user-right">
                            <div className="profile-firstname-dash">{this.props.currentUser.firstname}</div>
                            <div className="profile-lastname-dash">{this.props.currentUser.lastname}</div>
                            <Link to="/profile"><button className="edit-profile-button">Edit Profile</button></Link>
                        </div>
                    </div>
                    <div className="welcome-tile">
                        <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                    </div>
                </div>
                <div className="recommended-friends-root">
                    <div className="recommended-friends-container">
                        <div className="top-friends-banner">
                            <p className="recommended-friends">Recommended Friends</p>
                            <div className="sorted-by-menu">
                                <p className="sorted-by">Sorted by</p>
                            <select name="features" onChange={this.handleSortBy}>
                                <option value="first-name">First Name</option>
                                <option value="last-name">Last Name</option>
                                <option value="gender">Gender</option>
                                <option value="hobby">Hobby</option>
                                <option value="hair-color">Hair Color</option>
                                <option value="eye-color">Eye Color</option>
                                <option value="birthday">Birthday</option>
                            </select>
                            </div>
                        </div>
                        <div className="recommended-friend-tiles">
                          {otherusers.map((element, i) => (
                        <div className="recommended-friend-tile" key={i}>
                            <img src={element.id ? element.userimg : null} alt="" className="rec-friend-img" />
                            <div className="rec-friend-name">{element.id ? element.firstname + ' ' : null}{element.id ? element.lastname : null}</div>
                            <button onClick={this.addFriend}>Add Friend</button>
                        </div>
                        ))}  
                        {this.state.filteredFriends}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { otherusers, currentUser, sortOtherUsers } = state;
    // console.log('state on redux', state)

    return {
        otherusers,
        currentUser
    }
}

export default connect(mapStateToProps, { getOtherUsers, getCurrentUser, sortOtherUsers, addFriend })(Dashboard);