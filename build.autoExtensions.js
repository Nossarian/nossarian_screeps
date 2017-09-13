var Neighbors = require('neighbors')
var constructionPlanner = require('build.constructionPlanner')

var buildAutoExtensions = {
    run: function(spawn){
        var spawnRoom = spawn.room
        var roomController = spawnRoom.controller
        var existingExtensions = spawnRoom.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_EXTENSION)
                }
            }
        ).length + spawnRoom.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (site) => {
                return(site.structureType == STRUCTURE_EXTENSION)
            }
        }).length
        if(roomController.level >= 2){
            var toBuild = (5 * (roomController.level - 1)) - existingExtensions
            constructionPlanner.buildStrucAroundPosWithPathToPos(spawn.pos, roomController.pos, STRUCTURE_EXTENSION, toBuild)
        }
    }
}
module.exports = buildAutoExtensions