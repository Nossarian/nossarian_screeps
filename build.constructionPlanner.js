module.exports = {
    buildRoads: function(fromPos, toPos){
        var mainRoom = Game.rooms[fromPos.roomName]
        var path = mainRoom.findPath(fromPos, toPos,{
            ignoreCreeps: true
        })
        for(var i in path){
            mainRoom.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
        }
    }
    ,

    buildStrucAroundPosWithPathToPos: function(fromPos, toPos, strucType, amount, currRange = 1){
        var Neighbors = require('neighbors')
        let room = Game.rooms[fromPos.roomName]
        if (!room){
            return
        }
        let costs = new PathFinder.CostMatrix
        //set each RoomPosition in the existingPath to be non-pathable
        room.find(FIND_CREEPS).forEach(function(creep){
            costs.set(creep.pos.x, creep.pos.y, 2)
        })

        room.find(FIND_STRUCTURES).forEach(function(struct){
            if(struct.structureType === STRUCTURE_ROAD){
                //favor roads over plains tiles
                costs.set(struct.pos.x, struct.pos.y, 1)
            } 
            else if(struct.structureType !== STRUCTURE_CONTAINER && (
                struct.structureType !== STRUCTURE_RAMPART || !struct.my
            )){
                //Only containers and ramparts are pathable
                //Non-container structures I don't own are non-pathable - this extends to ramparts too 
                costs.set(struct.pos.x, struct.pos.y, 255)
            }
        })
        let existingPath = fromPos.findPathTo(toPos, {
            roomCallback: costs
        })
        
        existingPath.forEach(function(direction){
            costs.set(direction.x, direction.y, 255)
        })

        let pathTo = PathFinder.search(fromPos, {pos: toPos,range: 1},{
            plainCost:2,
            swampCost:10,
            roomCallback:function(roomName) {
                return costs
            }
        }).path
        
        let attemptArray = []
        let rangeArr = _.range((-1*currRange), currRange + 1)
        for(let n in rangeArr){
            let posX = Number(n) + Number(fromPos.x)
            for(let m in rangeArr){
                let posY = Number(m) + Number(fromPos.y)
                let checkPos = new RoomPosition(posX, posY, fromPos.roomName)
                if(pathTo.indexOf(checkPos) === -1 && 
                attemptArray.indexOf(checkPos) === -1){
                    attemptArray.push(checkPos)
                }
            }
        }
        for(i = 0; i < attemptArray; i++){
            let position = attemptArray[i]
            if(amount > 0 &&
                position.lookFor(LOOK_STRUCTURES)[0] === undefined &&
                position.createConstructionSite(strucType) === 0){
                let posNeighbors =  new Neighbors(position).neighbors
                posNeighbors.forEach(function(neighbor){
                    neighbor.createConstructionSite(STRUCTURE_ROAD)
                })
                amount --
            }
        }
        if(amount > 0){
            module.exports.buildStrucAroundPosWithPathToPos(fromPos, toPos, strucType, amount, currRange + 1)
        }

    }
}