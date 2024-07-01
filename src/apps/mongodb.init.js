const mongoose = require('mongoose');
class Mongodb{
    connection = async() =>{
        try {
            await mongoose.connect('mongodb+srv://chihieu:12341234@atlascluster.lbj9zfe.mongodb.net/shopping');
            console.log('connect success')
        } catch (error) {
            console.log('connect erro');
        }
    }
}
module.exports = new Mongodb()