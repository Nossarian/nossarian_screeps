/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('logic.spawn.upgrader');
 * mod.thing == 'a thing'; // true
 */

var spawnUpgrader = {
    run: function(spawn, maxUpgradersInRoom){
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
        
        if(upgraders.length < maxUpgradersInRoom){
            var bodyParts = [WORK, WORK, MOVE, CARRY]
            for (i = 0; i < spawn.room.controller.level - 1;i++){
                bodyParts.push(MOVE, CARRY, CARRY, WORK)
            }
            var newName = spawn.createCreep(bodyParts, 
                undefined, 
                {
                    role: 'upgrader',
                    upgrading: false
            })
            console.log('Spawning new upgrader: ' + newName)
        }
    }
}

module.exports = spawnUpgrader