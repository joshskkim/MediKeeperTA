/*
  Reads all items with matching name
*/
SELECT cost
FROM iteminfo
WHERE itemName = $1