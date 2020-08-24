/*
  Reads the max cost item 
*/
SELECT *
FROM iteminfo
WHERE iname = $1
ORDER BY cost DESC
LIMIT 1