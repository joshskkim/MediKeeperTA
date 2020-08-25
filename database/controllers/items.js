const db = require('../config.js');
const sql = require('../sql');

const ItemsController = {
  // Gets all items from DB
  async getItems() {
    return db.any(sql.readAll);
  },

  // Gets a list of all max prices of an item
  async getMaxPrices(name) {
    return db.any(sql.readMany, name);
  },

  // Gets the max price of an item
  async getMaxPrice(name) {
    return db.one(sql.readOne, name);
  },

  // Creates a new item and returns new item
  async addItem(name, cost) {
    return db.one(sql.add, [name, cost]);
  },

  // Patches item name and returns updated item
  async patchItemName(id, name) {
    return db.one(sql.patchName, [name, id]);
  },

  // Patches an item cost and returns updated item
  async patchItemCost(id, cost) {
    return db.one(sql.patchCost, [cost, id]);
  },

  // Deletes an item and returns deleted item
  async removeItem(id) {
    return db.one(sql.delete, id);
  },
};

module.exports = ItemsController;
