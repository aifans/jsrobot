let logger = require('log4js').getLogger('CJsRobot.js');

let EnumCommand = require('./EnumCommand.js');

class CJsRobot {

    constructor() {
        logger.debug('I am a Happy Robot!');
    }

    canExcute(enumCmd) {

        let canExcute = false;

        switch (enumCmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:
            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:
            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:
//            case EnumCommand.E_MOVE_BACKWARD:
//            case EnumCommand.S_MOVE_BACKWARD:

                canExcute = true;
                break;

            default:
                canExcute = false;
        }

        return canExcute;
    }

    move(enumCmd) {

        switch (enumCmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:

                logger.info('I\'m so glad to turn left...');
                break;

            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:

                logger.info('I\'m going to turn right...');
                break;

            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:

                logger.info('Move move move! Fire in the hole...');
                break;

//            case EnumCommand.E_MOVE_BACKWARD:
//            case EnumCommand.S_MOVE_BACKWARD:
//
//                logger.info('move backward...');
//                break;

            default:
                logger.error('Excuse me? But you said:', enumCmd);
        }
    }


}

module.exports = CJsRobot;