CREATE TABLE IF NOT EXISTS OtherUsers (
    id serial primary key,
    firstName varchar(25),
    lastName varchar(25),
    gender varchar(30),
    hairColor varchar(25),
    eyeColor varchar(25),
    hobby varchar(25),
    birthdayDay varchar(2),
    birthdayMonth varchar(9),
    birthdayYear varchar(4),
    userImg text
)