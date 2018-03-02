require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    console.log('massive database connected using connection string')
    app.set('db', db)
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')
    db.find_user([profile.identities[0].user_id]).then(user => {
        if (user[0]) {
            console.log('logged in', user[0])
            return done(null, user[0].id)
        } else {
            const user = profile._json;
            const tempString = user.name.split(' ');
            const firstName = tempString[0];
            const lastName = tempString[1];
            db.create_user([firstName, lastName, user.identities[0].user_id, `https://robohash.org/${firstName}%20${lastName}?set=set4`])
                .then(user => {
                    console.log('new user', user);
                    return done(null, user[0].id)
                })
        }
    })
}))

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: '/auth'
}))

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(200).send('User not found.')
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/')
})

passport.serializeUser((id, done) => {

    done(null, id);
})

passport.deserializeUser((id, done) => {
    app.get('db').find_current_user([id])
        .then(user => {
            done(null, user[0])
        })
})

// app.put('/api/users/:firstName/:lastName/:gender/:hairColor/:eyeColor/:hobby/:birthdayDay/:birthdayMonth/:birthdayYear/:auth_id', (req, res, next) => {
//     const db = req.app.get('db');
//     const { firstName, lastName, gender, hairColor, eyeColor, hobby, birthdayDay, birthdayMonth, birthdayYear, auth_id } = req.params;
//     db.update_user([firstName, lastName, gender, hairColor, eyeColor, hobby, birthdayDay, birthdayMonth, birthdayYear, auth_id])
//         .then(user => {
//             res.status(200).send(user)
//         })
// })

app.put('/api/users/:auth_id', (req, res, next) => {
    const db = req.app.get('db');
    console.log('I am the body', req.body)
    // const { firstName, lastName, gender, hairColor, eyeColor, hobby, birthdayDay, birthdayMonth, birthdayYear, auth_id } = req.params;
    if (req.body.firstName){
        db.update_user_firstname([req.body.firstName, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.lastName){
        db.update_user_lastname([req.body.lastName, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.gender){
        db.update_user_gender([req.body.gender, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.hairColor){
        db.update_user_haircolor([req.body.hairColor, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.eyeColor){
        db.update_user_eyecolor([req.body.eyeColor, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.hobby){
        db.update_user_hobby([req.body.hobby, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.birthdayDay){
        db.update_user_birthdayday([req.body.birthdayDay, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.birthdayMonth){
        db.update_user_birthdaymonth([req.body.birthdayMonth, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    } if (req.body.birthdayYear){
        db.update_user_birthdayyear([req.body.birthdayYear, req.body.auth_id])
            .then(user => {
                res.status(200).send(user)
            })
    }
})

// app.get('/api/user', (req, res, next) => {
//     const db = req.app.get('db');
//     const { id } = req.body;
//     console.log(req.body)
//     db.find_current_user([id])
//         .then(user => {

//             console.log('gotten user', user)
//             res.status(200).send(user)
//         })
// })

app.get('/api/currentuser', (req, res, next) => {
    const db = req.app.get('db')
    const user = req.user;
    console.log('this is the req.user', user.id)
    db.find_current_user([user.id])
        .then(user => {
            console.log('this is the user!!!!,', user[0])
            res.status(200).send(user[0])
        })
})

app.get('/api/otherusers', (req, res, next) => {
    const db = req.app.get('db');
    db.get_otherusers()
        .then(otherusers => {
            // console.log(otherusers)
            res.status(200).send(otherusers)
        })
})

app.get('/api/filteredfriendsFN/:firstName', (req, res, next) => {
    const db = app.get('db')
    const firstName = req.params.firstName
    console.log('first name', firstName)
    db.filter_friends_firstname([firstName])
        .then(friends => {
            console.log('these are your filtered friends', friends)
            res.status(200).send(friends)
        })
        .catch(() => res.status(500).send("SERVER ERROR"));
});

app.get('/api/filteredfriendsLN/:lastName', (req, res, next) => {
    const db = app.get('db')
    const lastName = req.params.lastName
    console.log('first name', lastName)
    db.filter_friends_lastname([lastName])
        .then(friends => {
            console.log('these are your filtered friends', friends)
            res.status(200).send(friends)
        })
        .catch(() => res.status(500).send("SERVER ERROR"));
});

app.post('/api/addfriend/:userid/:friendid', (req, res, next) => {
    const db = app.get('db')
    const { userid, friendid } = req.params
    console.log('user id', userid)
    console.log('friendid', friendid)
    db.create_friendship([userid, friendid])
         .then(friendship => {
             res.status(200).send(friendship)
         })
            .catch(() => res.status(500).send("SERVER ERROR"));
})

const port = 3002
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})