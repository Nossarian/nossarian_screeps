var logicRepair = require('logic.repair')
var logicHarvest = require('logic.harvest')

var roleRepair = {
    run: function(creep){
        if(!creep.memory.harvesting){
            logicRepair.run(creep)
        } else {
            logicHarvest.run(creep)
        }
    }
}

module.exports = roleRepair