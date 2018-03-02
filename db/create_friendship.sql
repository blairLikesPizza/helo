INSERT INTO friendship 
(userid, friendid)
VALUES
($1, $2)
RETURNING *;