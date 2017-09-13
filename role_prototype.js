var proto = {
    /**
     * The creep for this role
     * 
     * @type creep
     */
    creep: null,

    /**
     * Set roll for creep
     * 
     * @param {Creep} creep
     */

     setCreep: function(creep){
         this.creep = creep
         return this
     },

     run: function(){
         if(this.creep.memory.newSpawn == undefined){
             this.onSpawn()
             this.creep.memory.newSpawned = true
         }

         this.action(this.creep)

         if(this.creep.ticksToLive == 1){
             this.beforeAge
         }
         
     }
}