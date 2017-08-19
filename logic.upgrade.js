var logicUpgrade = {
    run: function(creep){
        const target = creep.room.controller
        if(creep.upgradeController(target) == ERR_NOT_IN_RANGE){
            creep.moveTo(target)
        }
    }
}

module.exports = logicUpgrade
