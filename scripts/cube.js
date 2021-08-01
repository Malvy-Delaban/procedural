class Cube {
    material = new THREE.MeshPhongMaterial({
        color: "gold",
        specular: 0xffffff,
        shininess: 50,
    });
    geometry;
    mesh;
    height;
    mapPos;
    sizeRatio;
    heightAmplifier = 10;

    constructor(x, z, height, mapWidth) {
        this.sizeRatio = mapWidth / 10;
        this.height = height * this.heightAmplifier;
        this.mapPos = { "x": x, "z": z };
        this.geometry = new THREE.BoxGeometry(1 / this.sizeRatio, (this.height + 0.5) / this.sizeRatio, 1 / this.sizeRatio);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = (x - (mapWidth / 2)) / this.sizeRatio;
        this.mesh.position.z = (z - (mapWidth / 2)) / this.sizeRatio;
        this.mesh.position.y = (0 + this.height / 2) / this.sizeRatio;
        this.defineColor();
    }

    defineColor() {
        if (this.height > 0.70 * this.heightAmplifier)
            this.material.color.set("grey");
        else if (this.height > 0.20 * this.heightAmplifier)
            this.material.color.set("green");
        else if (this.height > 0.10 * this.heightAmplifier)
            this.material.color.set("gold");
        else
            this.material.color.set("darkcyan");
    }

    getMesh() {
        return (this.mesh);
    }

    setPosition(x, z) {
        this.mesh.position.x = x;
        this.mesh.position.z = z;
    }

    getPosition() {
        return this.mapPos;
    }

    getHeight() {
        return this.height;
    }

    setColor(color) {
        this.material.color.set(color);
    }

    overwriteTile(height) {
        this.height = height * this.heightAmplifier;
        delete this.geometry;
        this.geometry = new THREE.BoxGeometry(1 / this.sizeRatio, (this.height + 0.5) / this.sizeRatio, 1 / this.sizeRatio);
        this.mesh.geometry = this.geometry;
        this.mesh.position.y = (0 + this.height / 2) / this.sizeRatio;
        this.defineColor();
    }
}