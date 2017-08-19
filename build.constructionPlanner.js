module.exports = {
    buildRoads: function(fromPos, toPos){
        var mainRoom = Game.rooms[fromPos.roomName]
        var path = mainRoom.findPath(fromPos, toPos,{
            ignoreCreeps: true
        })
        for(var i in path){
            mainRoom.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
        }
    }
}