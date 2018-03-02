INSERT INTO HeloUsers 
(firstName, lastName, auth_id, userImg)
VALUES
($1, $2, $3, $4)
RETURNING *;