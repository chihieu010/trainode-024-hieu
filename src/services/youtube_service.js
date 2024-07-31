const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");
const axios = require("axios");
const youtubeModel = require("../model/youtube_model");
const { parse } = require('iso8601-duration');
const { getKey } = require("../apps/db/keyApiV3");
const { getSubcribeCurrent } = require("../apps/utils/current_get_subcribe");
// const ChannelService = require("./channel_service");

class YoutubeService {
  find = async (params) => {
    return await youtubeModel.find(params);
  };
  findByIdChannel = async (idChannel) => {
    return await youtubeModel.findOne({ idChannel, status: 0 });
  };
  deleteVideoByIdchannel = async (idChannel) => {
    return await youtubeModel.deleteMany()
  };
  findByIdVideo = async (idVideo) => {
    return await youtubeModel.findOne({ idVideo });
  };
  updateStatusWithId = async (id, status) => {
    return await youtubeModel.findByIdAndUpdate(id, { status });
  };
  updateStatusWithIdVideo = async (idVideo, status) => {
    await youtubeModel.findOneAndUpdate({idVideo}, {status})
    return;

  };
  createWithLinkChannel = async ({ link, limit = 15, idChannel }) => {
    let count = 0
    let linkGet = `https://www.googleapis.com/youtube/v3/search?key=${getKey()}&channelId=${idChannel}&part=snippet&type=video&maxResults=${limit}`;
    let response = await axios.get(linkGet);
    let linkVideo = response.data.items;
    for (let i = 0; i < linkVideo.length; i++) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${linkVideo[i]["id"]["videoId"]}&part=contentDetails&key=${getKey()}`);
      const data = await response.json();
      const durationString = data.items[0].contentDetails.duration;
      let outputTime = parse(durationString)
      if (outputTime.minutes >= 2) {
        if (count >= 10) return
        count++
        await youtubeModel.create({
          idVideo: linkVideo[i]["id"]["videoId"],
          title: linkVideo[i]["snippet"]["title"],
          idChannel: linkVideo[i]["snippet"]["channelId"],
          listAccountUsed: [],
          status: 0,
        });
      }
    }
    // fetch(linkGet).then(rs => console.log(rs))

    return count;
  };
  delete = async (id) => {
    return await youtubeModel.findByIdAndDelete(id);
  };
  deleteListVideo = async (listVideo) => {
    for (let i = 0; i < listVideo.length; i++) {
      await this.delete(listVideo[i]._id);
    }
    return "success";
  };
}
module.exports = new YoutubeService();
//`https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=50&videoDuration=long`;
