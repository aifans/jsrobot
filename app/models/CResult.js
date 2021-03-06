class CResult {

    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    setCode(code) {
        this.code = code;
    }

    getCode() {
        return this.code;
    }

    setMsg(msg) {
        this.msg = msg;
    }

    getMsg() {
        return this.msg;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    toString() {
        return {'code':this.code, 'msg':this.msg, 'data':this.data};
    }

}

module.exports = {
    // common
    SUCCESS                 :   new CResult(0, 'Success.', {}),
    FAILURE                 :   new CResult(1, 'Failure.', {}),

    //
    POSITION_NOT_IN_ROOM    :   new CResult(101, 'point not in the room.', {}),
    UNKNOWN_COMMAND         :   new CResult(102, 'unknown command.', {}),
    ROBOT_CANT_MOVE         :   new CResult(103, 'robot can not move to the position.', {}),
}