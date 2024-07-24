const { OK_SUCCESS } = require('../apps/core/success_response')
const YoutubeService = require('../services/youtube_service')

class YoutubeController {
    getAllApi = async(req, res, next) =>{
        let result = await YoutubeService.getAllApi(req.query)
        new OK_SUCCESS ({
            message : 'lay tat ca thanh cong',
            meataData : result
    }).send(res)    
    }
    deleteApi = async(req, res, next) => {
        let channel = await YoutubeService.findbyId(req.query.idChannel)
        if(!channel) throw new Error('not find with channel')
        await YoutubeService.delete(req.query.idChannel)
            new OK_SUCCESS ({
                message : 'xoa thanh cong',
                meataData : item
        }).send(res)
    }
}
module.exports = new YoutubeController();