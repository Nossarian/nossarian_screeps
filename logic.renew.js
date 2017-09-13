var logicRenew = {
    run: creep => {
        if(!creep.memory.renewing || creep.memory.renewing === undefined){
            if(creep.ticksToLive < 100){
                creep.memory.renewing = true
            }
        }
            if(creep.memory.renewing){
                let spawnTarget = creep.pos.findClosestByPath(STRUCTURE_SPAWN)
                let renewResult = spawnTarget.renewCreep(creep)
                if(spawnTarget === ERR_FULL){
                    creep.memory.renewing = false
                } 
                else {
                if(spawnTarget === null || !spawnTarget.spawning === null || renewResult === ERR_NOT_ENOUGH_ENERGY){
                    let nextRoom = Memory.borders[Math.abs(Memory.borders.indexOf(creep.roomName)) - 1]
                    console.log(Memory.borders[0])
                    creep.moveTo(Game.rooms[Memory.borders[0]].controller)
                } 
                else {
                    if(renewResult === ERR_NOT_IN_RANGE){
                        creep.moveTo(spawnTarget)
                    }
                }
            }
        }
    }
}

module.exports = logicRenew