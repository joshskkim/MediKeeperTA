/*
  Deletes entry from iteminfo
*/
DELETE FROM iteminfo
WHERE id = $1
RETURNING *