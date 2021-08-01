class cubeMap {
    y;
    map = [];
    width;

    constructor() {
        this.generateMap(50, 10, 30);
    }

    generateMap(width, heightAmplifier, variationAmplifier) {
        this.width = width;
        noise.seed(Math.random());
        for (var z = 0; z < width; z++) {
            for (var x = 0; x < width; x++) {
                // this.y = Math.random();
                this.y = (noise.simplex2(z / variationAmplifier, x / variationAmplifier) + 1) / 2;
                this.map.push(new Cube(x, z, this.y, width, heightAmplifier));
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

    empty() {
        for (var tile of this.map) {
            tile.getGeometry().dispose();
            tile.getMaterial().dispose();
            delete this.map;
            this.map = [];
        }
    }
}