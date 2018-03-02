import React, { Component } from 'react';
import './Profile.css';
import ProfileHeader from '../Header/ProfileHeader.js';
import { getCurrentUser} from '../../ducks/reducer.js';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: this.props.currentUser,
            firstName: '',
            lastName: '',
            gender: '',
            hairColor: '',
            eyeColor: '',
            hobby: '',
            birthdayDay: '',
            birthdayMonth: '',
            birthdayYear: '',
            auth_id: this.props.currentUser.auth_id
        }
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateGender = this.updateGender.bind(this);
        this.updateHairColor = this.updateHairColor.bind(this);
        this.updateEyeColor = this.updateEyeColor.bind(this);
        this.updateHobby = this.updateHobby.bind(this);
        this.updateBirthdayDay = this.updateBirthdayDay.bind(this);
        this.updateBirthdayMonth = this.updateBirthdayMonth.bind(this);
        this.updateBirthdayYear = this.updateBirthdayYear.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    componentWillMount(){
    const { getCurrentUser } = this.props
    axios.get('/auth/me')
    .then((res) => {
        console.log('this is the response', res)
        if (!res.data.id) {
            this.props.history.push('/');
        }
    })
    getCurrentUser()

}

    updateFirstName(value){
        console.log(value)
        this.setState({
            firstName: value
        })
    }
    
    updateLastName(value){
        console.log(value)
        this.setState({
            lastName: value
        })
    }

    updateGender(value){
        console.log(value)
        this.setState({
            gender: value
        })
    }

    updateHairColor(value){
        console.log(value, 'hair')
        this.setState({
            hairColor: value
        })
    }
    
    updateEyeColor(value){
        console.log(value, 'eyes')
        this.setState({
            eyeColor: value
        })
    }
    
    updateHobby(value){
        console.log(value)
        this.setState({
            hobby: value
        })
    }
    
    updateBirthdayDay(value){
        console.log(value)
        this.setState({
            birthdayDay: value
        })
    }
    
    updateBirthdayMonth(value){
        console.log(value)
        this.setState({
            birthdayMonth: value
        })
    }
    
    updateBirthdayYear(value){
        console.log(value)
        this.setState({
            birthdayYear: value
        })
    }

    // updateUser(){
    //     axios.put('/api/users/' + this.state.firstName + '/' + this.state.lastName + '/' + this.state.gender + '/' + this.state.hairColor + '/' + this.state.eyeColor + '/' + this.state.hobby + '/' + this.state.birthdayDay + '/' + this.state.birthdayMonth + '/' + this.state.birthdayYear + '/' + this.state.auth_id)
    //       .then(res => {
    //           return res
    //       })
    // }
    
    updateUser(){
        axios.put('/api/users/' + this.state.auth_id, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            hairColor: this.state.hairColor,
            eyeColor: this.state.eyeColor,
            hobby: this.state.hobby,
            birthdayDay: this.state.birthdayDay,
            birthdayMonth: this.state.birthdayMonth,
            birthdayYear: this.state.birthdayYear,
            auth_id: this.state.auth_id
        })
          .then(res => {
          this.props.getCurrentUser()
              return res
         })
          .catch((error) => console.log(error))
    }

    cancelUpdate(){
        this.setState({
            firstName: this.props.currentUser.firstname,
            lastName: this.props.currentUser.lastname,
            gender: this.props.currentUser.gender,
            hairColor: this.props.currentUser.haircolor,
            eyeColor: this.props.currentUser.eyecolor,
            hobby: this.props.currentUser.hobby,
            birthdayDay: this.props.currentUser.birthdayday,
            birthdayMonth: this.props.currentUser.birthdaymonth,
            birthdayYear: this.props.currentUser.birthdayyear
        })
        
    }

    render() {
        console.log('this is stattttte', this.state)
        // console.log('this is the auth id', this.state.auth_id)
        return (
            <div className="profile-top-container">
                <ProfileHeader />
                <div className="profile">
                    <div className="profile-root">
                        <div className="update-profile-tile">
                            <div className="image-and-name">
                                <img src={this.state.currentUser.userimg} alt="" className="profile-image-dash" />
                                <div className="update-profile-right">
                                    <div className="profile-name-first">{this.props.currentUser.firstname}</div>
                                    <div className="profile-name-last">{this.props.currentUser.lastname}</div>
                                </div>
                            </div>
                            <div className="update-buttons">
                                <button className="update-button" onClick={this.updateUser}>Update</button>
                                <button className="cancel-button" onClick={this.cancelUpdate}>Cancel</button>
                            </div>
                        </div>
                        <div className="update-info-root">
                            <div className="update-info-container">
                                <div className="update-info-column-one">
                                    <p>First Name</p>
                                    <input type="text" defaultValue={this.state.currentUser.firstname} onChange={(e) => this.updateFirstName(e.target.value)}/>
                                    <p>Last Name</p>
                                    <input type="text" defaultValue={this.state.currentUser.lastname} onChange={(e) => this.updateLastName(e.target.value)}/>
                                    <p>Gender</p>
                                    <select name="gender" defaultValue={this.state.currentUser.gender} onChange={(e) => this.updateGender(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <p>Hair Color</p>
                                    <select name="hair-color" defaultValue={this.state.currentUser.haircolor} onChange={(e) => this.updateHairColor(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="brown">Brown</option>
                                        <option value="black">Black</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="red">Red</option>
                                        <option value="blonde">Blonde</option>
                                        <option value="white">White</option>
                                        <option value="gray">Gray</option>
                                    </select>
                                    <p>Eye Color</p>
                                    <select name="eye-color" defaultValue={this.state.currentUser.eyecolor} onChange={(e) => this.updateEyeColor(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="brown">Brown</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="black">Black</option>
                                        <option value="hazel">Hazel</option>
                                        <option value="purple">Purple</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>
                                <div className="update-info-column-two">
                                    <p>Hobby</p>
                                    <select name="hobby" defaultValue={this.state.currentUser.hobby} onChange={(e) => this.updateHobby(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="video-games">Video Games</option>
                                        <option value="hiking">Hiking</option>
                                        <option value="fishing">Fishing</option>
                                        <option value="rafting">Rafting</option>
                                        <option value="skateboarding">Skateboarding</option>
                                        <option value="painting">Painting</option>
                                        <option value="rollerblading">Roller Blading</option>
                                        <option value="playing-guitar">Playing Guitar</option>
                                        <option value="singing">Singing</option>
                                        <option value="camping">Camping</option>
                                        <option value="reading">Reading</option>
                                        <option value="boating">Boating</option>
                                        <option value="basketball">Basketball</option>
                                        <option value="pottery">Pottery</option>
                                        <option value="running">Running</option>
                                        <option value="carpentry">Carpentry</option>
                                        <option value="sewing">Sewing</option>
                                        <option value="drama">Drama</option>
                                        <option value="acting">Acting</option>
                                    </select>
                                    <p>Birthday Day</p>
                                    <select name="birthdayDay" defaultValue={this.state.currentUser.birthdayday} onChange={(e) => this.updateBirthdayDay(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    <p>Birthday Month</p>
                                    <select name="birthday-month" defaultValue={this.state.currentUser.birthdaymonth} onChange={(e) => this.updateBirthdayMonth(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                    <p>Birthday Year</p>
                                    <select name="birthday-year" defaultValue={this.state.currentUser.birthdayyear} onChange={(e) => this.updateBirthdayYear(e.target.value)}>
                                        <option>--Select--</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                        <option value="2009">2009</option>
                                        <option value="2008">2008</option>
                                        <option value="2007">2007</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>
                                        <option value="1949">1949</option>
                                        <option value="1948">1948</option>
                                        <option value="1947">1947</option>
                                        <option value="1946">1946</option>
                                        <option value="1945">1945</option>
                                        <option value="1944">1944</option>
                                        <option value="1943">1943</option>
                                        <option value="1942">1942</option>
                                        <option value="1941">1941</option>
                                        <option value="1940">1940</option>
                                        <option value="1939">1939</option>
                                        <option value="1938">1938</option>
                                        <option value="1937">1937</option>
                                        <option value="1936">1936</option>
                                        <option value="1935">1935</option>
                                        <option value="1934">1934</option>
                                        <option value="1933">1933</option>
                                        <option value="1932">1932</option>
                                        <option value="1931">1931</option>
                                        <option value="1930">1930</option>
                                        <option value="1929">1929</option>
                                        <option value="1928">1928</option>
                                        <option value="1927">1927</option>
                                        <option value="1926">1926</option>
                                        <option value="1925">1925</option>
                                        <option value="1924">1924</option>
                                        <option value="1923">1923</option>
                                        <option value="1922">1922</option>
                                        <option value="1921">1921</option>
                                        <option value="1920">1920</option>
                                        <option value="1919">1919</option>
                                        <option value="1918">1918</option>
                                        <option value="1917">1917</option>
                                    </select>
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
    const { currentUser } = state;
    console.log(state)

    return {
        currentUser
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Profile);