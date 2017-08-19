var logicHarvest = require('logic.harvest')

var roleUpgrader = {
    run: function(creep){
        const target = creep.room.controller
        if(creep.upgradeController(target) == ERR_INVALID_TARGET){
            logicHarvest.run(creep)
        }
        if(creep.memory.upgrading && creep.carry.energy == 0){
            creep.memory.upgrading = false
            creep.say ('🔄 harvest')
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity){
            creep.memory.upgrading = true
            creep.say('upgrade')
        } 
        if(creep.memory.upgrading){
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
                creep.say('Moving...')
            }
        }
    }
}

module.exports = roleUpgrader