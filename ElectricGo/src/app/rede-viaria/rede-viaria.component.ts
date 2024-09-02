import { Component,AfterViewInit,ElementRef,Input,OnInit,ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader,GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';
import {CSS2DRenderer} from  'three/examples/jsm/renderers/CSS2DRenderer';
import { WarehouseCoordinates } from '../warehouseCoordinates';
import { Camera, DoubleSide, TextureLoader, Vector3 } from 'three';
import { Warehouse } from 'src/Warehouse';
import { WarehouseService } from '../services/warehouse.service';
import { Rotunda } from '../rotunda';
import { Arco_Ligacao } from '../arco_ligacao';
import { Estrada } from '../estrada';
import { TrueEstrada } from '../trueEstrada';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-rede-viaria',
  templateUrl: './rede-viaria.component.html',
  styleUrls: ['./rede-viaria.component.css'],
})
export class RedeViariaComponent implements OnInit{




  warehouses: Warehouse[] = [];
  constructor(private warehouseService: WarehouseService) {}
  armazens:WarehouseCoordinates[] = [
//  {id:"1",name:"Arouca",longitude:8.2451,latitude:40.9321,altitude:250,ligacoes:[3/*,2,13*/]}, //0 AROUCA PARA MAIA
// {id:"2",name:"Espinho",longitude:8.6410,latitude:41.0072,altitude:550,ligacoes:[0/*0,2*/]}, //1 ESPINHO PARA AROUCA
//  {id:"3",name:"Gondomar",longitude:8.7613,latitude:42.1115,altitude:200,ligacoes:[15]}, //2  // GONDOMAR APRA VILA DO CONDE
//  {id:"4",name:"Maia",longitude:8.6210,latitude:41.2279,altitude:700,ligacoes:[14]}, //3  // MAIA PARA  VALONGO
//  {id:"5",name:"Matosinhos",longitude:8.6963,latitude:41.1844,altitude:350,ligacoes:[8]}, //4 MATOSINHOS PARA POVOA DE VARZIM
//  {id:"6",name:"Oliveira de Azeméis",longitude:8.4770,latitude:40.8387,altitude:750,ligacoes:[10]}, //5 ODA PARA SANTO TIRSO
//  {id:"7",name:"Paredes",longitude:8.3304,latitude:41.2052,altitude:0,ligacoes:[15]},    //6 APREDES PARA VILA DO CONDE
//  {id:"8",name:"Porto",longitude:8.6291,latitude:41.1579,altitude:600,ligacoes:[10]},    //7 new 8 PORTO PARA SANTO TIRSO
//  {id:"9",name:"Póvoa de Varzim",longitude:8.7609,latitude:41.3804,altitude:400,ligacoes:[9]},    //8 POVOA PARA SANTA MARIA
//  {id:"10",name:"Santa Maria da Feira",longitude:8.5483,latitude:40.9268,altitude:100,ligacoes:[13]},    //9 SANTA MARIA PARA VALE DE CAMBRA
//  {id:"11",name:"Santo Tirso",longitude:8.4738,latitude:41.3431,altitude:650,ligacoes:[2]},//10 SANTO TIRSO GONDOMAR
//  {id:"12",name:"São João da Madeira",longitude:8.4907,latitude:40.9005,altitude:300,ligacoes:[12]},//11 SAO JOAO DA MADEIRA PARA TROFA
//  {id:"13",name:"Trofa",longitude:8.5600,latitude:41.3391,altitude:450,ligacoes:[13]},//12 TROFA PARA VALE DE CAMBRA
//  {id:"14",name:"Vale de Cambra",longitude:8.3956,latitude:40.8430,altitude:50,ligacoes:[6]},//13 VALE DE CAMBRA PARA APREDES
//  {id:"15",name:"Valongo",longitude:8.4983,latitude:41.1887,altitude:800,ligacoes:[5]},//14 VALONGO PARA OLIVEIRA
//  {id:"16",name:"Vila do Conde",longitude:8.7479,latitude:41.3517,altitude:150,ligacoes:[6]},//15 VILA DO CONDE PAA PAREDES
//  {id:"17",name:"Vila Nova de Gaia",longitude:8.6118,latitude:41.1239,altitude:500,ligacoes:[2]},//16 GAIA PARA GONDOMAR
// {id:"18",name:"Guimaraes",longitude:8.0118,latitude:42.1239,altitude:500,ligacoes:[3]},//16 GAIA PARA GONDOMAR
];
rotundas: Rotunda[]=[];
arcos: Arco_Ligacao[]=[];
estradas: Estrada[]=[];
arcosmeshes: any[]=[];
estradaMeshes: any[]=[];
private som=1;
 
  
private keysPressed = {};
private vemDeOrigem=0;

  @ViewChild('canvas',{static:true}) private canvasRef: ElementRef;
  private canvas:HTMLCanvasElement;
  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;

  //? Scene properties
  private camera: THREE.PerspectiveCamera;

  private controls: OrbitControls;

  private ambientLight : THREE.AmbientLight;
 
  public keyboard = {};
  private light1: THREE.PointLight;

  private light2: THREE.PointLight;

  private light3: THREE.PointLight;

  private light4: THREE.PointLight;
  
  //
  private camiao:THREE.Object3D;
  private velocidade:number = 0.5;
  private currentEstrada:Estrada;
  private currentRotunda:Rotunda;
  private posicaoAnterior=0;
  private negativoPositiovo = 0;
  private possiveisArcos:Arco_Ligacao[];
 

  private directionalLight: THREE.DirectionalLight;
  private tipoCamera:number = 0; //0 é 3 pessoa, 1 a vontade
  

  
private passarArmazensparaMock(){
  for(let i=0;i<this.warehouses.length;i++){
    let id = this.warehouses[i].id;
    let name = this.warehouses[i].designation;
    let longitude = this.warehouses[i].longitude;
    let latitude = this.warehouses[i].latitude;
    let altitude = this.warehouses[i].altitude;
    let armazem:WarehouseCoordinates ={id:id,name:name, longitude:longitude,latitude:latitude,altitude:altitude,ligacoes:[]}
    this.armazens.push(armazem);
  }
  for(let i=0;i<this.warehouses.length;i++){

    //randomizar as estradas

 /* let numero:number =i;
    let numero2:number=i;
while(numero ==i || numero2 ==i){
     numero= Math.floor(Math.random() * this.armazens.length);
     numero2= Math.floor(Math.random() * this.armazens.length);
}

    this.armazens[i].ligacoes.push(numero,numero2);
    this.armazens[numero].ligacoes.push(i);
    this.armazens[numero2].ligacoes.push(i);*/
    

if(i==0){
      this.armazens[i].ligacoes.push(3);
}else if(i==1){
   
      this.armazens[i].ligacoes.push(0);
}else if(i==2){
      this.armazens[i].ligacoes.push(15);
 }else if(i==3){
    
      this.armazens[i].ligacoes.push(13);
 }
 else if(i==4){
      this.armazens[i].ligacoes.push(7);
 }
 else if(i==5){
      this.armazens[i].ligacoes.push(9);
 }
 else if(i==6){
      this.armazens[i].ligacoes.push(15);
}
else if(i==7){
          this.armazens[i].ligacoes.push(11);
}
else if(i==8){
          this.armazens[i].ligacoes.push(9);
}
else if(i==9){
          this.armazens[i].ligacoes.push(2);
}
else if(i==10){
          this.armazens[i].ligacoes.push(12);
}
        else if(i==11){
          this.armazens[i].ligacoes.push(14);
}
else if(i==12){
          this.armazens[i].ligacoes.push(14);
}
else if(i==13){
          this.armazens[i].ligacoes.push(5);
}
else if(i==14){
          this.armazens[i].ligacoes.push(6);
}
else if(i==15){
          this.armazens[i].ligacoes.push(6);
}
else if(i==16){
        this.armazens[i].ligacoes.push(2);
}
else if(i==17){
          this.armazens[i].ligacoes.push(3);
}
else if(i==18){
          this.armazens[i].ligacoes.push(14);
}
else if(i==19){
          this.armazens[i].ligacoes.push(16);
}
else if(i==20){
          this.armazens[i].ligacoes.push(18);
}

}
}
  //? Helper Properties (Private Properties);

  private loaderGLTF = new GLTFLoader();

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;

  private textureLoader = new TextureLoader();

  private inclinar:boolean = false;
  private comprimentoLigacao=0;
 

  private createScene() {
   // let armazem:WarehouseCoordinates ={id:"78",name:"name", longitude:8.6963,latitude:41.1239,altitude:0,ligacoes:[]}
  //  this.armazens.push(armazem);
    //* Scene
    this.passarArmazensparaMock();
    this.scene = new THREE.Scene();
    var cubeTextureLoader = new THREE.CubeTextureLoader();

// Load a cube texture
var texture = cubeTextureLoader.load([
  '../../assets/sh_rt.png',
  '../../assets/sh_lf.png',
  '../../assets/sh_ft.png',
  '../../assets/sh_bk.png',
  '../../assets/sh_up.png',
  '../../assets/sh_dn.png'
]);




// Add the mesh to the scene
this.scene.background = texture;
this.scene.receiveShadow = true;
    

    
    THREE.Object3D.DefaultUp.set(0,0,1);
    
const texturaEstrada = this.textureLoader.load("../../assets/road.jpg");
const texturaRotunda = this.textureLoader.load("../../assets/rotunda2.jpg");
      let largura = 2.5;
      const K_CIRCULO = 1.9;
      //add armazend e rotundas
      
    for (let i = 0; i < this.armazens.length; i++) {
     let x = ((50-(-50))/(8.7613-8.2451))*(this.armazens[i].longitude - 8.2451)+(-50);
      let  y = ((50-(-50))/(42.1115-40.8387))*(this.armazens[i].latitude - 40.8387)+(-50);
        let z = ((50-0)/(800-0))*(this.armazens[i].altitude-0)+0;
    this.armazens[i].longitude = x;
    this.armazens[i].altitude = z;
    this.armazens[i].latitude = y;

      this.loaderGLTF.load('assets/Warehouse-Building/scene.gltf',(gltf: GLTF) => {
        const model = gltf.scene.children[0];
        var box = new THREE.Box3().setFromObject(model);
        box.getCenter(model.position); // this re-sets the mesh position
        model.position.set(x+2.1, y-4.5, z);
        model.rotation.x = 2* Math.PI;
    //    model.rotation.z = -0.5 * Math.PI;
        model.scale.set(0.001,0.001,0.001);
        this.scene.add(model);
        model.traverse(function(node : any){
          if(node.isMesh){
          node.castShadow=true;
          node.receiveShadow=true;
                    }
                } );
        
      });
      let raio = ((K_CIRCULO*largura)/2);
      let id = this.armazens[i].id; 

      const rotundaParaPor:Rotunda = {
        id:id,
        x:x,
        y:y,
        z:z,
        raio:raio,
        largura:largura
    };
    this.rotundas.push(rotundaParaPor);
    const circuloGeometry = new THREE.CircleGeometry(raio,100);
		const circuloMaterial = new THREE.MeshStandardMaterial({map: texturaRotunda, side:THREE.DoubleSide});
		const rotunda = new THREE.Mesh(circuloGeometry,circuloMaterial);
		rotunda.position.set(x, y, z);
    this.scene.add(rotunda);
    rotunda.receiveShadow = true;
    }
    this.loaderGLTF.load('assets/delivery_truck/scene.gltf',(gltf: GLTF) => {
      const model = gltf.scene.children[0];
      model.position.set(this.rotundas[0].x,this.rotundas[0].y,this.rotundas[0].z);
      model.rotation.x = 2* Math.PI;
      model.rotation.z = -(Math.PI/2);
      
  //    model.rotation.z = -0.5 * Math.PI;
      model.scale.set(0.004,0.004,0.004);
      
      this.camiao = model;
      this.scene.add(this.camiao);
      this.camiao.traverse(function(node : any){
        if(node.isMesh){
        node.castShadow=true;
        node.receiveShadow=true;
                  }
              } );
      
    });


    const INFINITESIO = 0.0001;
    const K_LIGACAO = 1.1;

    for (let i = 0; i < this.armazens.length; i++) {
      for (let j = 0; j < this.armazens[i].ligacoes.length; j++) {
        //rampas

        const origem = this.armazens[i];
        const destino = this.armazens[this.armazens[i].ligacoes[j]];
        
        let orientacao = Math.atan2((destino.latitude-origem.latitude),(destino.longitude-origem.longitude));
        let orientacao2 = Math.atan2((origem.latitude-destino.latitude),(origem.longitude-destino.longitude));
        let comprimento = K_LIGACAO * (K_CIRCULO*largura/2.0)*1.9;
        this.comprimentoLigacao=comprimento;
        const geometry = new THREE.PlaneGeometry( largura, comprimento );
        const material = new THREE.MeshStandardMaterial({map: texturaEstrada,side:THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(origem.longitude+Math.cos(orientacao)*comprimento/2,origem.latitude+Math.sin(orientacao)*comprimento/2,origem.altitude-INFINITESIO);
        //this.rotateZ(orientacao);
        this.arcosmeshes.push(plane);
        plane.rotateZ((Math.PI/2)+orientacao);
        plane.receiveShadow = true;
        this.scene.add(plane);
        const plane2 = new THREE.Mesh( geometry, material );
        plane2.position.set(destino.longitude-Math.cos(orientacao)*comprimento/2,destino.latitude-Math.sin(orientacao)*comprimento/2,destino.altitude-INFINITESIO);
        plane2.rotateZ((Math.PI/2)+orientacao);
        plane2.receiveShadow = true;
        this.scene.add(plane2);

        const arco_para_por:Arco_Ligacao = {
       //   x:origem.longitude+Math.cos(orientacao)*comprimento/2,
      //    y:origem.latitude+Math.sin(orientacao)*comprimento/2,
       //   z:origem.altitude-INFINITESIO,
       x:origem.longitude,
       y:origem.latitude,
       z:origem.altitude,
          comprimento:comprimento,
          largura:largura,
          orientacao:orientacao
      };
      
      this.arcos.push(arco_para_por);
      const arco_para_por2:Arco_Ligacao = {
        //   x:origem.longitude+Math.cos(orientacao)*comprimento/2,
       //    y:origem.latitude+Math.sin(orientacao)*comprimento/2,
        //   z:origem.altitude-INFINITESIO,
        x:destino.longitude,
        y:destino.latitude,
        z:destino.altitude,
           comprimento:comprimento,
           largura:largura,
           orientacao:orientacao2
       };

       this.arcos.push(arco_para_por2);

      //estradas


      const desnivel = destino.altitude - origem.altitude;
      let comprimentoPlano = Math.sqrt(Math.pow((destino.longitude - origem.longitude), 2) + Math.pow((destino.latitude - origem.latitude), 2)) - comprimento - comprimento;
      const comprimentoRoad = Math.sqrt(Math.pow(comprimentoPlano,2) + Math.pow(desnivel,2));
const inclinacao = Math.atan(desnivel/comprimentoPlano);
const geometriaEstrada= new THREE.PlaneGeometry(largura, comprimentoRoad);
let estrada = new THREE.Mesh(geometriaEstrada,material);
estrada.position.set((destino.longitude+origem.longitude)/2, (destino.latitude+origem.latitude)/2, (destino.altitude+origem.altitude)/2);
estrada.rotateZ((Math.PI/2)+orientacao);
       estrada.rotateX(-inclinacao);
       this.scene.add(estrada);
       estrada.receiveShadow = true;
       const estrada_para_por:Estrada = {
     //   x:(destino.longitude+origem.longitude)/2,
     //   y:(destino.latitude+origem.latitude)/2,
     //   z:(destino.altitude+origem.altitude)/2,
     xOrigem:origem.longitude,
     yOrigem:origem.latitude,
     zOrigem:origem.altitude,
     x:destino.longitude,
     y:destino.latitude,
     z:destino.altitude,
        comprimentoDaProjecçãonoPlanoOXY:comprimentoPlano,
        desnível:desnivel,
        comprimento:comprimentoRoad,
        largura:largura,
        orientacao:orientacao,
        inclinacao:inclinacao
    };
    this.estradaMeshes.push(estrada);
    this.estradas.push(estrada_para_por);
     
    const desnivel2 = origem.altitude - destino.altitude;
      let comprimentoPlano2 = Math.sqrt(Math.pow((origem.longitude - destino.longitude), 2) + Math.pow((origem.latitude - destino.latitude), 2)) - comprimento - comprimento;
      const comprimentoRoad2 = Math.sqrt(Math.pow(comprimentoPlano2,2) + Math.pow(desnivel2,2));
const inclinacao2 = Math.atan(desnivel2/comprimentoPlano2);

       const estrada_para_por2:Estrada = {
     //   x:(destino.longitude+origem.longitude)/2,
     //   y:(destino.latitude+origem.latitude)/2,
     //   z:(destino.altitude+origem.altitude)/2,
     xOrigem:destino.longitude,
     yOrigem:destino.latitude,
     zOrigem:destino.altitude,
     x:origem.longitude,
     y:origem.latitude,
     z:origem.altitude,
        comprimentoDaProjecçãonoPlanoOXY:comprimentoPlano2,
        desnível:desnivel2,
        comprimento:comprimentoRoad2,
        largura:largura,
        orientacao:orientacao2,
        inclinacao:inclinacao2
    };
    this.estradaMeshes.push(estrada);
    this.estradas.push(estrada_para_por2);



      }
    }
this.currentRotunda=this.rotundas[0];
this.currentEstrada=this.estradas[0];
    
  //  const axesHelper = new THREE.AxesHelper( 10 );
  //  this.scene.add( axesHelper );
   // axesHelper.position.set(0,0,0);
//		this.scene.add(axesHelper,gridHelper);
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      75,
			window.innerWidth / window.innerHeight,
			1,
			500
    )
  //  window.addEventListener('resize',this.resizing);
    this.camera.position.x = 50;
    this.camera.position.y = 50;
    this.camera.position.z = 50;
    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 4);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 120;
    this.directionalLight.shadow.camera.right = 150;
    
    
    this.scene.add(this.directionalLight);
  //  const dLightHelepr = new THREE.DirectionalLightHelper(this.directionalLight,10);
    //this.scene.add(dLightHelepr);
		this.directionalLight.position.set(this.rotundas[3].x-174,this.rotundas[3].y-100,this.rotundas[3].z+15);
  //  const dLightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);
   // this.scene.add(dLightShadowHelper);

  /*  this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);*/
    
    this.scene.fog= new THREE.Fog(0xFFFFFF,0,200);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  private resizing() {
    this.camera.aspect = window.innerWidth/window.innerHeight;
    this.camera.updateMatrix();
    this.renderer.setSize(window.innerWidth,window.innerHeight);
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled =true;
    let component: RedeViariaComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
     /* component.animateModel();*/
      requestAnimationFrame(render);
      
    }());
  }

  public addKeysListener(){
    
    document.addEventListener('keydown', (event)=>{
      (this.keysPressed as any)[event.key.toLowerCase()] = true
      this.andarParaAFrente(event.key.toLowerCase());
      
    } , false);
    document.addEventListener('keyup', (event)=>{
      (this.keysPressed as any)[event.key.toLowerCase()] = true;
    if(this.som==1){  if (event.key === 'w') {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.motorSemAndar.play();
      }
      if (event.key === 's') {
        this.audio2.pause();
        this.audio2.currentTime = 0;
        this.isPlaying2 = false;
      }
      if (event.key === 'a' || event.key === 'd') {
        this.audio5.pause();
        this.audio5.currentTime = 0;
        this.isPlaying3 = false;
      }
    }
    } , false);
  }
  private isPlaying = false;
  private isPlaying2 = false;
  private isPlaying3 = false;
  private audio = new Audio('../../assets/delivery_truck/sound/Famel_Zundapp_XF_17_SUPER_exhaust_sound (mp3cut.net).mp3');
  private audio2 = new Audio('../../assets/delivery_truck/sound/Truck_reverse_sound_effect.mp3');
  private audio3 = new Audio('../../assets/delivery_truck/sound/Goofy_ahh_car_horn_sound_effect.mp3');
  private audio5 = new Audio('../../assets/delivery_truck/sound/Car_Indicator_Sound_Effects___Free_Sound_FX_Bank.mp3');
  private buzina2 = new Audio('../../assets/delivery_truck/sound/mixkit-clown-horn-at-circus-715.wav');
  private motorSemAndar = new Audio('../../assets/delivery_truck/sound/motorsemandar.mp3');
  
  private createControls = () => {
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  };
  private angulo:number = 0;
  private andarParaAFrente(event:string){
    if(this.som ==1){
    if (event == 'w' && !this.isPlaying ) {  this.motorSemAndar.pause();     this.audio.play();       this.isPlaying = true;     }     if ((event == 'a'|| event == 'd') && !this.isPlaying3) {       this.audio5.play();       this.isPlaying3 = true;     }     if (event == 's'  && !this.isPlaying2) {       this.audio2.play();       this.isPlaying2 = true;     }     if (event == 'b') {       this.audio3.play();     }if (event == 'n') {       this.buzina2.play();     }
  }
  if(event =='m'){
    if(this.som==0){
      this.som=1;
      this.motorSemAndar.play();
    }else if(this.som ==1){
      this.som =0;
      this.motorSemAndar.pause();
    }
  }
    if(event=="s"){
      
      const novaPositionX = (this.camiao.position.x - this.velocidade * Math.cos(this.angulo));
      const novaPositionY = (this.camiao.position.y - this.velocidade * Math.sin(this.angulo));
      const novaPositionZ = this.camiao.position.z;
      if(this.posicaoAnterior==0){
        var boleano:boolean = this.verficicarSeRotunda(novaPositionX,novaPositionY,novaPositionZ);
        var boolean2:boolean = false;
        var boolean3:TrueEstrada = null;
        if(boleano ==false){
          boolean2 = this.verficicarSeArco(novaPositionX,novaPositionY, novaPositionZ);
          if(boolean2==false){
             boolean3 = this.verficicarSeEstrada(novaPositionX,novaPositionY,novaPositionZ);
             if(boolean3.is_true == true){
              this.posicaoAnterior=1;
              this.camiao.position.z=boolean3.cota;
         }
          }
        }
          if(boleano == true || boolean2 == true || boolean3.is_true==true){
          this.camiao.position.x=novaPositionX;
        this.camiao.position.y=novaPositionY;
        if(this.tipoCamera==0){
        this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
        this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
        }
        
        
      }
    }else if(this.posicaoAnterior==1){
      var boleano:boolean = this.verficicarSeRotunda(novaPositionX,novaPositionY,novaPositionZ);
      var boolean2:boolean = false;
      var boolean3:TrueEstrada = null;
      if(boleano ==false){
        boolean2 = this.verficicarSeArco(novaPositionX,novaPositionY, novaPositionZ);
        if(boolean2==false){
           boolean3 = this.verficicarSeEstradaCerta(novaPositionX,novaPositionY,novaPositionZ);
           if(boolean3.is_true == true){
            this.camiao.position.z=boolean3.cota;
       }
        }
      }
        if(boleano == true || boolean2 == true || boolean3.is_true==true){
        this.camiao.position.x=novaPositionX;
      this.camiao.position.y = novaPositionY;
      this.camiao.position.z=boolean3.cota;
      if(this.tipoCamera==0){
      this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
      this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
      }
      }
    }
    

    
    
  
    }else if (event=="w"){
      
      
      const novaPositionX = (this.camiao.position.x + this.velocidade * Math.cos(this.angulo));
      const novaPositionY = (this.camiao.position.y + this.velocidade * Math.sin(this.angulo));
      const novaPositionZ = this.camiao.position.z;
      if(this.posicaoAnterior==0){
        var boleano:boolean = this.verficicarSeRotunda(novaPositionX,novaPositionY,novaPositionZ);
        var boolean2:boolean = false;
        var boolean3:TrueEstrada = null;

        if(boleano ==false){
          boolean2 = this.verficicarSeArco(novaPositionX,novaPositionY, novaPositionZ);
          if(boolean2==false){
             boolean3 = this.verficicarSeEstrada(novaPositionX,novaPositionY,novaPositionZ);
             if(boolean3.is_true == true){
                  this.posicaoAnterior=1;
                  this.camiao.position.z=boolean3.cota;
                  console.log("estou numa estrada");
             }
          }
        }
          if(boleano == true || boolean2 == true || boolean3.is_true==true){
          this.camiao.position.x=novaPositionX;
        this.camiao.position.y=novaPositionY;
        if(this.tipoCamera==0){
        this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
        this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
        }
        
        
      }
    }else if(this.posicaoAnterior==1){
      var boleano:boolean = this.verficicarSeRotunda(novaPositionX,novaPositionY,novaPositionZ);
      var boolean2:boolean = false;
      var boolean3:TrueEstrada = null;
      if(boleano ==false){
        boolean2 = this.verficicarSeArco(novaPositionX,novaPositionY, novaPositionZ);
        if(boolean2==false){
           boolean3 = this.verficicarSeEstradaCerta(novaPositionX,novaPositionY,novaPositionZ);
           if(boolean3.is_true == true){
            this.camiao.position.z=boolean3.cota;
       }
        }
      }
        if(boleano == true || boolean2 == true || boolean3.is_true==true){
        this.camiao.position.x=novaPositionX;
      this.camiao.position.y = novaPositionY;
      this.camiao.position.z=boolean3.cota;
      if(this.tipoCamera==0){
      this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
      this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
      }
      }

    }
    }

    else if (event=="a"){
      this.camiao.rotateZ(Math.PI/20);
      this.angulo += Math.PI/20;
      if(this.tipoCamera==0){
      this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
        this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
      }

    }
    else if (event=="d"){
      this.camiao.rotateZ(-Math.PI/20);
      this.angulo -= Math.PI/20;
      if(this.tipoCamera==0){
      this.camera.position.set(this.camiao.position.x- 5 * (Math.cos(this.angulo)),this.camiao.position.y - 5 *(Math.sin(this.angulo)),this.camiao.position.z+3);
        this.camera.lookAt(this.camiao.position.x,this.camiao.position.y,this.camiao.position.z+1.2);
      }
      
    }
    else if (event=="c"){
      if(this.tipoCamera==0){
        this.tipoCamera =1;
      }else if(this.tipoCamera==1){
        this.tipoCamera=0;

      }
      
      
    }
  }


  verficicarSeRotunda(novaPositionX,novaPositionY,novaPositionZ):boolean{
    
    for (let index = 0; index < this.rotundas.length; index++) {
      const element = this.rotundas[index];
      if((this.currentEstrada.xOrigem == element.x && this.currentEstrada.yOrigem == element.y && this.currentEstrada.zOrigem == element.z) 
      ||(this.currentEstrada.x == element.x && this.currentEstrada.y == element.y && this.currentEstrada.z == element.z)){
        if(element.z < (novaPositionZ+0.5)&& (novaPositionZ-0.5)<element.z){
      //(x'P - xi)2 + (y'P - yi)2 ≤ ri2.~
      var ver = Math.pow((novaPositionX - element.x),2) + Math.pow((novaPositionY-element.y),2);
      var raioAoQuadrado = Math.pow(element.raio,2);
   
      if(ver<=raioAoQuadrado){
        this.camiao.position.z = element.z;
        this.currentRotunda=element;
        this.possiveisArcos = this.arcos.slice();
        this.posicaoAnterior=0;
        
        return true;
      }
    }
  }
  }
    return false;
  }
    verficicarSeArco(novaPositionX,novaPositionY,novaPositionZ):boolean{
      
  

for (let index = 0; index < this.possiveisArcos.length; index++) {
  const element = this.possiveisArcos[index];
  if(element.z < (novaPositionZ+0.5)&& (novaPositionZ-0.5)<element.z){
  
  const novaOrigemX = element.x;
  const novaOrigemY =element.y;
  const angulo = element.orientacao;
  const comprimento = element.comprimento;
  const limiteMaxX = comprimento;
  const largura = element.largura;
  const limiteMinY = (-(largura)/2);
  const limiteMaxY = largura/2;

  const camiaoCoordNovasX = (novaPositionX-novaOrigemX) * Math.cos(angulo) + (novaPositionY - novaOrigemY) * Math.sin(angulo);

  const camiaoCoordNovasY=(novaPositionY-novaOrigemY) * Math.cos(angulo) - (novaPositionX-novaOrigemX) * Math.sin(angulo);

  if(0 < camiaoCoordNovasX && camiaoCoordNovasX < limiteMaxX && limiteMinY <= camiaoCoordNovasY && camiaoCoordNovasY <= limiteMaxY){
         
      this.camiao.position.z = element.z;
      this.desativarInclinacaoS(this.currentEstrada.inclinacao);
      return true;
  }
  }
}



      return false;
    }
  




      verficicarSeEstrada(novaPositionX,novaPositionY,novaPositionZ):TrueEstrada{

      
    
      for (let index = 0; index < this.estradas.length; index++) {
        
        const element = this.estradas[index];

        if((this.currentRotunda.x == element.xOrigem && this.currentRotunda.y == element.yOrigem && this.currentRotunda.z == element.zOrigem)
        ||(this.currentRotunda.x == element.x && this.currentRotunda.y == element.y && this.currentRotunda.z == element.z)){
        const novaOrigemX = element.xOrigem;
        const novaOrigemY =element.yOrigem;
        const angulo = element.orientacao;
        const comprimento = element.comprimento;
        const comprimentoPlano = element.comprimentoDaProjecçãonoPlanoOXY;
        const limiteMaxX = comprimento + comprimentoPlano;
        const largura = element.largura;
        const limiteMinY = (-(largura)/2);
        const limiteMaxY = largura/2;
        const desnivel = element.desnível;

        const camiaoCoordNovasX = (novaPositionX-novaOrigemX) * Math.cos(angulo) + (novaPositionY - novaOrigemY) * Math.sin(angulo);
        const camiaoCoordNovasY=(novaPositionY-novaOrigemY) * Math.cos(angulo) - (novaPositionX-novaOrigemX) * Math.sin(angulo);
        if(this.currentRotunda.x == element.xOrigem && this.currentRotunda.y == element.yOrigem && this.currentRotunda.z == element.zOrigem){
          this.vemDeOrigem =0;
        }else{
          this.vemDeOrigem = 1;
        }


const mini =comprimento //72
const novoMini= comprimento-comprimentoPlano; //3
const total =comprimento + comprimentoPlano //142
const novoTotal = comprimento; //72


        if(comprimento-comprimentoPlano < camiaoCoordNovasX && camiaoCoordNovasX < comprimento && limiteMinY <= camiaoCoordNovasY && camiaoCoordNovasY <= limiteMaxY){

          
        //  this.ativarInclinacao(element.inclinacao);
          this.currentEstrada=element;
          
          if(this.currentRotunda.x == element.xOrigem && this.currentRotunda.y == element.yOrigem && this.currentRotunda.z == element.zOrigem){
            this.negativoPositiovo =0;
          }else if(this.currentRotunda.x == element.x && this.currentRotunda.y == element.y && this.currentRotunda.z == element.z){
          this.negativoPositiovo=1;
          }
          const novoZ = element.zOrigem + (camiaoCoordNovasX - (novoMini)) / comprimentoPlano * desnivel;
      //    this.ativarInclinacao(-element.inclinacao);
          this.currentEstrada=element;
          this.posicaoAnterior=1;
          const retorno:TrueEstrada = {is_true:true, cota:novoZ};
            return retorno;
        }
  }
}
  const retorno:TrueEstrada = {is_true:false, cota:null};
        return retorno;
      }


      verficicarSeEstradaCerta(novaPositionX,novaPositionY,novaPositionZ):TrueEstrada{
          for (let index = 0; index < this.estradas.length; index++) {
            const element = this.estradas[index];
            if(element==this.currentEstrada){
              this.possiveisArcos.splice(0);
              for (let index = 0; index < this.arcos.length; index++) {
                const element = this.arcos[index];
                if((element.x == this.currentEstrada.xOrigem || element.x == this.currentEstrada.x) && (element.y == this.currentEstrada.y || element.y == this.currentEstrada.yOrigem)&& (element.z == this.currentEstrada.z || element.z == this.currentEstrada.zOrigem)){
                  this.possiveisArcos.push(element);
                }
                
              }
            
            const novaOrigemX = element.xOrigem;
            const novaOrigemY =element.yOrigem;
            const angulo = element.orientacao;
            const comprimento = element.comprimento;
            const comprimentoPlano = element.comprimentoDaProjecçãonoPlanoOXY;
            const limiteMaxX = comprimento + comprimentoPlano;
            const largura = element.largura;
            const limiteMinY = (-(largura)/2);
            const limiteMaxY = largura/2;
            const desnivel = element.desnível;
    
            const camiaoCoordNovasX = (novaPositionX-novaOrigemX) * Math.cos(angulo) + (novaPositionY - novaOrigemY) * Math.sin(angulo);

            
            const camiaoCoordNovasY=(novaPositionY-novaOrigemY) * Math.cos(angulo) - (novaPositionX-novaOrigemX) * Math.sin(angulo);
    
    
    
    const mini =comprimento //72
    const novoMini= comprimento-comprimentoPlano; //3
    const total =comprimento + comprimentoPlano //142
    const novoTotal = comprimento; //72
                
                console.log("comprimento: " + element.comprimento);
                console.log("comprimento no plano: " + element.comprimentoDaProjecçãonoPlanoOXY);
                console.log("a minha coord: " + camiaoCoordNovasX);
                console.log();
                console.log();
    
    
            
              if(((this.comprimentoLigacao < camiaoCoordNovasX && camiaoCoordNovasX < comprimento) || (comprimento < camiaoCoordNovasX && camiaoCoordNovasX < comprimento+comprimentoPlano)) && limiteMinY <= camiaoCoordNovasY && camiaoCoordNovasY <= limiteMaxY){
                var novoZ =0;
                if(this.vemDeOrigem==0){
                if(desnivel<0){
              novoZ = (element.zOrigem + (camiaoCoordNovasX - this.comprimentoLigacao) / comprimentoPlano * desnivel);
    }
    else {              novoZ = (element.zOrigem + (camiaoCoordNovasX - this.comprimentoLigacao) / comprimentoPlano * desnivel);
  }
}else if(this.vemDeOrigem ==1){
if(desnivel<0){
    novoZ = (element.zOrigem + (camiaoCoordNovasX -this.comprimentoLigacao) / comprimentoPlano * desnivel);
}else {              novoZ = (element.zOrigem + (camiaoCoordNovasX -this.comprimentoLigacao) / comprimentoPlano * desnivel);}
}
              //se o novoZ for mais pequeno, -element.inclinaçaõ senao o controario
              this.ativarInclinacao(-element.inclinacao);
              this.currentEstrada=element;
              this.posicaoAnterior=1;
              const retorno:TrueEstrada = {is_true:true, cota:novoZ};
              return retorno;
    
            
            
          }
      }
    }
      
    const retorno:TrueEstrada = {is_true:false, cota:null};
    return retorno;
          }
      ativarInclinacao(inclinacao:number){
        if(this.inclinar==true){}
        if(this.inclinar == false){
          if(this.negativoPositiovo==0){
          this.inclinar=true;
          this.camiao.rotateX(-inclinacao);
        }else if(this.negativoPositiovo==1){
          this.inclinar=true;
          this.camiao.rotateX(inclinacao);
        }
      }
      }
      desativarInclinacaoS(inclinacao:number){
        if(this.inclinar==false){}
        if(this.inclinar == true){
          if(this.negativoPositiovo==0){
            this.inclinar=false;
            this.camiao.rotateX(-inclinacao);
          }else if(this.negativoPositiovo==1){
            this.inclinar=false;
            this.camiao.rotateX(inclinacao);
          }
          
        }
      }
      desativarInclinacaoW(){
        if(this.inclinar==false){}
        if(this.inclinar == true){
          this.inclinar=false;
          
        }
      }
      


  ngOnInit(): void {
     this.canvas = this.canvasRef.nativeElement;
    this.getWarehouses();
    this.addKeysListener();
      }
      
      getWarehouses(): void {
        this.warehouseService.getWarehouses()
        .subscribe(warehouses => this.warehouses = warehouses);
        
      }
      goBack(){
        this.createScene();
    this.startRenderingLoop();
    this.createControls();
    this.motorSemAndar.loop = true;
    this.motorSemAndar.play();
      }
}
