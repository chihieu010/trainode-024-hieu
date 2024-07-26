const { channelId, videoId } = require("@gonetone/get-youtube-id-by-url");
const axios = require("axios");
const youtubeModel = require("../model/youtube_model");

class YoutubeService {
  find = async (params) => {
    return await youtubeModel.find(params);
  };
  findByIdChannel = async (idChannel) => {
    return await youtubeModel.findOne({idChannel,status : 0});
  };
  updateStatusWithId = async (id,status) => {
    return await youtubeModel.findByIdAndUpdate(id, {status});
  };
  updateStatusWithIdVideo = async (idVideo,status) => {
    return await youtubeModel.updateOne({idVideo,status});
  };
  createWithLinkChannel = async ({ link, limit = 15}) => {
    console.log(link);
    let id = await channelId(link);
    let keyApiv3 = "AIzaSyCtfgR89sw8dieX-ru9DVWNZnR-4BE0OVw";
    let linkGet = `https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=${limit}&videoDuration=long`;
    let response = await axios.get(linkGet);
    let linkVideo = response.data.items;
    for (let i = 0; i < linkVideo.length; i++) {
      await youtubeModel.create({
        idVideo: linkVideo[i]["id"]["videoId"],
        title: linkVideo[i]["snippet"]["title"],
        idChannel: linkVideo[i]["snippet"]["channelId"],
        listAccountUsed: [],
        status: 0,
      });
    }
    // fetch(linkGet).then(rs => console.log(rs))

    return response.data;
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
