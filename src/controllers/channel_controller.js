const axios = require("axios");
const { OK_SUCCESS } = require('../apps/core/success_response');
const { getKey } = require('../apps/db/keyApiV3');
const ChannelService = require('../services/channel_service')
const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");


class ChannelController {
    order = async (req, res, next) => {
        let {link, ordering, limit, maxThread} = req.query;

        let idChannel = await channelId(link);
        
        const linkInfoChannel = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${idChannel}&key=${getKey()}`
        let response = await axios.get(linkInfoChannel);
        let infoChannel = response.data;
        let subscriberCount = infoChannel.items[0].statistics.subscriberCount;
        let channel = await ChannelService.order(link, ordering, limit, maxThread, idChannel, subscriberCount);
        new OK_SUCCESS({
            message: 'them thanh cong',
            meataData: {link, ordering, limit, maxThread,subscriberCount}
        }).send(res)
    }
  
    deleteChannel = async (req, res, next) => {
        const { idChannel } = req.query;
        console.log(idChannel);
        if (!idChannel) throw new Error("not find with idChannel");
        let itemWithIdChannel = await ChannelService.findByIdChannel(idChannel)
        let item = await ChannelService.deleteChannel(itemWithIdChannel);
        new OK_SUCCESS({
          message: "xoa thanh cong",
          meataData : item
        }).send(res);
    }
}

module.exports = new ChannelController();