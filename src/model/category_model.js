const mongoose = require('mongoose')
const { Schema } = mongoose;
const slugify = require('slugify');


const Itemdocument = 'category'
const ItemCollection = 'categories'

const itemsSchema = new Schema({
  name : {
    type : String,
    minLength : [5, '{VALUE} nho hon 5 ki tu']

  },
  item : [{
    type : Schema.Types.ObjectId,
    ref : 'item'
  }

  ],
  slug : String,
  status : {
    type : String,
    enum : {
      values: ['active', 'inactive'],
      message: '{VALUE} is active or inactive'
    }
  },
  ordering : {
    type : Number,
    min : [1, 'so qua nho'],
    max : [100, 'so qua lon']
  },
  image : {
 
  }
},
{
    timestamps : true,
    collection : ItemCollection
}
);

itemsSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model(Itemdocument, itemsSchema)