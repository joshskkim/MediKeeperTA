/* eslint-disable spaced-comment*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const ItemController = require('../database/controllers/items.js');

const app = express();

///////////////////////////////
//        Middleware         //
///////////////////////////////
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////////////////////////
// Generic Handler Skeletons //
///////////////////////////////

// GET Handler
const GET = (url, handler) => {
  app.get(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err.message || err);
    }
  });
};

// POST Handler
const POST = (url, handler) => {
  app.post(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err.message || err);
    }
  });
};

// PATCH Handler
const PATCH = (url, handler) => {
  app.patch(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err.message || err);
    }
  });
};

// DELETE Handler
const DELETE = (url, handler) => {
  app.delete(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err.message || err);
    }
  });
};

///////////////////////////////
//    Items Web API Routes   //
///////////////////////////////

// GET all items
GET('/api/items', () => ItemController.getItems());

// GET a list of max prices of items grouped by item name
GET('/api/items/list/:iname', (req) => ItemController.getMaxPrices(req.params.iname));

// GET max price of an item
GET('/api/items/:iname', (req) => ItemController.getMaxPrice(req.params.iname));

// CREATES a new item and UPDATES on ID conflict
POST('/api/items', (req) => ItemController.addItem(req.body.id, req.body.iname, req.body.cost));

// UPDATES an item name
PATCH('/api/items/name', (req) => ItemController.patchItemName(req.body.id, req.body.iname));

// UPDATES an item cost
PATCH('/api/items/cost', (req) => ItemController.patchItemCost(req.body.id, req.body.cost));

// DELETES an item
DELETE('/api/items/:id', (req) => ItemController.removeItem(req.params.id));

module.exports = app;
