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
var map = new cubeMap();
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

// Render
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// Regenerate button
function regenerate() {
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if(scene.children[i].type === "Mesh")
            scene.remove(scene.children[i]);
    }
    this.map.empty();
    this.map.generateMap(
        document.getElementById("slider-size").value,
        document.getElementById("slider-height").value,
        101 - document.getElementById("slider-variation").value
        );
    Array.from(map.getMap()).forEach(tile => {
        scene.add(tile.getMesh());
    });
}

// Sliders
var sliderHeight = document.getElementById("slider-height");
var outputHeight = document.getElementById("height-amplifier");
outputHeight.innerHTML = sliderHeight.value;
sliderHeight.oninput = function () {
    outputHeight.innerHTML = this.value;
}
var sliderSize = document.getElementById("slider-size");
var outputSize = document.getElementById("size");
outputSize.innerHTML = sliderSize.value;
sliderSize.oninput = function () {
    outputSize.innerHTML = this.value;
}
var sliderVariation = document.getElementById("slider-variation");
var outputVariation = document.getElementById("variation");
outputVariation.innerHTML = sliderVariation.value;
sliderVariation.oninput = function () {
    outputVariation.innerHTML = this.value;
}

// Open / Close menu
const menuSlide = () => {
    const burger = document.querySelector(".burger-icon");
    const menu = document.querySelector(".menu");
    
    burger.addEventListener("click", () => {
        menu.classList.toggle("menu-active");
        burger.classList.toggle("burger-active")
    });
}
menuSlide();