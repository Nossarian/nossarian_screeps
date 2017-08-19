/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build.autoRoad');
 * mod.thing == 'a thing'; // true
 */

var buildAutoRoad = {
    run: function(name, pos1, pos2){
        if(_.filter(Game.creeps, (creep) => {
            creep.memory.role == 'builder'
        }).length = 0){
            var pathCoords = PathFinder.search(pos1, pos2, {range: 1}).path
            for (var position in pathCoords){
                Game.rooms[name].createConstructionSite(pathCoords[position], STRUCTURE_ROAD)
            }
        }
    }
}

module.exports = buildAutoRoad