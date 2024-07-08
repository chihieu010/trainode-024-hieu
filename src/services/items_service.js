const items_model = require('../model/items_model');
const ItemModel = require('../model/items_model')
const { name } = require('ejs');
class ItemService {
    getAll = async (obj , params) => {
        const { page = 1, limit = 10 } = params
        let items = await ItemModel.find(obj)
            .skip((page - 1) * limit)
            .limit(limit)
            // .sort({ createdAt: -1 })
            // .select()
            // .lean()
        return items;
    }
    add = async (params) => {
        try {
            const {name, status, ordering} = params
            await ItemModel.create({
            name,
            status,
            ordering
        })

        return;
        } catch (error) {
            let err = error['errors']
            for(let key in err){
                err[key] = err[key].message
            }
            throw err
        }
        
    }
    findByIdAndUpdate = async (id, body) =>{
        return await ItemModel.findByIdAndUpdate(id,body)
    }
    
    delete = async (id) => {
        await ItemModel.findByIdAndDelete(id)
        return
    }
    changeStatus = async (id, status) =>{    
        await ItemModel.findByIdAndUpdate(id,{status})
        return
    }
    changeOrdering = async ({ id , ordering }) => {
        await ItemModel.findByIdAndUpdate(id, {ordering})
        return
    }
    count = async (params) =>{
        return await ItemModel.countDocuments(params)
        return
    }
    findbyId = async(id) =>{
      return await ItemModel.findById(id)
        
    }
    
}
module.exports = new ItemService()