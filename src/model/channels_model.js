const mongoose = require('mongoose')
const { Schema } = mongoose;
const slugify = require('slugify');


const Itemdocument = 'channel'
const ItemCollection = 'channels'

const channelSchema = new Schema({
  linkOder : String,
  uidChannel : String,
  idVideo: [{
    type : Schema.Types.ObjectId,
    ref : 'youtube'
  }],
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


module.exports = mongoose.model(Itemdocument, accountSchema)