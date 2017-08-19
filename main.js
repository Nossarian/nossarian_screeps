var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var spawnHarvester = require('logic.spawn.harvester')
var spawnBuilder = require('logic.spawn.builder')
var spawnUpgrader = require('logic.spawn.upgrader')
var spawnStatus =  require('spawn.status')
var maxHarvesters = 1
var maxUpgraders = 4
var maxBuilders = 3
var buildAutoRoad = require('build.autoRoad')
var buildAutoExtensions = require('build.autoExtensions')

module.exports.loop = function () {
    for (var name in Memory.creeps){
        if(!Game.creeps[name]){
            console.log("Clearing non-existing creep from memory:", name)
            delete Memory.creeps[name]
        }
    }
    
    for(var name in Game.rooms){
        var room = Game.rooms[name]
        var controlStruc = room.controller
        for (var source in room.find(FIND_SOURCES)){
            buildAutoRoad.run(controlStruc.pos, room.find(FIND_SOURCES)[source].pos)
        }
    }
    
    for (var name in Game.spawns){
        var spawn = Game.spawns[name]
        spawnStatus.run(spawn)
        buildAutoExtensions.run(spawn)
        spawnHarvester.run(spawn, maxHarvesters)
        spawnBuilder.run(spawn, maxBuilders)
        spawnUpgrader.run(spawn, maxUpgraders)
    }
    
    for (var name in Game.creeps){
        var creep = Game.creeps[name]
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep)
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep)
        }
    }
}