const mongoose = require('mongoose')
const { Schema } = mongoose;
const slugify = require('slugify');


const Itemdocument = 'history'
const ItemCollection = 'histories'

const channelSchema = new Schema({
  linkOder : String,
  uidChannel : String,
  subStart : Number,
  subOder : Number,
  currentSub: Number
},
{
    timestamps : true,
    collection : ItemCollection
}
);


module.exports = mongoose.model(Itemdocument, channelSchema)