var addRoomToBorders = {
    run: function(roomName) {
        for(i = 0; i < exits.length; i++){
            if(Game.rooms[name].controller !== undefined && Game.rooms[name].controller.my && Memory.borders.indexOf(roomName) === -1){
                Memory.borders.push(roomName)
            }
        }
    }
}

module.exports = {
    addRoomToBorders
}