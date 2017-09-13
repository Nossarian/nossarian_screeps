var spawnUpgrader = {
    run: function(spawn, maxUpgradersInRoom){
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
        var roomExtensions = spawn.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_EXTENSION)
                }
            }
        )
        
        if(upgraders.length < maxUpgradersInRoom){
            mostExpensiveVariant(Game.spawns[spawn.name], 'upgrader', [WORK,WORK,MOVE,CARRY], [WORK, CARRY, CARRY, MOVE], spawn.room.controller.level, roomExtensions.length)
        }
    }
}

function mostExpensiveVariant(spawnObj, roleName, baseParts, partsPerLevel, controllerLevel, numExtensions){
        var availableTries = ((numExtensions - (numExtensions % 5)) / 5)
        var newParts = baseParts
        for (i = 0; i < availableTries;i++){
            newParts = newParts.concat(partsPerLevel)
        }
        var newName = spawnObj.createCreep(newParts, 
            undefined, 
            {
                role: roleName,
        })
        if(newName == -6 && spawnObj.memory.announcedFailure == false){
            console.log('[' + Date.toUTCString() + ']Insufficient Resources for : ' + roleName + ' with - ' + newParts)
            spawnObj.memory.announcedFailure = true
        } else if (newName == 0){
            spawnObj.memory.announcedFailure = false
            console.log('Spawning new upgrader: ' + newName)
        }
}

module.exports = spawnUpgrader