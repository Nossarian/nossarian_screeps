var spawnClaimer = {
    run: function(spawn, maxClaimers){
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer')
        if(claimers.length < maxClaimers){
            var newName = spawn.createCreep([MOVE,MOVE,CLAIM], undefined, {
                role: 'claimer'
            })
            console.log('Spawning new claimer: ' + newName)
        }
    }
}

module.exports = spawnClaimer