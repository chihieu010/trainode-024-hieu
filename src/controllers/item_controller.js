const items_service = require('../services/items_service');
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
    getForm = async (req, res, next) => {
        let {id} = req.params

        if(id){
            const item = await ItemService.findbyId(id)
            res.render('admin/pages/items/form',{
                title : 'Edit',
                item : item
            
            });
        }else{
            res.render('admin/pages/items/form',{
                title : 'Add-form',
                item : {}
            });
        }
        
    }
    add = async (req, res, next) =>{
        console.log(req.file)
        res.send({});
        // try {
        //     let {id} = req.body
        //     if(id){
        //         await ItemService.findByIdAndUpdate(id,req.body)
        //         req.flash('info', 'cap nhat thanh cong', false);
        //         res.redirect('/admin/item') 
        //     }else{
        //         await ItemService.add(req.body)
        //         req.flash('info', 'them moi thanh cong', false);
        //         res.redirect('/admin/item')
        // }    
        // } catch (error) {
        //     req.flash('info', 'err', false);
        //     res.redirect('/admin/item/form')
        // }
        
        

        
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

    getAllApi = async(req, res, next) =>{
        console.log(req.query);
        let items = await ItemService.getAllApi(req.query)
        res.status(200).json({
                message : 'lay thanh cong',
                data : item
            })
    }
    getOneApi = async(req, res, next) =>{
        console.log(req.params.id);
        let item = await ItemService.findbyId(req.params.id)
        res.status(200).json({
            message : 'lay thanh cong',
            data : item
        })

    }
    addApi = async(req, res, next) => {
        console.log(req.body);
        let item = await ItemService.add(req.body)
        res.status(200).json({
            message : 'them thanh cong',
            data : item
        })
    }

    deleteApi = async(req, res, next) => {
        console.log(req.params.id);
        let item = await ItemService.delete(req.params.id)
        res.status(200).json({
            message : 'delete thanh cong',
            data : item
        })
    }
    updateApi = async(req, res, next) => {
        await ItemService.updateApi(req.params.id, req.body)
    }

}

module.exports = new ItemController();