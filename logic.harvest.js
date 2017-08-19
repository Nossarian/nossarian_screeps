var logicUpgrade = require('logic.upgrade')

var logicHarvest = {
    run: function(creep){
        if(creep.carry.energy == 0){
            creep.memory.harvesting = true
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.harvesting){
            const closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if(creep.harvest(closestSource, RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
             creep.moveTo(closestSource) , {visualizePathStyle: {stroke: '#fff000'}}
            }
            creep.memory.harvesting = true
        } else {
                creep.memory.harvesting = false
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType ==  STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity
                }
                
            })
                if(creep.transfer(target, RESOURCE_ENERGY) ==  ERR_INVALID_TARGET){
                    logicUpgrade.run(creep)
                } else {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000fff'}})
                }
            }
        } 
    }
}

module.exports = logicHarvest