var buildAutoExtensions = {
    run: function(spawn){
        var spawnRoom = spawn.room
        var roomController = spawnRoom.controller
        var roomExtensions = spawnRoom.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_EXTENSION)
                }
            }
        )
        console.log(roomExtensions.length)
        if(roomExtensions.length < (5 * (roomController.level - 1))){
            getNearbyConstructionSites(spawn.pos, STRUCTURE_EXTENSION)
        }
    }
}

function getNearbyConstructionSites(roomPos, strucType){
    var i = 2
    var max = 15
    var current = 2
    if(i < max ){
        for(x = 0; x < max; x++){
            for (y = 0; y < max; y++){
                var pos1 = new RoomPosition((roomPos.x + x),(roomPos.y + y), roomPos.roomName)
                var pos2 = new RoomPosition((roomPos.x + y),(roomPos.y + x), roomPos.roomName)
                var pos3 = new RoomPosition((roomPos.x + x),(roomPos.y + x), roomPos.roomName)
                if(pos1.createConstructionSite(strucType) == 0){
                    console.log("Constructing extension in " + roomPos.roomName + " @(" + pos1.x.toString() + "," + pos1.y.toString() + ")")
                    break
                }
                if(pos3.createConstructionSite(strucType) == 0){
                    console.log("Constructing extension in " + roomPos.roomName + " @(" + pos3.x.toString() + "," + pos3.y.toString() + ")")
                    break
                }
                if(pos2.createConstructionSite(strucType) == 0){
                    console.log("Constructing extension in " + roomPos.roomName + " @(" + pos2.x.toString() + "," + pos2.y.toString() + ")")
                    break
                }
            }
            break
        }
        i++
    }
}

module.exports = buildAutoExtensions