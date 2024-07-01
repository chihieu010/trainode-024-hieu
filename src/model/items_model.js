const mongoose = require('mongoose')
const { Schema } = mongoose;

const Itemdocument = 'item'
const ItemCollection = 'items'

const itemsSchema = new Schema({
  name : {
    type : String,
  },
  status : {
    type : String,
    enum : ['active', 'inactive'],
    default : 'inactive'
  },
  ordering : Number,
},
{
    timestamps : true,
    collection : ItemCollection
}
);
module.exports = mongoose.model(Itemdocument, itemsSchema)