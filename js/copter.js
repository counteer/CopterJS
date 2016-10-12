window.addEventListener("DOMContentLoaded", function() {
	var clock = new THREE.Clock();

	var viewAngle = 45;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var near = 1;
	var far = 1000;

	// renderer (canvas)
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));

	document.body.appendChild(renderer.domElement);

	// create a scene
	var scene = new THREE.Scene();
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 60, 10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	// set a camera
	var aspect = width / height;
	var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	camera.position.z = 100;
	camera.position.y = 0;
	camera.position.x = -120;
	camera.lookAt(new THREE.Vector3(5, 0, 0));
	scene.add(camera);
	// set a directional light
	var directionalLight = new THREE.DirectionalLight(0xffffff, .5);
	directionalLight.position.z = 3;
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	var cubeMesh;
	var camControls;
	initCam();
	// add the plane to the scene
	renderCopter();
	render();

	function renderCopter() {
		var vertices = [ 
		        new THREE.Vector3(0, 0, 0),
				new THREE.Vector3(10,10,10), 
				new THREE.Vector3(-10, 10, 10),
				new THREE.Vector3(10, 10, -10), 
				new THREE.Vector3(-10, 10, -10),
				new THREE.Vector3(-10, 30, -10), 
				new THREE.Vector3(10, 30, -10),
				new THREE.Vector3(10, 30, 10),
				new THREE.Vector3(-10, 30, 10),
				new THREE.Vector3(-5, 15, -50),
				new THREE.Vector3(5, 15, -50),
				new THREE.Vector3(5, 20, -50),
				new THREE.Vector3(-5, 20, -50),
				
				];
		var faces = [ 
		              new THREE.Face3(0, 1, 2), 
		              new THREE.Face3(0, 3, 1),
				new THREE.Face3(0, 4, 3), 
				new THREE.Face3(0, 2, 4),
				new THREE.Face3(4, 5, 6), 
				new THREE.Face3(3, 4, 6),
				new THREE.Face3(3, 6, 7), 
				new THREE.Face3(1, 3, 7),
				new THREE.Face3(1, 7, 8), 
				new THREE.Face3(2, 1, 8),
				new THREE.Face3(2, 8, 5), 
				new THREE.Face3(4, 2, 5), 
				
				new THREE.Face3(4, 9, 3), 
				new THREE.Face3(3, 9, 10), 
				new THREE.Face3(6, 5,11),
				new THREE.Face3(11, 5, 12), 
				new THREE.Face3(6, 3, 11), 
				new THREE.Face3(3, 10,11), 
				new THREE.Face3(4, 5,12),
				new THREE.Face3(4, 12,9),
				
				new THREE.Face3(9, 11,10),
				new THREE.Face3(9,12, 11), 
				];
		var geom = new THREE.Geometry();
		geom.vertices = vertices;
		geom.faces = faces;
		geom.computeFaceNormals();
		var materials = [ new THREE.MeshLambertMaterial({
			opacity : 0.6,
			color : 0x44ff44,
			transparent : true
		}), new THREE.MeshBasicMaterial({
			color : 0x000000,
			wireframe : false
		}) ];
	 mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
		mesh.children.forEach(function(e) {
			e.castShadow = true
		});
		mesh.rotateZ(Math.PI);
		mesh.rotateY(Math.PI);
		// mesh.children[0].translateX(0.5);
		// mesh.children[0].translateZ(0.5);
		scene.add(mesh);

	}

	function initCam() {
		camControls = new THREE.FirstPersonControls(camera);
		camControls.lookSpeed = 0.4;
		camControls.movementSpeed = 0;
		camControls.noFly = true;
		camControls.lookVertical = true;
		camControls.constrainVertical = true;
		camControls.verticalMin = 1.0;
		camControls.verticalMax = 2.0;
		camControls.lon = -150;
		camControls.lat = 120;
	}

	function render() {
		var delta = clock.getDelta();
		// camControls.update(delta);
		mesh.rotateY(.01);
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
}, false);
