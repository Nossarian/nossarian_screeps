var logicScout = {
    scout: function(creep){
        var logicExpandBorder = require('logic.expandBorders')
        if(creep.room.name !== creep.memory.previousRoom){
            logicExpandBorder.addRoomToBorders.run(creep.room.name)
            creep.memory.previousRoom = creep.room.name
        }
        if(creep.room.controller != undefined && !creep.room.controller.my && creep.room.controller.owner != undefined && Memory.hostileRooms.indexOf(creep.room.name) == -1){
            Memory.hostileRooms.push(creep.room.name)
            creep.memory.expedition = null
        } 
        if(creep.memory.expedition == creep.room.name){
            creep.memory.expedition = null
            creep.say("Complete!")
        }
        if(Memory.hostileRooms.indexOf(creep.room.name) !== -1 || Memory.hostileRooms.indexOf(creep.memory.expedition) !== -1){
            creep.moveTo(
                creep.pos.findClosestByPath(
                    _.filter(Game.structures, structure => {
                        return structure.my
                    })
                )
            )
            creep.memory.expedition = null
        } else {
            if(creep.memory.expedition == null){
                let exitObj = Game.map.describeExits(roomName)
                let exits = Object.keys(exitObj).map(function(k){return Game.map.describeExits(roomName)[k]})
                    var Number, randTemp = (Math.floor(Math.random() * exits.length))
                    var roomName = exits[randTemp]
                    if(roomName !== undefined){
                        if(Memory.potentialColonies.indexOf(roomName) === -1){
                            Memory.potentialColonies.push(roomName)
                        }
                        creep.memory.expedition = roomName
                    }
                } 
                var newRoomPos = new RoomPosition(25, 25, creep.memory.expedition)
                var search = PathFinder.search(creep.pos, newRoomPos,{
                    range: 5,
                    plainCost: 2,
                    swampCost: 5,
                    roomCallback: function(roomName){
                        let room = Game.rooms[roomName]
                        if(!room) return
                        let costs = new PathFinder.CostMatrix
                        room.find(FIND_MY_CONSTRUCTION_SITES).forEach(function(site){
                            if(site.structureType !== STRUCTURE_CONTAINER &&
                                site.structureType !== STRUCTURE_RAMPART &&
                                site.structureType !== STRUCTURE_ROAD
                            ) {
                                costs.set(site.pos.x, site.pos.y, 255)
                            }
                        })
                        room.find(FIND_STRUCTURES).forEach(function(struct) {
                            if(struct.structureType == STRUCTURE_ROAD){
                                costs.set(struct.pos.x,struct.pos.y, 1)
                            } else if(
                                struct.structureType != STRUCTURE_CONTAINER &&
                                (struct.structureType != STRUCTURE_RAMPART || struct.my)
                            ){
                                costs.set(struct.pos.x,struct.pos.y, 255)
                            }
                        })

                        room.find(FIND_CREEPS).forEach(function(creep){
                            costs.set(creep.pos.x, creep.pos.y, 255)
                        })

                        if(Memory.hostileRooms.indexOf(roomName) != -1){
                            return false
                        }
                        return costs
                    }
                })
                var path = search.path
                creep.moveByPath(path)
                creep.say("peace")
                if(!creep.memory.announced){
                    console.log(creep.name + " is scouting out: " + creep.memory.expedition)
                    creep.memory.announced = true
                }
            
        }
    }
}

module.exports = logicScout