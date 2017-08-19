var logicHarvest = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            const closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if(creep.harvest(closestSource, RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
             creep.moveTo(closestSource) , {visualizePathStyle: {stroke: '#fff000'}}
            }
        } else {
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType ==  STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity
                }
                
            })
                if(target == null){
                    creep.say('No Silos')
                }
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000fff'}})
                }
        } 
    }
}

module.exports = logicHarvest