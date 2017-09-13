var logicHarvest = require('logic.harvest')
var logicRepair = require('logic.repair')

var roleBuilder = {
    run: function(creep){
        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if(target == null){
            logicHarvest.run(creep)
            return
        }
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false
            creep.say ('🔄 harvest')
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity){
            creep.memory.building = true;
            creep.say('🚧 build');
        } 
        if(creep.memory.building) {
            if(creep.build(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        } else {
            logicHarvest.run(creep)
        }
    }
}
module.exports = roleBuilder