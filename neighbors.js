function NeighborGrid(pos){
    var x = pos.x
    var y = pos.y
    this.topLeft = new RoomPosition(x - 1, y - 1, pos.roomName)
    this.topCenter = new RoomPosition(x, y - 1, pos.roomName)
    this.topRight = new RoomPosition(x + 1, y - 1, pos.roomName)
    this.midLeft = new RoomPosition(x - 1, y, pos.roomName)
    this.midRight = new RoomPosition(x + 1, y, pos.roomName)
    this.botLeft = new RoomPosition(x - 1, y + 1, pos.roomName)
    this.botCenter = new RoomPosition(x, y + 1, pos.roomName)
    this.botRight = new RoomPosition(x + 1, y + 1, pos.roomName)
    this.neighbors =
        [
        this.topLeft, this.topCenter, this.topRight,
        this.midLeft, this.midRight,
        this.botLeft, this.botCenter, this.botRight
    ]
}

module.exports = NeighborGrid