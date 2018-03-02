import axios from 'axios';

const initialState = {
    otherusers: [],
    currentUser: {},
    sortedFriends: [],
    friends: []
}

console.log('initial state', initialState)

const GET_OTHERUSERS = "GET_OTHERUSERS";
const FILTER_FRIENDS_FN = "FILTER_FRIENDS_FN";
const FILTER_FRIENDS_LN = "FILTER_FRIENDS_LN";
const GET_CURRENT_USER = "GET_CURRENT_USER";
const SORT_OTHERUSERS = "SORT_OTHERUSERS";
const ADD_FRIEND = "ADD_FRIEND";

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_OTHERUSERS + '_FULFILLED':
            return Object.assign({}, state, { otherusers: action.payload })
        case FILTER_FRIENDS_FN + '_FULFILLED':
            return Object.assign({}, state, { otherusers: action.payload })
        case FILTER_FRIENDS_LN + '_FULFILLED':
            return Object.assign({}, state, { otherusers: action.payload })
        case GET_CURRENT_USER + '_FULFILLED':
            return Object.assign({}, state, { currentUser: action.payload })
        case SORT_OTHERUSERS:
            return Object.assign({}, state, { otherusers: action.payload })
        case ADD_FRIEND:
            return Object.assign({}, state, { friends: action.payload })
        default: return state;
    }
}

export function getOtherUsers(otherusers){
    const otherUserData = axios.get('/api/otherusers')
        .then(res => {
            // console.log('other users = ', res.data)
            return res.data
        })
    // console.log(otherUserData)
    return {
        type: GET_OTHERUSERS,
        payload: otherUserData
    }
}

export function getCurrentUser(currentUser){
    const currentUserData = axios.get('/api/currentuser')
        .then(res => {
            console.log('current user = ', res.data)
            return res.data
        })
        console.log(currentUserData)
    return {
        type: GET_CURRENT_USER,
        payload: currentUserData
    }
}

export function filterFriendsFN(firstName){
    console.log(firstName)
    const filteredFriendsFN = axios.get('/api/filteredfriendsFN/' + firstName)
         .then(res => {
             return res.data
         })
    console.log(filteredFriendsFN)
    return {
        type: FILTER_FRIENDS_FN,
        payload: filteredFriendsFN
    }
}

export function filterFriendsLN(lastName){
    console.log(lastName)
    const filteredFriendsLN = axios.get('/api/filteredfriendsLN/' + lastName)
    .then(res => {
             return res.data
         })
    console.log(filteredFriendsLN)
    return {
        type: FILTER_FRIENDS_LN,
        payload: filteredFriendsLN
    }
}

export function sortOtherUsers(array){
    // console.log('filtered friends in redux', this.props.filteredFriends)
    return {
        type: SORT_OTHERUSERS,
        payload: array
    }
}

export function addFriend(userid, friendid){
    console.log(initialState)
    const addedFriend = axios.post('/api/addfriend/' + userid + '/' + friendid)
        .then(res => {
            return res.data
        })
    return {
        type: ADD_FRIEND,
        payload: addedFriend
    }
}
export default reducer;