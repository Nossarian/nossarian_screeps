var logicHarvest = require('logic.harvest')
var logicRepair = require('logic.repair')

var roleBuilder = {
    run: function(creep){
        var repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        if(repairTargets.length > 0 && !creep.memory.harvesting){
            creep.memory.repairing = true
        } else {
            creep.memory.repairing = false
        }
        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if(target == null){
            logicHarvest.run(creep)
        }
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false
            creep.say ('🔄 harvest')
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity){
            creep.memory.building = true;
            creep.say('🚧 build');
        } 
        if(creep.memory.repairing){
            logicRepair.run(creep)
        }
        if(creep.memory.building && !creep.memory.repairing) {
            creep.memory.build = false
            if(creep.build(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        } else {
            logicHarvest.run(creep)
        }
    }
}
module.exports = roleBuilder