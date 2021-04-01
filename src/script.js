import "./Style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { Object3D } from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    40, window.innerWidth/window.innerHeight,0.01,1000
);
// Renderer
const renderer = new THREE.WebGLRenderer();
let camParent = new THREE.Object3D();
camParent.add(camera);

const loadingManager = new THREE.LoadingManager();
 loadingManager.onProgress = (ref,loaded,total)=>{
     console.log((loaded/total)*100 + "%");
 }

const preloader = document.getElementById('preloader');
console.log(preloader);
loadingManager.onLoad= ()=>{
    const fadeEffect = setInterval(() => {
        if (!preloader.style.opacity) {
          preloader.style.opacity = 1;
        }
        if (preloader.style.opacity > 0) {
          preloader.style.opacity -= 0.125;
        } else {
    
          clearInterval(fadeEffect);
        }
      }, 100);
}

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const sound  = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader(loadingManager);
audioLoader.load("Sound/We_Speak_Chinese.ogg", function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.1);
    sound.play();
});
let CarPanel =[];
let CarVideos = [];
let Mapper = {
    "Aston":()=>{
        VideoPlayer(3);
    },
    "Agera":()=>{
        VideoPlayer(0);
    },
    "Mercedes":()=>{
        VideoPlayer(2);
    },
    "Nissan":()=>{
        VideoPlayer(1);
    }
}

function VideoPlayer(index){
    CarVideos[index].play();
    CarVideos.forEach(element=>{
        if(element != CarVideos[index]){
            if(element.isPlaying)
            element.stop();
        }
    })
}

function NissanCar(ref){
    //Nissan Video
    var video0 = document.getElementById('vid');
    video0.src = "Video/GTR_340.mp4";
    const nissanVideo = new THREE.VideoTexture(video0);
    const nissanVideo_geo = new THREE.PlaneGeometry(10,5);
    const nissanVideo_mat = new THREE.MeshBasicMaterial({map: nissanVideo});
    const nisVideo = new THREE.Mesh(nissanVideo_geo,nissanVideo_mat);
    nisVideo.position.set(-7,3,0);
    nisVideo.scale.set(0.7,0.7,0.7);
    nisVideo.name="NisVideoPanel";
    CarVideos.push(video0);
    nisVideo.userData.isVideo =true;
    const emptyobj = new THREE.Object3D();   
    //video0.play();
    emptyobj.add(nisVideo);

    //Nissan Info
    const NisInfoTex = new THREE.TextureLoader(loadingManager);
    const NissTex = NisInfoTex.load("Image/Nissan_Info.png");
    const NisInfo_geo = new THREE.PlaneGeometry(6,10);
    const NisInfo_mat = new THREE.MeshBasicMaterial({map: NissTex});
    const nisInfo = new THREE.Mesh(NisInfo_geo,NisInfo_mat);
    nisInfo.name="NisInfoPanel";
    nisInfo.position.set(7,3,0);
    nisInfo.scale.set(0.7,0.7,0.7);
    emptyobj.add(nisInfo);
    emptyobj.visible=false;
    emptyobj.userData.isUI = true;
    ref.add(emptyobj);
    CarPanel.push(emptyobj);
}

function KoenigseggCar(ref){
    //Koenigsegg Video
    const video_1 = document.getElementById('vid2');
    video_1.src = "Video/Koenigsegg.mp4";
    const Koe_Video = new THREE.VideoTexture(video_1);
    const KoeVideo_geo = new THREE.PlaneGeometry(10,5);
    const KoeVideo_mat = new THREE.MeshBasicMaterial({map: Koe_Video});
    const koeVideo = new THREE.Mesh(KoeVideo_geo,KoeVideo_mat);
    koeVideo.position.set(-7,4,0);
    koeVideo.name = "KoeVideoPanel";
    CarVideos.push(video_1);
    koeVideo.userData.isVideo =true;
    const emptyobj = new THREE.Object3D();
    //video_1.play();
    emptyobj.add(koeVideo);

    //Koenigsegg Info
    const KoeInfoTex = new THREE.TextureLoader(loadingManager);
    const KoeTex = KoeInfoTex.load("Image/Agera_Info.png");
    const KoeInfo_geo = new THREE.PlaneGeometry(6,10);
    const KoeInfo_mat = new THREE.MeshBasicMaterial({map: KoeTex});
    const KoenInfo = new THREE.Mesh(KoeInfo_geo,KoeInfo_mat);
    KoenInfo.name = "KoeInfoPanel";
    KoenInfo.position.set(-32,2.5,0);
    KoeInfoTex.scale.set(0.8,0.8,0.8);
    emptyobj.add(KoenInfo);
    emptyobj.visible=false;
    emptyobj.userData.isUI = true;
    ref.add(emptyobj);
    CarPanel.push(emptyobj);
}

function MercedesCar(ref){
    //Mercedes Video
    const video_2 = document.getElementById('vid3');
    video_2.src = "Video/CLS.mp4";
    const Mer_Video = new THREE.VideoTexture(video_2);
    const MerVideo_geo = new THREE.PlaneGeometry(10,5);
    const MerVideo_mat = new THREE.MeshBasicMaterial({map: Mer_Video});
    const MerVideo = new THREE.Mesh(MerVideo_geo,MerVideo_mat);
    MerVideo.position.set(-7,4,0);
    MerVideo.name="MerVideoPanel";
    const emptyobj = new THREE.Object3D();
    CarVideos.push(video_2);
    MerVideo.userData.isVideo =true;
    //video_2.play();
    emptyobj.add(MerVideo);

    //Mercedes Info
    const MerInfoTex = new THREE.TextureLoader(loadingManager);
    const MerTex = MerInfoTex.load("Image/Mer_Info.png");
    const MerInfo_geo = new THREE.PlaneGeometry(6,10);
    const MerInfo_mat = new THREE.MeshBasicMaterial({map: MerTex});
    const MerInfo = new THREE.Mesh(MerInfo_geo,MerInfo_mat);
    MerInfo.name="MerInfoPanel";
    MerInfo.position.set(7,4,0);
    MerInfo.scale.set(0.7,0.7,0.7);
    emptyobj.add(MerInfo);
    emptyobj.visible=false;
    emptyobj.userData.isUI = true;
    ref.add(emptyobj);
    CarPanel.push(emptyobj);
}

function AstonCar(ref){
    //Aston Video
    var video_3 = document.getElementById('vid4');
    video_3.src = "Video/DB9.mp4";
    const Ast_Video = new THREE.VideoTexture(video_3);
    const AstVideo_geo = new THREE.PlaneGeometry(10,5);
    const AstVideo_mat = new THREE.MeshBasicMaterial({map: Ast_Video});
    const AstVideo = new THREE.Mesh(AstVideo_geo,AstVideo_mat);
    AstVideo.position.set(-7,4,0);
    AstVideo.name = "AstonVideoPanel";
    const emptyobj = new THREE.Object3D();
    CarVideos.push(video_3);
    AstVideo.userData.isVideo =true;
    //video_3.play();
    emptyobj.add(AstVideo);

    //Aston Info
    const AstInfoTex = new THREE.TextureLoader(loadingManager);
    const AstTex = AstInfoTex.load("Image/Aston_Info.png");
    const AstInfo_geo = new THREE.PlaneGeometry(6,10);
    const AstInfo_mat = new THREE.MeshBasicMaterial({map: AstTex});
    const AstInfo = new THREE.Mesh(AstInfo_geo,AstInfo_mat);
    AstInfo.name = "AstonInfoPanel";
    AstInfo.position.set(7,4,0);
    AstInfo.scale.set(0.8,0.8,0.8);
    emptyobj.add(AstInfo);
    emptyobj.visible=false;
    emptyobj.userData.isUI = true;
    ref.add(emptyobj);
    CarPanel.push(emptyobj);
}

renderer.xr.enabled = true;
let VrButton;
document.body.appendChild(VrButton = VRButton.createButton(renderer));
VrButton.addEventListener("VREntered", ()=>{
    camParent.position.set(-64,2.8,21);
    scene.add(camParent);
});

// Set Resolution
renderer.setSize(window.innerWidth,window.innerHeight);

// Add to HTML Page
document.body.appendChild(renderer.domElement);

window.addEventListener("resize" , function(){
    let aspectRatio = window.innerWidth/window.innerHeight;
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

});  

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

let Cars = [];

const loader = new GLTFLoader(loadingManager);
loader.load(
    "Models/Platform.glb",
    function (gltf){
        let model = gltf.scene;
        model.position.set(0,0,100);
        model.scale.set(0.1,0.1,0.1);
        model.rotation.set(0,20,0);
        model.receiveShadow=true;
        scene.add(model);
    }
);
//Aston Martin
loader.load(
    "Models/AstonMartin.glb",
    function(gltf){
        var aston = gltf.scene;
        Cars.push(aston);
        aston.scale.set(1.1,1.1,1.1);
        aston.position.set(3,4,42);
        aston.name = "Aston";
        scene.add(aston);
        AstonCar(aston);
    }
);
//Koenigsegg 
loader.load(
    "Models/Koenigsegg.glb",
    function(gltf){
        let Koenigsegg = gltf.scene;
        Cars.push(Koenigsegg);
        Koenigsegg.scale.set(0.3,0.3,0.3);
        Koenigsegg.position.set(-32,2.5,26);
        Koenigsegg.name ="Agera";
        scene.add(Koenigsegg);
        KoenigseggCar(Koenigsegg);
    }
);
//Mercedes
loader.load(
    "Models/Mercedes.glb",
    function(gltf){
        let Mercedes = gltf.scene;
        Cars.push(Mercedes);
        Mercedes.scale.set(2,2,2);
        Mercedes.position.set(-64,2.8,11);
        Mercedes.name = "Mercedes";
        scene.add(Mercedes);
        MercedesCar(Mercedes);
    }
);
//Nissan
loader.load(
    "Models/Nissan_R34.glb",
    function(gltf){
        const Nissan = gltf.scene;
        Cars.push(Nissan);
        Nissan.scale.set(2,2,2);
        Nissan.position.set(-101,3.74,-5);
        Nissan.name = "Nissan";
        scene.add(Nissan);
        NissanCar(Nissan);
    }
);

let raycastMatrix = new THREE.Matrix4();

//VR Controller Setup
const controller1 = renderer.xr.getController(0);
controller1.addEventListener("selectstart", onSelectStart);

const controller2 = renderer.xr.getController(1);
controller2.addEventListener("selectstart", onSelectStart);

const controllerModelFactory = new XRControllerModelFactory();

const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(
  controllerModelFactory.createControllerModel(controllerGrip1)
);

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(
  controllerModelFactory.createControllerModel(controllerGrip2)
);

camParent.add(controller1);
camParent.add(controller2);


camParent.add(controllerGrip1);
camParent.add(controllerGrip2);
const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

 const line = new THREE.Line( geometry );
line.name = 'line';
line.scale.z = 5;

controller1.add( line.clone() );
controller2.add( line.clone() );
let raycaster = new THREE.Raycaster();
//Raycaster Physics
function objIntersection(controller){

  raycastMatrix.extractRotation(controller.matrixWorld)

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);

  raycaster.ray.direction.applyMatrix4(raycastMatrix);
  let intersect = vrRaycast();   
  if(intersect)
  {
    let object = intersect.object;
    console.log(object);
        if(object.name === "Agera")
        {
            Traversing(object);
        }
        else if(object.name === "Aston")
        {
            Traversing(object);
        }
        else if(object.name === "Mercedes")
        {
            Traversing(object);
        }
        else if(object.name === "Nissan")
        {
            Traversing(object);
        }
  }  
    
}

function Traversing(param){
    param.traverse((child)=>{
        if(child.userData.isUI){
            child.visible = true;
            CarPanel.forEach((element)=>{
                if(element!=child){
                    element.visible=false;
                    console.log(element);
                }
            })
        }
    })
    Mapper[param.name]();
}

function vrRaycast() {
  return Cars.reduce((closestIntersection, obj) => {
    const intersection = raycaster.intersectObject(obj, true);
    if (!intersection[0]) return closestIntersection;
    if (
      !closestIntersection ||
      intersection[0].distance < closestIntersection.distance
    ) {
      intersection[0].object = obj;
      return intersection[0];
    } else {
      return closestIntersection;
    }
  }, null);
}
//Raycasting VR Controller

function onSelectStart( event ) {

  objIntersection(event.target);

}

camera.position.set(-205,20,10);
camera.rotation.set(0,45,0);

//Lights for Astom Martin
const light = new THREE.PointLight(0xffffff,.8);
light.position.set(3,8,42);
light.castShadow=true;
scene.add(light);

//Lights for Koenigsegg
const light1 = new THREE.PointLight(0xffffff,1);
light1.position.set(-32,8,26);
light1.castShadow=true;
scene.add(light1);

//Lights for Mercedes
const light2 = new THREE.PointLight(0xffffff,.8);
light2.position.set(-64,10,11);
light2.castShadow=true;
scene.add(light2);

//Lights for Nissan
const light3 = new THREE.PointLight(0xffffff,1);
light3.position.set(-101,8,-5);
light3.castShadow=true;
scene.add(light3);

//Animate
const animate = function(){
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop(render);
    controls.update();
};

function render(){
    renderer.render(scene,camera);
}
animate();
