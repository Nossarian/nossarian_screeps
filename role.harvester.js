var logicHarvest = require('logic.harvest')

var roleHarvester = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            logicHarvest.run(creep)
        } else {
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType ==  STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity
                }
                
            })
                if(target == null){
                    creep.say('No Silos')
                    creep.moveTo(Math.random() * (50), Math.random() * (50))
                }
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000fff'}})
                }
        }
    }
}

module.exports = roleHarvester