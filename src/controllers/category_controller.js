const CategoryService = require('../services/category_service')
const { NOTFOUND_ERROR } = require('../apps/core/error_response')
const { OK_SUCCESS } = require('../apps/core/success_response')
class ItemController {
    
    getAllApi = async(req, res, next) =>{
        let items = await CategoryService.getAllApi(req.query)
        new OK_SUCCESS ({
            message : 'lay tat ca thanh cong',
            meataData : items
    }).send(res)
    }

    getOneApi = async(req, res, next) =>{
        let item = await CategoryService.findbyId(req.params.id)
        new OK_SUCCESS ({
            message : 'lay thanh cong',
            meataData : item
    }).send(res)
    }

    addApi = async(req, res, next) => {
            let item = await CategoryService.add(req.body)
            new OK_SUCCESS ({
                message : 'them thanh cong',
                meataData : item
        }).send(res)
    }
    

    deleteApi = async(req, res, next) => {
        let item = await CategoryService.findbyId(req.params.id)
        if(!item) throw new Error('not find with id')
        await CategoryService.delete(req.params.id)
        new OK_SUCCESS ({
            message : 'xoa thanh cong',
            meataData : item
    }).send(res)
    }

    updateApi = async(req, res, next) => {
        let item = await CategoryService.findbyId(req.params.id)
        if(!item) throw new Error('not find with id')
        await CategoryService.updateApi(req.params, req.body)
        res.status(200).json({
            message : 'update thanh cong',
        })
    }

}

module.exports = new ItemController();