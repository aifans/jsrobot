let logger = require('log4js').getLogger('CJsRobot.js');

let EnumCommand = require('./EnumCommand.js');

class CJsRobot {

    constructor() {
        logger.debug('CJsRobot constructing....');
    }

    move(enumCmd) {

        switch (enumCmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:

                logger.info('turn left...');
                break;

            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:

                logger.info('turn right...');
                break;

            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:

                logger.info('move forward...');
                break;

            case EnumCommand.E_MOVE_BACKWARD:
            case EnumCommand.S_MOVE_BACKWARD:

                logger.info('move backward...');
                break;

            default:
                logger.error('command not found:', enumCmd);
        }
    }


}

module.exports = CJsRobot;