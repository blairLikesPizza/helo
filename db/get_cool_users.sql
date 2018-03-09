SELECT * 
   FROM HeloUsers
   WHERE id IN (SELECT id 
         FROM HeloUsers 
         WHERE is_cool is true)