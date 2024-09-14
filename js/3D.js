import * as THREE from "https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const container = document.querySelector('#scene-container');

// Create a camera
const fov = 30; // AKA Field of View
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1; // the near clipping plane
const far = 1000; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(12, 0, 0);
camera.lookAt(0, 0, 0);

let object;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2; 

const renderer = new THREE.WebGLRenderer({alpha: true},{antialias: true});
renderer.setSize( container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);

let isMouseDown = false;
let autoRotateAngle = 0;
const maxAngle = Math.PI / 2.8;
const minAngle = -Math.PI / 2.8;
let autoRotateSpeed = 0.001;
let clock = new THREE.Clock();

container.append(renderer.domElement);

THREE.Cache.enabled = true;

const loader = new GLTFLoader();
loader.load( 'models/Head/HeadV3.glb', 
(gltf) => {
  object = gltf.scene;
  object.position.set(0,0,3);
  scene.add( object );
}, 
function (xhr){
  console.log((xhr.loader / xhr.total * 100) + '% loader');
},
undefined, function ( error ) {
	console.error( error );
} );

const topLight = new THREE.DirectionalLight('white', 5);
topLight.position.set(1000, 200, 100);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  if (object) {
    object.rotation.y = 0;
    object.rotation.z = 0;
  }
  isMouseDown = false;
});

function animate(){
  requestAnimationFrame(animate);

  let delta = clock.getDelta();

  if (object) {
    if (isMouseDown) {
      // Manual Rotation
      let targetY = 4.9 + mouseX / window.innerWidth * 3;
      let targetZ = -( -0.5 + mouseY * 1 / window.innerHeight );
      object.rotation.y = THREE.MathUtils.lerp(object.rotation.y, targetY, delta * 5);
      object.rotation.z = THREE.MathUtils.lerp(object.rotation.z, targetZ, delta * 5);
    } else {
      // Auto Rotation
      autoRotateAngle += autoRotateSpeed;
      if (autoRotateAngle > maxAngle || autoRotateAngle < minAngle) {
        autoRotateSpeed *= -1;
      }
      object.rotation.y += autoRotateSpeed * delta * 60;
    }
  }

  renderer.render(scene, camera);
}

animate();