const { getKey } = require("../db/keyApiV3");
const axios = require('axios')

const  getSubcribeCurrent = async (idChannel) => {
    const linkInfoChannel = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${idChannel}&key=${getKey()}`
    let response = await axios.get(linkInfoChannel);
    let infoChannel = response.data;
    let subscriberCount = infoChannel.items[0].statistics.subscriberCount;
    return subscriberCount
}
module.exports = {getSubcribeCurrent}
