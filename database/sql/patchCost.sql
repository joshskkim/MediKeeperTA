/*
  Updates a matching item entry with new cost
*/
UPDATE iteminfo
SET cost = $1
WHERE ID = $2
RETURNING *