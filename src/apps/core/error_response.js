const MessageCode = require('./message_core')
const StatusCode = require('./status_core')

class ErrorResponse extends Error {
    constructor(message , status) {
        super(message)
        this.status = status
    }
}

class NOTFOUND_ERROR extends ErrorResponse {
    constructor(message = MessageCode.NOT_FOUND, status = StatusCode.NOT_FOUND) {
        super(message , status)
    }
}
class Conflict_ERROR extends ErrorResponse {
    constructor(message = MessageCode.CONFLICT, status = StatusCode.CONFLICT) {
        super(message , status)
    }
}




module.exports = {
    NOTFOUND_ERROR,
    Conflict_ERROR
}

