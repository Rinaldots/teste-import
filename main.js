import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 4, 4, 4 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 10;
onClick()

const gyroData = {
    alpha: 0,
    beta: 0,
    gamma: 0,
    dalpha: 0,
    dbeta: 0.1,
    dgamma: 0.1
  };
  
  const acellData = {
    x: 0,
    y: 0,
    z: 0,
    dx: null,
    dy: null,
    dz: null
  };



function animate() {
	requestAnimationFrame( animate );
     
    cube.rotation.x += gyroData.dbeta;
	cube.rotation.y += gyroData.gamma;
	

	renderer.render( scene, camera );
}

animate();




  
  const state = {
    gyro: false,
    acell: false,
    mov: false,
    timer: 0,
  }
  
  const temp = {
    data: [],
  };
  
  class saveData {
    constructor(type,number,data,result){
      this.type = type;
      this.number = number;
      this.data = data || [];
      this.result = result;
    };
  };
  
  const acelltresholf = 1.2;
  const gyrotreshold = 20;
  
  //starter
  function onClick() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', acell);
        }
      })
      .catch(console.error);
    } else {
      window.addEventListener('devicemotion', acell);
    }
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', gyro);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', gyro);
    }
    
  }
  
  //obtem dados do giroscopio e salva no objeto
  function gyro(event) {
    gyroData.alpha = event.alpha;
    gyroData.beta = event.beta;
    gyroData.gamma = event.gamma;
  }

  function acell(event) {
      acellData.dx = event.acceleration.x;
      acellData.dy = event.acceleration.y;
      acellData.dz = event.acceleration.z;
    
      gyroData.dalpha = event.rotationRate.alpha;
      gyroData.dbeta = event.rotationRate.beta;
      gyroData.dgamma = event.rotationRate.gamma;
  }
  
 

  