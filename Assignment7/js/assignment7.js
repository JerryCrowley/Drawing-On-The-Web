var camera, scene, renderer, controls;
var geometry, material, mesh;

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  // camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(0, 500, 500);
  camera.lookAt(scene.position);
  scene.add(camera);

  var spotlight = new THREE.SpotLight(0xffffff, 1);
  spotlight.position.set(500, 500, 500);
  spotlight.castShadow = true;

  // shadow map texture width
  spotlight.shadow.mapSize.width = 2000;
  // shadow map texture height
  spotlight.shadow.mapSize.height = 2000;
  // perspective shadow camera frustum near
  spotlight.shadow.camera.near = 500;
  // perspective shadow camera frustum far
  spotlight.shadow.camera.far = 2000;
  // perspective shadow camera frustum fov
  spotlight.shadow.camera.fov = 45;

  scene.add(spotlight);

  var pointlight = new THREE.PointLight(0x0000ff, 0.5, 1000);
  pointlight.position.set(-400, 400, 400);
  scene.add(pointlight);

  // instantiate a loader
  var loader = new THREE.TextureLoader();
  // load a resource
  loader.load(
    // resource URL
    'baseball.jpg',
    // Function when resource is loaded
    function ( texture ) {
      // do something with the texture
      var material = new THREE.MeshBasicMaterial( {
        map: texture
      } );
      geometry = new THREE.SphereGeometry(100, 20, 20);
      mesh     = new THREE.Mesh(geometry, material);
      mesh.position.y = 120;
      mesh.receiveShadow = true;
      scene.add(mesh);
    },
    // Function called when download progresses
    function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.log( 'An error happened' );
    }
  );

  //skybox files
  var path = "sky/";
  var format = ".jpg";
  var urls = [
    path + 'pos-x' + format, path + 'neg-x' + format,
    path + 'pos-y' + format, path + 'neg-y' + format,
    path + 'pos-z' + format, path + 'neg-z' + format
  ];

  skybox = new THREE.CubeTextureLoader().load( urls );
  skybox.format = THREE.RGBFormat;

  //skybox 
  var shader = THREE.ShaderLib["cube"];
  shader.uniforms[ "tCube" ].value = skybox;

  var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  var geometry = new THREE.BoxGeometry(4000, 4000, 4000);
  var mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;

  renderer.render(scene, camera);

  controls.update();
}

init(); // function call to set up
animate(); // function call to animate