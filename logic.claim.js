var logicClaim = {
    run: function(creep, maxDistanceFromHome){
        if(creep.memory.plymouthRock == null){
        var allRooms = Memory.potentialColonies
        var candidateRooms = []
        for(i = 0; i < allRooms.length; i++){
            var room = allRooms[i]
            if(Game.map.getRoomLinearDistance(creep.room.name, room) <= maxDistanceFromHome){
                candidateRooms.push({room: room, distance: Game.map.getRoomLinearDistance(creep.room.name, room)})
            }
        } 
        candidateRooms.sort(function(a,b){return a.distance - b.distance})
        for(i = 0; i < candidateRooms.length; i++){
            if(allRooms[candidateRooms[i].room] != -1){
                creep.memory.plymouthRock = candidateRooms[i].room
                break
            }
        }
    }   
        if(creep.memory.plymouthRock != creep.room){
            creep.moveByPath(creep.pos.findPathTo(new RoomPosition(25,25,creep.memory.plymouthRock), {
                range: 15
            }))
        } else {
            var claimAttempt = creep.claimController(room.controller)
            if(claimAttempt == 0){
                creep.memory.plymouthRock = null
                Memory.potentialColonies = _.filter(Memory.potentialColonies, (room) =>{
                    room != creep.room.name
                })
            }
            if(claimAttempt == ERR_NOT_IN_RANGE){
                creep.moveTo(room.controller)
            }
        }       
    }
}

module.exports = logicClaim