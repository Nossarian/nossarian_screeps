var spawnRepairer = {
    run: function(spawn, maxRepairers){
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
        if(repairers.length < maxRepairers){
            var newName = spawn.createCreep([MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY], undefined, {
                role: 'repairer',
                harvesting: true
            })
            console.log('Spawning new repairer: ' + newName)
        }
    }
}

module.exports = spawnRepairer