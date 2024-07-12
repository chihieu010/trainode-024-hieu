const items_model = require('../model/items_model');
const ItemModel = require('../model/items_model')
const { name } = require('ejs');
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
    
    add = async ({name, status, ordering}) => {
        try {
            return await ItemModel.create({
                name,
                status,
                ordering
            })
           } catch (error) {
            throw error
            message : 'them that bai'
                // let err = error['errors']
                // for(let key in err){
                //     err[key] = err[key].message
                // }
                // error['status'] = 201
                // error['message'] = err
                // throw error
           }
           
        
    }
    
    findbyId = async(id) =>{
        try {
            return await ItemModel.findById(id)
        } catch (error) {
        throw error
            message : 'khong tim thay id'
        }
      
        
    }

    delete = async (id) => {
        try {
            return await ItemModel.findByIdAndDelete(id)
        } catch (error) {
            throw error
            message : 'xoa that bai'
        }
          
    }

    updateApi = async ({id}, {name, status, ordering}) =>{
        try {
            return await ItemModel.findByIdAndUpdate(id, {name, status, ordering}, { runValidators : true})
        } catch (error) {
            throw error

        }
        
    }
    
    
}
module.exports = new ItemService()