const EnumCommand = {
    E_TURN_LEFT:        'L',
    E_TURN_RIGHT:       'R',
    E_MOVE_FORWARD:     'F',
    E_MOVE_BACKWARD:    'B',
    S_TURN_LEFT:        'V',
    S_TURN_RIGHT:       'H',
    S_MOVE_FORWARD:     'G',
    S_MOVE_BACKWARD:    'B',
    CommandType: {
        'L': 'Turn',
        'R': 'Turn',
        'V': 'Turn',
        'H': 'Turn',
        'F': 'Move',
        'G': 'Move',
        'B': 'Move',
    },

};

module.exports = EnumCommand;
