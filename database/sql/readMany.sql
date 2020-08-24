/*
  Reads all items with matching name
*/
SELECT *
FROM iteminfo
WHERE iname = $1