const items_service = require('../services/items_service');
const ItemService = require('../services/items_service')
class ItemController {
    
    getAllApi = async(req, res, next) =>{
        console.log(req.query);
        let items = await ItemService.getAllApi(req.query)
        res.status(200).json({
                message : 'lay thanh cong',
                data : items
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
        await ItemService.updateApi(req.params, req.body)
        res.status(200).json({
            message : 'update thanh cong',
        })
    }

}

module.exports = new ItemController();