'use strict';

const ItemModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async (req, res, next) => {
  try {
    const data = req.body;
    const item = new ItemModel(data);
    await item.save();
    res.status(200).json(item);
  } catch (e) { next(e.message); }
}

// This method should return all items
// TODO: Eventually go back and check the model details
Data.getAllItems = async (req, res) => {
  const items = await ItemModel.find({});
  res.status(200).json(items);
}

Data.getOneItem = async (req, res) => {
  const id = req.params.id;
  const items = await ItemModel.find({ _id: id });
  res.status(200).json(items[0]);
}

// Delete the item based on the id passed in
Data.deleteOneItem = async (req, res) => {
  const id = req.params.id;
  // FIXME: Should really handle error if id not in proper format
  const items = await ItemModel.findOneAndDelete({ _id: id })
      .catch(res.send({"error": "Lookup failed"}));

  // FIXME: If the item to delete not found, should handle properly
  // res.status(200).json(items[0]);

  // if (items) {
  //   res.status(200).json(items[0]);
  // }
  // else {
  //   res.send(
  //     {
  //       "error": "Did not find a match!"
  //     }
  //   );
  // }

  items ? res.status(200).json(items[0]) : res.send({"error": "Did not find a match"});


}

module.exports = Data;
