const items_model = require('../model/items_model');
const ItemModel = require('../model/items_model')
const IdItem = require('../../public/admin/myjs/myjs')
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
        const {_id} = req.params.id
        await ItemModel.findByIdAndDelete(id)
        return
    }
    update = async (id) => {
        const {_id} = req.params.id
        await ItemModel.findByIdAndUpdate(id)
        return
    }
}
module.exports = new ItemService()