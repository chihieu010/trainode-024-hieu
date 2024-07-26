const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");
const axios = require("axios");
const channelModel = require("../model/channels_model");

class ChannelService {
    order = async (link, ordering, limit, maxThread, idChannel, subscriberCount) => {
        
          await channelModel.create({
            linkOder : link,
            uidChannel : idChannel,
            subOder : ordering,
            subStart : subscriberCount,
            maxThread : maxThread
          });
          return;
        }
    findByIdChannel = async (idChannel) => {
        return await channelModel.findOne({idChannel});
    };
    delete = async (id) => {
        return await channelModel.findByIdAndDelete(id);
    };
    deleteChannel = async (idChannel) => {
      return await channelModel.findOneAndDelete(idChannel)

      };    
    }
module.exports = new ChannelService();
//`https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=50&videoDuration=long`;
