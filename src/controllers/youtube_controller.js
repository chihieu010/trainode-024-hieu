const { OK_SUCCESS } = require('../apps/core/success_response')
const YoutubeService = require('../services/youtube_service')

class YoutubeController {
    createWithLinkChannel = async(req, res, next) =>{
        let result = await YoutubeService.createWithLinkChannel(req.query)
        new OK_SUCCESS ({
            message : 'lay tat ca thanh cong',
            meataData : result
    }).send(res)    
    }
    deleteApi = async(req, res, next) => {
        const { idChannel } = req.query;
        if (!idChannel) throw new Error("not delete with idChannel");
    
        let itemsWithIdChannel = await YoutubeService.find({ idChannel });
    
        await YoutubeService.deleteListVideo(itemsWithIdChannel);
        new OK_SUCCESS({
          message: "xoa thanh cong",
        }).send(res);
    }
    getOneVideoWithChannelId = async(req, res, next) => {
        const { idChannel } = req.params;

        if (!idChannel) throw new Error("not find with idChannel");
        let itemWithIdChannel = await YoutubeService.findByIdChannel(idChannel)
        if(!itemWithIdChannel) throw new Error("not find item") 
        await YoutubeService.updateStatusWithId(itemWithIdChannel._id,1)
        new OK_SUCCESS({
            message: "lay thanh cong",
            meataData : itemWithIdChannel
          }).send(res);
    }
    finish = async(req, res, next) =>{
        const{idVideo} = req.params;
        if (!idVideo) throw new Error("not find with idChannel");
        const video = await YoutubeService.updateStatusWithIdVideo(idVideo,0)
        new OK_SUCCESS({
            message: "update thanh cong",
            meataData : {}
          }).send(res);
    }

}
module.exports = new YoutubeController();