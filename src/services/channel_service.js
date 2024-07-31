const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");
const channelModel = require("../model/channels_model");
const youtube_model = require("../model/youtube_model");

class ChannelService {
    order = async ({link, ordering, limit = 15, maxThread, idChannel, subscriberCount}) => {
          
          let channel = await channelModel.create({
            linkOder : link,
            uidChannel : idChannel,
            subOder : ordering,
            currentSub : subscriberCount,
            subStart : subscriberCount,
            maxThread : maxThread
      
          });
         
          return null;
        }
    findByIdChannel = async (idChannel) => {
        return await channelModel.findOne({uidChannel : idChannel});
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
      return await channelModel.findOneAndUpdate({uidChannel : idChannel}, {currentSub : subscriberCount})
    }
    updateRunned = async(idChannel) =>{
      await channelModel.findOneAndUpdate({uidChannel : idChannel}, {$inc : {
        runned : 1
      }}) 
    }
    updateMaxthread = async(idChannel,used) =>{
      await channelModel.findOneAndUpdate({uidChannel : idChannel}, {
        $inc : {
          maxThreadUsed : used
      }}) 
    }
    updateUsername = async(idChannel,username) =>{
      await channelModel.findOneAndUpdate({uidChannel : idChannel}, {
        $push : {
          listAccountUsed : username
        }
      }) 
    }
   


}
module.exports = new ChannelService();
//`https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=50&videoDuration=long`;
