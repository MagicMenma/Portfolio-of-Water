// Import the TFRFF.js library
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.162.0/three.cjs";
// Addons
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three-gltf-loader@1.111.0/index.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let object;

let controls

let objToRender = 'Head';

const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'models/Head/Head.glb',
	// called when the resource is loaded
	function ( gltf ) {
		object = gltf.scene;
        scene.add(object);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
}

window.addEventListener("resize", function(){
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();