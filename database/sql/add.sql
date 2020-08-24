/*
  Creates a new Item
*/
INSERT INTO iteminfo
VALUES ($1, $2, $3)
ON CONFLICT (id)
DO UPDATE SET iname=EXCLUDED.iname, cost=EXCLUDED.cost
RETURNING *