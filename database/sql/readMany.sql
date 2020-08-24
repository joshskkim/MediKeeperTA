/*
  Reads all items with matching name
*/
SELECT *
FROM iteminfo
WHERE itemName = $1