/*
  Creates a new Item
*/
INSERT INTO iteminfo
VALUES ($1, $2, $3)
ON CONFLICT (id)
DO UPDATE SET itemName=EXCLUDED.itemName, cost=EXCLUDED.cost
RETURNING *