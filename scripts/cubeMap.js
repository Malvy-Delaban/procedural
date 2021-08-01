class cubeMap {
    y;
    map = [];

    constructor(width) {
        noise.seed(Math.random());
        for (var z = 0; z < width; z++) {
            for (var x = 0; x < width; x++) {
                // this.y = Math.random();
                this.y = (noise.simplex2(z / 30, x / 30) + 1) / 2;
                this.map.push(new Cube(x, z, this.y, width));
            }
        }
    }

    getMap() {
        return this.map;
    }

    getTile(x, z) {
        for (var tile of this.map) {
            if (tile.getPosition().x === x && tile.getPosition().z === z)
                return tile;
        }
    }

    reset() {
        noise.seed(Math.random());
        for (var tile of this.map) {
            tile.overwriteTile((noise.simplex2(tile.getPosition().z / 30, tile.getPosition().x / 30) + 1) / 2);
        }
    }
}