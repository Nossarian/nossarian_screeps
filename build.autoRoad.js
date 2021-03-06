/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build.autoRoad');
 * mod.thing == 'a thing'; // true
 */
var constructionPlanner = require('build.constructionPlanner')

var buildAutoRoad = {
    run: function(pos1, pos2){
        constructionPlanner.buildRoads(pos1, pos2)
    }
}

module.exports = buildAutoRoad