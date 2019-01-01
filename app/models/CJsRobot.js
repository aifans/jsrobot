let logger = require('log4js').getLogger('CJsRobot.js');

let EnumCommand = require('./EnumCommand.js');

/**
 * robot class. it can only turn left or right, move forward.
 * when it acts it will print a log info.
 */
class CJsRobot {

    constructor() {
        logger.debug('I am a Happy Robot!');
    }

    /**
     *
     * robot can turn left or right, move forward.
     *
     * @param {string} enumCmd
     * @returns {boolean} if can execute
     */
    canExecute(enumCmd) {

        let canExecute = false;

        switch (enumCmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:
            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:
            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:
//            case EnumCommand.E_MOVE_BACKWARD:
//            case EnumCommand.S_MOVE_BACKWARD:

                canExecute = true;
                break;

            default:
                canExecute = false;
        }

        return canExecute;
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