var logicScout = require('logic.scout')

var roleScout = {
    run: function(creep){
        try {
        logicScout.scout(creep)
        } catch (e){
            return
        }
    }
}

module.exports = roleScout