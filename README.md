# A control program for a robot


## Description
JsRobot is a robot control program. The robot is located in a 2 dimensional room, and it can moves in the room by a string of commands in English or Swedish.

The command is:

| Language | Turn left | Turn right | Move forward |
| :------: | :-------: | :--------: | :----------: |
| English  |     L     |     R      |      F       |
| Swedish  |     V     |     H      |      G       |

When all commands are executed the program should report which coordinate (x,y) the robot is located and what direction the robot is facing. 

At start the robot is always facing **North**.

The room could have 2 shapes, **square** or **circular**.

## Example
Room is **square** of **5x5** and the start position for the robot at **(1,2)**, command string is **HGHGGHGHG**, report: **1 3 N**

## Architecture

## Installation and Running

### 1) installation
    a) install the nodejs

### 2) running
    a) cd the dir where the server.js is in, then run the command:
    
        nodejs server.js
