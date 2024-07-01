const ItemService = require('../services/items_service')
class ItemController {
    getAll = async (req, res, next) => {
        let items = await ItemService.getAll()
        console.log(items);
        
        res.render('admin/pages/items', {items});
        
    }
    getForm = (req, res, next) => {
        res.render('admin/pages/items/form');
    }
    add = async (req, res, next) =>{
        await ItemService.add(req.body)
        res.redirect('/admin/item')
        // res.render('admin/item/form')
    }
    delete = async (req, res, next) =>{
        await ItemService.delete(id)
        res.redirect('/admin/item')
    }
    update = async(req, res, next) =>{
        await ItemService.update(id)
        res.redirect('/admin/item')
    }

}


module.exports = new ItemController();