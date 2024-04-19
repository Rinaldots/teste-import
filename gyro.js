const gyroData = {
  alpha: 0,
  beta: 0,
  gamma: 0,
  dalpha: 0,
  dbeta: 0.1,
  dgamma: 0.1,
  dx: null,
  dy: null,
  dz: null
};

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
  gyroData.dx = event.acceleration.x;
  gyroData.dy = event.acceleration.y;
  gyroData.dz = event.acceleration.z;
  
  gyroData.dalpha = event.rotationRate.alpha;
  gyroData.dbeta = event.rotationRate.beta;
  gyroData.dgamma = event.rotationRate.gamma;
}