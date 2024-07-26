const mongoose = require('mongoose')
const { Schema } = mongoose;
const slugify = require('slugify');


const Itemdocument = 'channel'
const ItemCollection = 'channels'

const channelSchema = new Schema({
  linkOder : String,
  uidChannel : String,
  listAccountUsed : [String],
  subStart : Number,
  subOder : Number,
  runned : Number,
  currentSub: Number,
  performance : Number,
  maxThread : Number
},
{
    timestamps : true,
    collection : ItemCollection
}
);


module.exports = mongoose.model(Itemdocument, channelSchema)