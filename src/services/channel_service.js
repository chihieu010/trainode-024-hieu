const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");
const axios = require("axios");
const channelModel = require("../model/channels_model");
const YoutubeService = require('../services/youtube_service');
const youtube_model = require("../model/youtube_model");

class ChannelService {
    order = async ({link, ordering, limit = 15, maxThread, idChannel, subscriberCount}) => {
          let count =  await YoutubeService.createWithLinkChannel({link,limit,idChannel})
          let channel = await channelModel.create({
            linkOder : link,
            uidChannel : idChannel,
            subOder : ordering,
            currentSub : subscriberCount,
            subStart : subscriberCount,
            maxThread : maxThread,
            countVideo :count
          });
         
          return channel;
        }
    findByIdChannel = async (idChannel) => {
        return await channelModel.findOne({idChannel});
    };

    delete = async (id) => {
        return await channelModel.findByIdAndDelete(id);
    };
    deleteChannel = async (idChannel) => {
      let listVideo = await youtube_model.find({idChannel})
      for (let i = 0; i < listVideo.length; i++) {
        await youtube_model.findOneAndDelete({idChannel})
      }
      await channelModel.findOneAndDelete(idChannel)
     
      return ;

      };
    updateCurrentSubcribe = async(idChannel , subscriberCount) =>{
      let channel = await channelModel.findOneAndUpdate({uidChannel : idChannel}, {currentSub : subscriberCount})
      if(channel.subStart + channel.subOder >= channel.currentSub){
        this.deleteChannel(idChannel)
      }
    }
    updateRunned = async(idChannel) =>{
      await channelModel.findOneAndUpdate({uidChannel : idChannel}, {$inc : {
        runned : 1
      }}) 
    }

}
module.exports = new ChannelService();
//`https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=50&videoDuration=long`;
