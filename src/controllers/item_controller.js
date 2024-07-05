const ItemService = require('../services/items_service')
class ItemController {
    getAll = async (req, res, next) => {
        const { keyword , status , page } = req.query;
        let obj = {}

        if (keyword) {
            obj.name = keyword
        }
        if (status && ( status == 'active' || status == 'inactive' )) {
            obj.status = status
        }

        let listStatus = [
            {
                name: 'All',
                count: await ItemService.count({}),
                link: '/admin/item?status=all',
                color : status == 'active' || status == 'inactive' ? 'info' : 'warning'
            },
            {
                name: 'Active',
                count: await ItemService.count({status : 'active'}),
                link: '/admin/item?status=active',
                color : status && status == 'active' ? 'warning' : 'info',
            },
            {
                name: 'Inactive',
                count: await ItemService.count({status : 'inactive'}),
                link: '/admin/item?status=inactive',
                color : status && status == 'inactive' ? 'warning' : 'info',
            },
           
        ]

        let items = await ItemService.getAll(obj , req.query)
        
        res.render('admin/pages/items', {items , listStatus});
        
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
        res.send({})
    }
    changeOrdering = async(req,res,next) =>{
        await ItemService.changeOrdering(req.params)
        res.send({})
    }

}


module.exports = new ItemController();