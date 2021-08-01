var scene = new THREE.Scene();

// Render creation
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#1a1a44");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera creation
var aspect = window.innerWidth / window.innerHeight;
var d = 10;
camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(20, 20, 20);
camera.lookAt(scene.position);

// Map creation
var map = new cubeMap(50);
Array.from(map.getMap()).forEach(tile => {
    scene.add(tile.getMesh());
});

// Light creation
scene.add(new THREE.AmbientLight(0x4000ff));
var light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(10, 20, 10);
scene.add(light);

//  Resize dynamically
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    var aspect = window.innerWidth / window.innerHeight;
    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
});

//render
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

function regenerate() {
    this.map.reset();
}