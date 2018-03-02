UPDATE HeloUsers
SET firstName = $1, lastName = $2, gender = $3, hairColor = $4, eyeColor = $5, hobby = $6, birthdayDay = $7, birthdayMonth = $8, birthdayYear = $9
WHERE auth_id = $10