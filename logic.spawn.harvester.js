var spawnHarvester = {
    run: function(spawn, maxHarvesters){
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
        
        if(builders.length < maxHarvesters){
            var newName = spawn.createCreep([WORK, MOVE, CARRY, CARRY, CARRY], undefined, {role: 'harvester'})
            console.log('Spawning new builder: ' + newName)
        }
    }
}

module.exports = spawnHarvester