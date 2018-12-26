let logger = require('log4js').getLogger('CJsRoomFactory.js');

//let CJsRoom = require('./CJsRoom.js');
let CJsRoomSquare = require('./CJsRoomSquare.js');
let CJsRoomCircle = require('./CJsRoomCircle.js');
let EnumRoomType = require('./EnumRoomType.js');

class CJsRoom {

    static initRoom(enumRoomType) {

        let jsRoom = null;

        switch (enumRoomType) {

            case EnumRoomType.SQUARE:

                jsRoom = new CJsRoomSquare();
                logger.debug('new CJsRoomSquare().');

                break;

            case EnumRoomType.CIRCLE:

                jsRoom = new CJsRoomCircle();
                logger.debug('new CJsRoomCircle().');

                break;

            default:

                jsRoom = new CJsRoomSquare();
                logger.error('unknown room type, default room is square.', enumRoomType);
        }

        return jsRoom;

    }


}

module.exports = CJsRoom;
