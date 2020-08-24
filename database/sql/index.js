const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

// Helper for linking to external query files
const sql = (file) => {
  const fullPath = joinPath(__dirname, file);
  const options = {
    minify: true,
  };
  const qf = new QueryFile(fullPath, options);

  if (qf.error) console.error(qf.error);

  return qf;
};

module.exports = {
  add: sql('./add.sql'),
  readAll: sql('./readAll.sql'),
  readOne: sql('./readOne.sql'),
  readMany: sql('./readMany.sql'),
  patchCost: sql('./patchCost.sql'),
  patchName: sql('./patchName.sql'),
  delete: sql('./delete.sql'),
};
