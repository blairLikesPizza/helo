import React, { Component } from 'react';
import './Search.css';
import SearchHeader from '../Header/SearchHeader.js';
import { getCurrentUser, getOtherUsers, filterFriendsFN, filterFriendsLN } from '../../ducks/reducer.js';
import { connect } from 'react-redux';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            otherusers: this.props.otherusers,
            name: '',
            value: 'first-name'
        }
        this.updateValue = this.updateValue.bind(this)
        this.searchName = this.searchName.bind(this)
        this.resetSearchSearch = this.resetSearchSearch.bind(this);
    }

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

    updateName(value) {
        console.log(value)
        this.setState({
            name: value
        })
    }

    updateValue(value){
        console.log(value)
        this.setState({
            value: value
        })
    }

    searchName(){
        if (this.state.value === 'first-name'){
            this.props.filterFriendsFN(this.state.name)
        } else if (this.state.value === 'last-name'){
            this.props.filterFriendsLN(this.state.name)
        }
    }

    resetSearchSearch(){
        this.props.getOtherUsers()
    }

    render() {
        const otherusers = this.props.otherusers
           console.log('this is the otherusers being mapped through', otherusers)
        return (
            <div className="search-root">
                <SearchHeader />
                <div>
                    <div className="search-top-container">
                        <div className="search-friends-container">
                            <div className="search-bar-banner">
                                <select name="search-criteria" onChange={(e) => this.updateValue(e.target.value)}>
                                    <option value="first-name">First Name</option>
                                    <option value="last-name">Last Name</option>
                                </select>
                                <input type="text" className="search-bar-input" onChange={(e) => this.updateName(e.target.value)}/>
                                <button className="search-button" onClick={this.searchName}>Search</button>
                                <button className="reset-button" onClick={this.resetSearchSearch}>Reset</button>
                            </div>
                            <div className="search-friend-tile-container">
                                <div className="search-friend-tiles">
                                    {otherusers.map((element, i) => (
                                        <div className="search-friend-tile" key={i}>
                                            <img src={element.id ? element.userimg : null} alt="" className="search-friend-img" />
                                            <div className="search-friend-name">{element.id ? element.firstname + ' ' : null}{element.id ? element.lastname : null}</div>
                                            <button>Add Friend</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { otherusers, firstName, lastName } = state;
    console.log('this is the state in mapStateToProps in Search Component', state)

    return {
        otherusers,
        firstName,
        lastName
    }
}

export default connect(mapStateToProps, { getCurrentUser, getOtherUsers, filterFriendsFN, filterFriendsLN })(Search);