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
            var newName = spawn.createCreep([WORK, MOVE, MOVE, CARRY, CARRY], 
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