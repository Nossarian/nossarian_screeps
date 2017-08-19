/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('logic.spawn.upgrader');
 * mod.thing == 'a thing'; // true
 */

var spawnBuilder = {
    run: function(spawn, maxBuilders){
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
        
        if(builders.length < maxBuilders){
            var newName = spawn.createCreep([WORK, MOVE, CARRY, CARRY], 
                undefined,
                 {
                role: 'builder',
                building: false
            })
            console.log('Spawning new builder: ' + newName)
        }
    }
}

module.exports = spawnBuilder