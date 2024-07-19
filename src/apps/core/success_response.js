const MessageCode = require('./message_core')
const StatusCode = require('./status_core')

class SucessReponse {
    constructor({
        message , 
        statusCode,
        statusMessage,
        messUpdata,
        meataData,
    }) {
        this.message = message
        this.messUpdata = messUpdata
        this.statusCode = statusCode
        this.statusMessage = statusMessage
        this.meataData = meataData
    };


    send (res) {
        return res.status(this.statusCode).json(this)
    }
}

class OK_SUCCESS extends SucessReponse {
    constructor({
        message = message.OK, 
        statusCode = StatusCode.OK,
        statusMessage = MessageCode.OK,
        meataData,
    }) {
        super({
            message, 
            statusCode,
            statusMessage,
            meataData,
        })
    }
}


module.exports = {
    OK_SUCCESS
}


