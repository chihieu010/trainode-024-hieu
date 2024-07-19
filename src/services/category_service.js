
const CategoryModel = require('../model/category_model')
class CategoryService {
    
    getAllApi = async({page = 1, limit = 10 , sort = 'createdAt' , sortBy = 'desc' , ...params}) => {

        const skip = (page - 1) * limit
        const sortObj = {}
        sortObj[sort] = sortBy


        const { select } = params

        const items = await CategoryModel.find({})
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .select() //select.split(',')
            .lean()

        return items
    }
    
    add = async ({name, status, ordering}) => {
        let item =  await ItemModel.create({
            name,
            status,
            ordering,
            item_id
        })
        return item
    }
    
    findbyId = async(id) =>{
        return await CategoryModel.findById(id)
            .populate('item')
      
        
    }

    delete = async (id) => {
        return await CategoryModel.findByIdAndDelete(id)
          
    }

    updateApi = async ({id}, {name, status, ordering}) =>{
        return await CategoryModel.findByIdAndUpdate(id, {name, status, ordering}, { runValidators : true})
        
    }
    
    
}
module.exports = new CategoryService()