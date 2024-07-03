const ItemService = require('../services/items_service')
class ItemController {
    getAll = async (req, res, next) => {
        let items = await ItemService.getAll()
        
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
        await ItemService.delete(req.params.id)
        res.send({
            success: true
        })
    }

    changeStatus = async (req,res, next) =>{
        let newStatus = req.params.status == 'active' ? 'inactive' : 'active'
        await ItemService.changeStatus(req.params.id, newStatus)
        res.redirect('/admin/item')
    }
    changeOrdering = async(req,res,next) =>{
        let newOrdering = req.body.ordering
        await ItemService.changeOrdering(req.params.id, newOrdering)
        res.redirect('/admin/item')
    }
    search = async(req,res,next) =>{
        let keyword = ItemService.search(req.query, 'keyword')
        let name = req.body.name
        res.render('admin/pages/items')
    }

}


module.exports = new ItemController();