var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleRepairer = require('role.repairer')
var roleBuilder = require('role.builder')
var roleClaimer = require('role.claimer')
var roleScout =  require('role.scout')
var logicRenew = require('logic.renew')
var spawnHarvester = require('logic.spawn.harvester')
var spawnBuilder = require('logic.spawn.builder')
var spawnUpgrader = require('logic.spawn.upgrader')
var spawnScout =  require('logic.spawn.scout')
var spawnRepairer = require('logic.spawn.repairer')
var spawnClaimer = require('logic.spawn.claimer')
var spawnStatus =  require('spawn.status')
var Neighbors = require('neighbors')

var maxHarvesters = 3
var maxUpgraders = 7
var maxBuilders = 4
var maxRepairers = 2
var maxClaimers = 0
var maxScouts = 0
var buildAutoRoad = require('build.autoRoad')
var buildAutoExtensions = require('build.autoExtensions')
const maintenanceTickCycle = 500

module.exports.loop = function () {
    if(Memory.potentialColonies == undefined){
        Memory.potentialColonies = []
    }
    if(Memory.borders == undefined){
        Memory.borders = []
    }
    for (var name in Memory.creeps){
        if(!Game.creeps[name]){
            console.log("Clearing non-existing creep from memory:", name)
            delete Memory.creeps[name]
        }
    }
    if(Memory.hostileRooms !== undefined && Memory.hostileRooms.length > 0){
        for(i = 0; i < Memory.hostileRooms.length; i++){
            if (Memory.hostileRooms[i] ===  null){
                console.log("Clearing null rooms from hostileRooms memory")
                Memory.hostileRooms = Memory.hostileRooms.filter(function(element){
                    if(element == null){
                        return false
                    } else {
                        return true
                    }
                })
            }
        }
    } 
    else {
        Memory.hostileRooms = []
    }
    if(Memory.maintenanceTick <= 0){
        console.log('Maintenance Tick')
        let sites = Object.keys(Game.constructionSites).map(function(val){
            return [val]
        })
        for(i = 0; i < sites.length; i++){
            let siteObj = Game.getObjectById(sites[i])
            let sitePos = siteObj.pos
            if(Memory.borders.indexOf(sitePos.roomName) === -1){
                siteObj.remove()
            }
        }
        for (var name in Game.spawns){
            var spawn = Game.spawns[name]
            buildAutoRoad.run(spawn.pos, spawn.pos.findClosestByRange(FIND_SOURCES).pos)
            buildAutoExtensions.run(spawn)
        }
        for(i = 0; i < Memory.borders.length; i++){
            var name = Memory.borders[i]
            if(Game.rooms[name] !== undefined){
                Game.rooms[name].find(FIND_SOURCES).forEach(function(source){

                    let sourceNeighbors = new Neighbors(source.pos).neighbors
                    sourceNeighbors.forEach(function(neighbor){
                        neighbor.createConstructionSite(STRUCTURE_ROAD)
                    })
                })
                if(Game.rooms[name].controller !== undefined && Game.rooms[name].controller.my){
                    var room = Game.rooms[name]
                    var controlStruc = room.controller
                    var roomExtensions = room.find(FIND_STRUCTURES, {
                        filter: structure => {
                            return structure.structureType == STRUCTURE_EXTENSION
                        }
                    })
                    for (var source in room.find(FIND_SOURCES)){
                        //build roads to controller from spawns
                        buildAutoRoad.run(controlStruc.pos, room.find(FIND_SOURCES)[source].pos)
                        //TODO fix autoBuildAroundPos
                        for(i = 0; i < roomExtensions.length; i++){
                            var extension = Game.getObjectById(roomExtensions[i].id)
                            //build raods from each extension to each source
                            buildAutoRoad.run(Game.getObjectById(extension.id).pos, room.find(FIND_SOURCES)[source].pos)
                        }
                    }
                }
            }
        }
        Memory.maintenanceTick = maintenanceTickCycle
    } else {
        Memory.maintenanceTick--
    }
    
    for (var name in Game.spawns){
        var spawn = Game.spawns[name]
        spawnHarvester.run(spawn, maxHarvesters)
        spawnBuilder.run(spawn, maxBuilders)
        spawnUpgrader.run(spawn, maxUpgraders)
        spawnRepairer.run(spawn, maxRepairers)
        spawnScout.run(spawn, maxScouts)
        spawnClaimer.run(spawn, maxClaimers)
        buildAutoRoad.run(spawn.pos, spawn.pos.findClosestByRange(FIND_SOURCES).pos)
        spawnStatus.run(spawn)
    }
    
    for (var name in Game.creeps){
        var creep = Game.creeps[name]
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep)
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep)
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep)
        }
        if(creep.memory.role == 'scout'){
            roleScout.run(creep)
        }
        if(creep.memory.role == 'claimer'){
            roleClaimer.run(creep)
        }
        logicRenew.run(creep)
    }
}