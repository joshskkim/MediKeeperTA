/*
  Reads the max cost item 
*/
SELECT cost
FROM iteminfo
WHERE itemName = $1
ORDER BY cost DESC
LIMIT 1