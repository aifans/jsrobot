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
    FAILED                  :   new CResult(1, 'Failed.', {}),
}