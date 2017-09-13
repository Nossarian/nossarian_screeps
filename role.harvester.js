var logicHarvest = require('logic.harvest')

var roleHarvester = {
    run: function(creep){
            creep.say(creep.carry.energy + '/' + creep.carryCapacity)
            logicHarvest.run(creep)
    }
}

module.exports = roleHarvester