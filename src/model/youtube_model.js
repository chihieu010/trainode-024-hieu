const mongoose = require('mongoose')
const { Schema } = mongoose;
const slugify = require('slugify');


const Itemdocument = 'youtube'
const ItemCollection = 'youtubes'

const youtubeSchema = new Schema({
  idVideo : String,
  title : String,
  idChannel : [{
    type : Schema.Types.ObjectId,
    ref : 'youtube'
  }],
  status : Number
},
{
    timestamps : true,
    collection : ItemCollection
}
);


module.exports = mongoose.model(Itemdocument, youtubeSchema)