const items_model = require('../model/items_model');
const ItemModel = require('../model/items_model')
const IdItem = require('../../public/admin/myjs/myjs');
const { name } = require('ejs');
class ItemService {
    getAll = async () => {
        let items = await ItemModel.find();
        return items;
    }
    add = async (params) => {
        const {name, status, ordering} = params
        await ItemModel.create({
            name,
            status,
            ordering
        })

        return;
    }
    delete = async (id) => {
        await ItemModel.findByIdAndDelete(id)
        return
    }
    changeStatus = async (id, status) =>{    
        await ItemModel.findByIdAndUpdate(id,{status})
        return
    }
    changeOrdering = async (id, ordering) =>{
        await ItemModel.findByIdAndUpdate(id, {ordering})
        return
    }
    search = async (keyword) =>{
        await ItemModel.find(name == keyword)
        console.log(keyword);
        return
    }
    
}
module.exports = new ItemService()