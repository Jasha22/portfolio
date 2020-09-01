gsap.from(".text", {delay: 1, duration: 2, opacity: 0, scale: 1});




var scene = new THREE.Scene(); 

// Load Camera Perspektive
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 14;
camera.position.x = -17.6;
camera.position.y = 28;


window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})




   
// Load a Renderer
var renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setClearColor( 0xFFFFFF );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
   
// Load the Orbitcontroller
//var controls = new THREE.OrbitControls( camera, renderer.domElement ); 
           
// Load Light
var ambientLight = new THREE.AmbientLight( 0xffffff);
scene.add( ambientLight );

hemilight = new THREE.HemisphereLight(0x0000ff, 0x000000, 4);
scene.add(hemilight);

light = new THREE.SpotLight(0xffa95c,4);
light.position.set(-50,50,50);
light.castShadow = true;
scene.add( light );
           
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( -100, -40, -30 ).normalize();
scene.add( directionalLight );				



var loader = new THREE.GLTFLoader();
loader.load('/module/scene.gltf', handle_load);

var mesh;

function handle_load(gltf) {
    mesh = gltf.scene.children[0];
    
    scene.add(mesh);  
}
 

function render() {
		requestAnimationFrame(render);

		light.position.set( 
			camera.position.x + 40,
			camera.position.y + 40,
			camera.position.z + 40,
		);
		
    renderer.render( scene, camera );
};

render();








