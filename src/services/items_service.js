const category_model = require('../model/category_model');
const items_model = require('../model/items_model');
const ItemModel = require('../model/items_model')
const multer  = require('multer')

class ItemService {
    
    getAllApi = async({page = 1, limit = 10 , sort = 'createdAt' , sortBy = 'desc' , ...params}) => {

        const skip = (page - 1) * limit
        const sortObj = {}
        sortObj[sort] = sortBy


        const { select } = params

        const items = await ItemModel.find({})
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .select() //select.split(',')
            .lean()

        return items
    }
    
    add = async ({name, status, ordering , category_id}) => {
        let item =  await ItemModel.create({
            name,
            status,
            ordering,
            category_id
        })
        await category_model.findByIdAndUpdate(category_id, {
            $push:{
                item : item.id
            }
        })
        return item
           
        
    }
    
    findbyId = async(id) =>{
        return await ItemModel.findById(id)
      
        
    }

    delete = async (id) => {
        return await ItemModel.findByIdAndDelete(id)
          
    }

    updateApi = async ({id}, {name, status, ordering}) =>{
        return await ItemModel.findByIdAndUpdate(id, {name, status, ordering}, { runValidators : true})
        
    }

    uploadImage = async({id,image}) =>{
        return await ItemModel.findByIdAndUpdate(id, {avatar : image})
    }
    
    
    
}
module.exports = new ItemService()