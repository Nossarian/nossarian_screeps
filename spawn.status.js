var spawnStatus = {
    run: function(spawn){
            if (spawn.spawning){
                var spawningCreep = Game.creeps[spawn.spawning.name]
                spawn.room.visual.text(
                    '🛠 ️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = spawnStatus