const { OK_SUCCESS } = require('../apps/core/success_response')
const ChannelService = require('../services/channel_service')
const YoutubeService = require('../services/youtube_service')
const {getSubcribeCurrent} = require('../apps/utils/current_get_subcribe')
const history_model = require('../model/history_model')

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
        const {username} = req.query;

        //get thread current
        let channel = await ChannelService.findByIdChannel(idChannel)
        if(channel.maxThreadUsed >= channel.maxThread) throw new Error("full thread");
        if(channel.listAccountUsed.find(e => e == username)) throw new Error('username da ton tai')

        if (!idChannel) throw new Error("not find with idChannel");
        let itemWithIdChannel = await YoutubeService.findByIdChannel(idChannel)
        if(!itemWithIdChannel) throw new Error("not find item") 
        Promise.all([
            await YoutubeService.updateStatusWithId(itemWithIdChannel._id,1),
            await ChannelService.updateMaxthread(idChannel,1),
            await ChannelService.updateUsername(idChannel,username),
        ])
           
        new OK_SUCCESS({
            message: "lay thanh cong",
            meataData : itemWithIdChannel
          }).send(res);
    }
    finish = async(req, res, next) =>{
        const{idVideo} = req.params;
        let video = await YoutubeService.findByIdVideo(idVideo)
        if (!video) throw new Error("not find with Video");
        Promise.all([
            await YoutubeService.updateStatusWithIdVideo(idVideo,0),
            await ChannelService.updateMaxthread(video.idChannel,-1),
            await ChannelService.updateRunned(video.idChannel,1)
        ])
        // check done channel
        const subscriberCount = await getSubcribeCurrent(video.idChannel)
        await ChannelService.updateCurrentSubcribe(video.idChannel, 1392)
        // check currentSub
        let channel = await ChannelService.findByIdChannel(video.idChannel)
        if(channel.subStart + channel.subOder >= channel.currentSub){
            let listVideo = await YoutubeService.find({idChannel : video.idChannel})
            for (let i = 0; i < listVideo.length; i++) {
              await listVideo[i].deleteOne()
            }
            await history_model.create({
                linkOder : channel.linkOder,
                uidChannel : channel.uidChannel,
                subStart : channel.subStart,
                subOder : channel.subOder,
                currentSub: channel.currentSub
            })
            await channel.deleteOne()
            // done
        }

        new OK_SUCCESS({
            message: "update thanh cong",
            meataData : {}
          }).send(res);
    }

}
module.exports = new YoutubeController();