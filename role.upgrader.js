var logicHarvest = require('logic.harvest')

var roleUpgrader = {
    run: function(creep){
        
        if(creep.memory.upgrading && creep.carry.energy == 0){
            creep.memory.upgrading = false
            creep.say ('🔄 harvest')
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity){
            creep.memory.upgrading = true
            creep.say('upgrade')
        } 
        if(creep.memory.upgrading){
            const target = creep.room.controller
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
                creep.say('Moving...')
            }
        } else {
            logicHarvest.run(creep)
        }
    }
}

module.exports = roleUpgrader