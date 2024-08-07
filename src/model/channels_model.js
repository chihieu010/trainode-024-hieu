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
  runned : {
    type : Number,
    default : 0
  },
  currentSub: Number,
  performance : Number,
  maxThread : Number,
  maxThreadUsed: {
    type : Number,
    default : 0
  }
  
},
{
    timestamps : true,
    collection : ItemCollection
}
);


module.exports = mongoose.model(Itemdocument, channelSchema)