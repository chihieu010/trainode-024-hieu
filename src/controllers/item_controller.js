const items_service = require('../services/items_service');
const ItemService = require('../services/items_service')
const { NOTFOUND_ERROR } = require('../apps/core/error_response')
const { OK_SUCCESS } = require('../apps/core/success_response')
const fs = require('node:fs/promises')


class ItemController {
    
    getAllApi = async(req, res, next) =>{
        let items = await ItemService.getAllApi(req.query)
        new OK_SUCCESS ({
            message : 'lay tat ca thanh cong',
            meataData : items
    }).send(res)
    }

    getOneApi = async(req, res, next) =>{
        let item = await ItemService.findbyId(req.params.id)
        if(!item) throw new NOTFOUND_ERROR()
        new OK_SUCCESS ({
            message : 'lay thanh cong',
            meataData : item
    }).send(res)
    }

    addApi = async(req, res, next) => {
            let item = await ItemService.add(req.body)
            new OK_SUCCESS ({
                message : 'them thanh cong',
                meataData : item
        }).send(res)
    }

    deleteApi = async(req, res, next) => {
        let item = await ItemService.findbyId(req.params.id)
        if(!item) throw new Error('not find with id')
        await ItemService.delete(req.params.id)
            new OK_SUCCESS ({
                message : 'xoa thanh cong',
                meataData : item
        }).send(res)
    }

    updateApi = async(req, res, next) => {
        let item = await ItemService.findbyId(req.params.id)
        if(!item) throw new Error('not find with id')
        await ItemService.updateApi(req.params, req.body)
        new OK_SUCCESS ({
            message : 'cap nhat thanh cong',
            meataData : item
    }).send(res)
    }

    uploadImage = async(req, res, next) => {
        let item = await ItemService.findbyId(req.params.id)
        if(!item) throw new Error('not find with id')
        const image = req.file
        console.log(req.file);

        await ItemService.uploadImage(req.params, req.file)
        new OK_SUCCESS ({
            message : 'upload anh thanh cong',
            meataData : image
    }).send(res)
    }   

}
module.exports = new ItemController();