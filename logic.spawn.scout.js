var spawnScout = {
    run: function(spawn, maxScouts){
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout')
        if(scouts.length < maxScouts){
            var newName = spawn.createCreep([MOVE, MOVE, MOVE, MOVE], undefined, {
                role: 'scout',
                expedition: null
            })
            console.log('Spawning new scout: ' + newName)
        }
    }
}

module.exports = spawnScout