/*
  Updates matching item entry with new name
*/
UPDATE iteminfo
SET iname = $1
WHERE ID = $2
RETURNING *