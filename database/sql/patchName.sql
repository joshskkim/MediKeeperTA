/*
  Updates matching item entry with new name
*/
UPDATE iteminfo
SET itemName = $1
WHERE ID = $2
RETURNING *