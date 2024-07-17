
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
        try {
            return await CategoryModel.create({
                name,
                status,
                ordering
            })
           } catch (error) {
            throw error
            message : 'them that bai'
                let err = error['errors']
                for(let key in err){
                    err[key] = err[key].message
                }
                error['status'] = 201
                error['message'] = err
                throw error
           }
           
        
    }
    
    findbyId = async(id) =>{
        try {
            return await CategoryModel.findById(id)
            .populate('item')
        } catch (error) {
        throw error
            message : 'khong tim thay id'
        }
      
        
    }

    delete = async (id) => {
        try {
            return await CategoryModel.findByIdAndDelete(id)
        } catch (error) {
            throw error
            message : 'xoa that bai'
        }
          
    }

    updateApi = async ({id}, {name, status, ordering}) =>{
        try {
            return await CategoryModel.findByIdAndUpdate(id, {name, status, ordering}, { runValidators : true})
        } catch (error) {
            throw error

        }
        
    }
    
    
}
module.exports = new CategoryService()