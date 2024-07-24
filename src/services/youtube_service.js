const { channelId, videoId } = require('@gonetone/get-youtube-id-by-url');
const axios = require('axios');
const youtubeModel = require('../model/youtube_model')

class YoutubeService {
    getAllApi = async({link}) => {
        console.log(link);
        let id = await channelId(link)
        let keyApiv3 = 'AIzaSyCtfgR89sw8dieX-ru9DVWNZnR-4BE0OVw'
        // let linkGet = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${id}&maxResults=50&key=${keyApiv3}`
        let linkGet = `https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=20&videoDuration=long`
        let response = await axios.get(linkGet)
        let linkVideo = response.data.items
        // for (let i = 0; i < linkVideo.length; i++) {
        //     await youtubeModel.create({
        //         idVideo : linkVideo[i]['id']['videoId'],
        //         title : linkVideo[i]['snippet']['title'],
        //         idChannel : linkVideo[i]['snippet']['channelId'],
        //         listAccountUsed : [],
        //         status : 0
        //     })
            
        // }
        // fetch(linkGet).then(rs => console.log(rs))
        
        return response.data;
    }
    delete = async (idChannel) => {
        return await youtubeModel.findByIdAndDelete(idChannel)
          
    }
}
module.exports = new YoutubeService();
//`https://www.googleapis.com/youtube/v3/search?key=${keyApiv3}&channelId=${id}&part=snippet&type=video&maxResults=50&videoDuration=long`;