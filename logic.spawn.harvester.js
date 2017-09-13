var spawnHarvester = {
    run: function(spawn, maxHarvesters){
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
        if(harvesters.length < maxHarvesters){
            var newName = spawn.createCreep([WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'harvester'})
            console.log('Spawning new harvester: ' + newName)
        }
    }
}

module.exports = spawnHarvester