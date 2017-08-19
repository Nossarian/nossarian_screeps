var logicHarvest = require('logic.harvest')

var roleBuilder = {
    run: function(creep){
        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if(target == null){
            logicHarvest.run(creep)
        }
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false
            creep.say ('🔄 harvest')
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && target != null){
            creep.memory.building = true;
            creep.say('🚧 build');
        } 
        if(creep.memory.building) {
            creep.memory.build = false
            if(creep.build(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
    }
}
module.exports = roleBuilder