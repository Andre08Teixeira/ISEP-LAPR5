import { Component,AfterViewInit,ElementRef,Input,OnInit,ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader,GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';
import {CSS2DRenderer} from  'three/examples/jsm/renderers/CSS2DRenderer';
import { WarehouseCoordinates } from '../warehouseCoordinates';
import { Camera, Clock, DoubleSide, TextureLoader, Vector3 } from 'three';
import { Warehouse } from 'src/Warehouse';
import { WarehouseService } from '../services/warehouse.service';
import { Rotunda } from '../rotunda';
import { Arco_Ligacao } from '../arco_ligacao';
import { Estrada } from '../estrada';

@Component({
  selector: 'app-rede-viaria-automatica',
  templateUrl: './rede-viaria-automatica.component.html',
  styleUrls: ['./rede-viaria-automatica.component.css'],
})
export class RedeViariaAutomaticaComponent implements OnInit{

  warehouses: Warehouse[] = [];
  private clock = new Clock();
  constructor(private warehouseService: WarehouseService) {}
  armazens:WarehouseCoordinates[] = [
/*  {id:"1",name:"Arouca",longitude:8.2451,latitude:40.9321,altitude:250,ligacoes:[1,2,13]}, //0
  {id:"2",name:"Espinho",longitude:8.6410,latitude:41.0072,altitude:550,ligacoes:[0,2]}, //1
  {id:"3",name:"Gondomar",longitude:8.7613,latitude:42.1115,altitude:200,ligacoes:[0,1]}, //2
  {id:"4",name:"Maia",longitude:8.6210,latitude:41.2279,altitude:700,ligacoes:[4,5,15]}, //3
  {id:"5",name:"Matosinhos",longitude:8.6963,latitude:41.1844,altitude:350,ligacoes:[3,5]}, //4
  {id:"6",name:"Oliveira de Azeméis",longitude:8.4770,latitude:40.8387,altitude:750,ligacoes:[3,4,9]}, //5
  {id:"7",name:"Paredes",longitude:8.3304,latitude:41.2052,altitude:0,ligacoes:[7,8]},    //6
  {id:"8",name:"Porto",longitude:8.6291,latitude:41.1579,altitude:600,ligacoes:[6,8,11]},    //7
  {id:"9",name:"Póvoa de Varzim",longitude:8.7609,latitude:41.3804,altitude:400,ligacoes:[6,7]},    //8
  {id:"10",name:"Santa Maria da Feira",longitude:8.5483,latitude:40.9268,altitude:100,ligacoes:[10,11,5]},    //9
  {id:"11",name:"Santo Tirso",longitude:8.4738,latitude:41.3431,altitude:650,ligacoes:[9,11]},//10
  {id:"12",name:"São João da Madeira",longitude:8.4907,latitude:40.9005,altitude:300,ligacoes:[9,10,7]},//11
  {id:"13",name:"Trofa",longitude:8.5600,latitude:41.3391,altitude:450,ligacoes:[13,14]},//12
  {id:"14",name:"Vale de Cambra",longitude:8.3956,latitude:40.8430,altitude:50,ligacoes:[12,14,0]},//13
  {id:"15",name:"Valongo",longitude:8.4983,latitude:41.1887,altitude:800,ligacoes:[12,13]},//14
  {id:"16",name:"Vila do Conde",longitude:8.7479,latitude:41.3517,altitude:150,ligacoes:[16,3]},//15
  {id:"17",name:"Vila Nova de Gaia",longitude:8.6118,latitude:41.1239,altitude:500,ligacoes:[15]},//16*/
];
rotundas: Rotunda[]=[];
arcos: Arco_Ligacao[]=[];
estradas: Estrada[]=[];
arcosmeshes: any[]=[];
estradaMeshes: any[]=[];
 
  
//private keysPressed = {};
  

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
 
  //public keyboard = {};
  private light1: THREE.PointLight;

  private light2: THREE.PointLight;

  private light3: THREE.PointLight;

  private light4: THREE.PointLight;
  
  //
  private camiao:THREE.Object3D;
  private velocidade:number = 0.1;
  private currentEstrada:Estrada;
  private currentRotunda:Rotunda;
 

  private directionalLight: THREE.DirectionalLight;
  

  
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
  for(let i=0;i<2;i++){
    let numero:number =i;
    let numero2:number=i;
while(numero ==i || numero2 ==i){
     numero= Math.floor(Math.random() * 2);
     numero2= Math.floor(Math.random() * 2);
}

    this.armazens[i].ligacoes.push(numero,numero2);
    this.armazens[numero].ligacoes.push(i);
    this.armazens[numero2].ligacoes.push(i);
  }
}
  //? Helper Properties (Private Properties);

  private loaderGLTF = new GLTFLoader();

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;

  private textureLoader = new TextureLoader();

  private inclinar:boolean = false;
 

  private createScene() {
   // let armazem:WarehouseCoordinates ={id:"78",name:"name", longitude:8.6963,latitude:41.1239,altitude:0,ligacoes:[]}
  //  this.armazens.push(armazem);
    //* Scene
    this.passarArmazensparaMock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
    //cinzento 0xd4d4d8

    THREE.Object3D.DefaultUp.set(0,0,1);
    
const texturaEstrada = this.textureLoader.load("../../assets/road.jpg");
const texturaRotunda = this.textureLoader.load("../../assets/rotunda2.jpg");
      let largura = 2.5;
      const K_CIRCULO = 2.1;
      //add armazend e rotundas
      
    for (let i = 0; i < 2; i++) {
     let x = ((50-(-50))/(8.7613-8.2451))*(this.armazens[i].longitude - 8.2451)+(-50);
      let  y = ((50-(-50))/(42.1115-40.8387))*(this.armazens[i].latitude - 40.8387)+(-50);
        let z = (50-0)/(800-0)*(this.armazens[i].altitude-0)+0;
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

    const INFINITESIO = 0.0001;
    const K_LIGACAO = 1.1;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.armazens[i].ligacoes.length; j++) {
        //rampas

        const origem = this.armazens[i];
        const destino = this.armazens[this.armazens[i].ligacoes[j]];
        
        let orientacao = Math.atan2((destino.latitude-origem.latitude),(destino.longitude-origem.longitude));
        let comprimento = K_LIGACAO * (K_CIRCULO*largura/2.0)*1.2;
        const geometry = new THREE.PlaneGeometry( largura, comprimento );
        const material = new THREE.MeshStandardMaterial({map: texturaEstrada,side:THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(origem.longitude+Math.cos(orientacao)*comprimento/2,origem.latitude+Math.sin(orientacao)*comprimento/2,origem.altitude-INFINITESIO);
        //this.rotateZ(orientacao);
        this.arcosmeshes.push(plane);
        plane.rotateZ((Math.PI/2)+orientacao);
        plane.receiveShadow = true;
        this.scene.add(plane);
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
      }
    }


    
    const axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( axesHelper );
    axesHelper.position.set(this.armazens[0].longitude,this.armazens[0].latitude,this.armazens[0].altitude)
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
  //  this.ambientLight = new THREE.AmbientLight(0x333333);
  //  this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    const dLightHelepr = new THREE.DirectionalLightHelper(this.directionalLight,10);
    this.scene.add(dLightHelepr);
		this.directionalLight.position.set(this.rotundas[0].x-4,this.rotundas[0].y-4,this.rotundas[0].z+4);
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

    this.loaderGLTF.load('assets/delivery_truck/scene.gltf',(gltf: GLTF) => {
                const model = gltf.scene.children[0];
                //model.position.set(xp,yp,zp);
                model.rotation.x = 2*Math.PI;
                //model.rotation.y = direcao;
                model.rotation.z = Math.PI/2;
                model.scale.set(0.004,0.004,0.004); // tamanho do camiao na scene
                this.camiao = model;
                this.camiao.position.set(0,0,0);
                this.scene.add(this.camiao);
                this.camiao.traverse(function(node : any){
                  if(node.isMesh){
                  node.castShadow=true;
                  node.receiveShadow=true;
                            }
                  } );
              });
    
    
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
    let component: RedeViariaAutomaticaComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
     /* component.animateModel();*/
      requestAnimationFrame(render);
      
    }());
  }

  /*public addKeysListener(){
    
    document.addEventListener('keydown', (event)=>{
      (this.keysPressed as any)[event.key.toLowerCase()] = true
      this.andarParaAFrente(event.key.toLowerCase());
      
    } , false);
    document.addEventListener('keyup', (event)=>{
      (this.keysPressed as any)[event.key.toLowerCase()] = true;
      
    } , false);
  }*/


  private createControls = () => {
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  };
  private angulo:number = Math.PI/2;

  
      ativarInclinacao(inclinacao:number){
        if(this.inclinar==true){}
        if(this.inclinar == false){
          this.inclinar=true;
          this.camiao.rotateX(inclinacao);
        }
      }
      


  ngOnInit(): void {
     this.canvas = this.canvasRef.nativeElement;   
     this.getWarehouses();
  }

  goTruck(){
    this.automaticMovement();
  }
      
      getWarehouses(): void {
        this.warehouseService.getWarehouses()
        .subscribe(warehouses => this.warehouses = warehouses); 
      }

      goBack(){
        this.createScene();
        this.startRenderingLoop();
        this.createControls();
      }
      
      automaticMovement(): void{
        const K_BERMA = 0.25;
        const berma_reta = K_BERMA * this.estradas[0].largura;
        const berma_circulo = K_BERMA * this.rotundas[0].largura;
        //const RAIO_A, RAIO_B, RAIO_C, RAIO_D, RAIO_E = 1;
        const RAIO_F = 130;//qnt maior o raio mais direito fica o camiao??? 
        const RAIO_B = 130;

        //const velocidade_movimento_A, velocidade_movimento_C, velocidade_movimento_D, velocidade_movimento_E, velocidade_movimento_F, velocidade_movimento_B = 1;
        const ALTURA_CAMIAO = 0.04;
        const velocidade_movimento_D = 1;
        const velocidade_movimento_E = 1;
        const velocidade_movimento_C = 1;
        const velocidade_movimento_F = 1;
        const velocidade_movimento_A = 1;
        let directionRad= 0;
        let rotunda_armazem;
        let rotunda_armazem2; 
        let rotunda_armazem3; 
        let arco_armazem,arco_armazem2;
        let arco_armazem3;
        let estrada_armazem;
        let velocidade_angular, velocidade_horizontal, velocidade_vertical;
        let direcao;
        let xp,yp,zp;
        let angulo_subentendido = 0;
        let angulo_subentendido2 = 0;
        let anguloijk;

        for(let index = 0; index < (this.rotundas.length/2); index++){
          rotunda_armazem = this.rotundas[index];
          rotunda_armazem2 = this.rotundas[index+1];
          if(index == 0){
            //determinar a posicao inicial do camiao, assumindo que ele acabou num movimento de entrada na rotunda do armazem
              console.log('raio',rotunda_armazem.raio);
              let hipotenusa = rotunda_armazem.raio - berma_circulo + 10;
              console.log('hipo',hipotenusa);
              let cateto_transversal = (rotunda_armazem.largura/2) - berma_reta + 10;
              console.log('cateto trans',cateto_transversal);
              angulo_subentendido =  Math.acos(cateto_transversal/hipotenusa);
              console.log('ang ',angulo_subentendido);
              //ver que arco/componente de ligacao corresponde ao da rotunda para sabermos o sentido
              //sentido do camiao
              for(let index2 = 0; index2 < (this.arcos.length); index2++ ){
                if(rotunda_armazem.x == this.arcos[index2].x && rotunda_armazem.y == this.arcos[index2].y && rotunda_armazem.z == this.arcos[index2].z){
                  arco_armazem = this.arcos[index2];
                }
              }
              direcao = (arco_armazem.orientacao) - angulo_subentendido;
              console.log('dir',direcao); //se orientaçao do arco estiver mal, subtrair PI
              xp = rotunda_armazem.x + (rotunda_armazem.raio - berma_circulo) * Math.sin(direcao);
              yp = rotunda_armazem.y + (rotunda_armazem.raio - berma_circulo) * Math.cos(direcao);
              zp = rotunda_armazem.z;
              //parte de meter o camiao na scene
                this.camiao.rotation.z = direcao + Math.PI/2;
                this.camiao.position.set(xp,yp,zp);
          }

          //movimento A

          for(let index3 = 0; index3 < (this.arcos.length); index3++ ){
            if(rotunda_armazem2.x == this.arcos[index3].x && rotunda_armazem2.y == this.arcos[index3].y && rotunda_armazem2.z == this.arcos[index3].z){
              arco_armazem2 = this.arcos[index3];
            }
          }

          if(index > 0){
            rotunda_armazem3 = this.rotundas[index-1];
            for(let index3 = 0; index3 < (this.arcos.length); index3++ ){
              if(rotunda_armazem3.x == this.arcos[index3].x && rotunda_armazem3.y == this.arcos[index3].y && rotunda_armazem3.z == this.arcos[index3].z){
                arco_armazem3 = this.arcos[index3];
                let hipotenusa3 = rotunda_armazem3.raio - berma_circulo + 10;
                let cateto_transversal3 = (rotunda_armazem3.largura/2) - berma_circulo + 10;
                let angulo_subentendido3 = Math.acos(cateto_transversal3/hipotenusa3);
                anguloijk = arco_armazem3.orientacao - arco_armazem.orientacao + angulo_subentendido + angulo_subentendido3
              }
            }
          }else{
            anguloijk = 0 - arco_armazem.orientacao + angulo_subentendido + 0;
          }
      

          if(anguloijk <= 0){
            anguloijk = anguloijk + (2.0 * Math.PI);
          }else if(anguloijk > (2.0*Math.PI)){
            anguloijk = anguloijk - (2.0 * Math.PI);
          }

          let comprimento_arco = (rotunda_armazem.raio-berma_circulo) * anguloijk;
          let n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_A);
          velocidade_angular = -anguloijk / n_fotogramas;
          velocidade_horizontal = 2.0 * (rotunda_armazem.raio-berma_circulo) * Math.sin(anguloijk/n_fotogramas/2.0);
          velocidade_vertical = 0.0; 
          let posicaoX = this.camiao.position.x + 2*Math.PI*(rotunda_armazem.raio-berma_circulo) * Math.cos(anguloijk)-10;
          let posicaoY = this.camiao.position.x + 2*Math.PI*(rotunda_armazem.raio-berma_circulo) * Math.cos(anguloijk)-5;
          //console.log('x: ',posicaoX);
          //console.log('y: ',posicaoY);
          let flag_interval;
          let flag_interval1;
          let flag_interval2;
          let flag_interval3;
          const intervalId = setInterval(() => {
            flag_interval = true;
            const deltaT = this.clock.getDelta();
            console.log('delta',deltaT);
            let coveredDistance = velocidade_horizontal * deltaT;
            directionRad += velocidade_angular;
            console.log('dir',directionRad)
            this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
            console.log('pos ', this.camiao.position);
            this.camiao.rotateZ(-velocidade_angular);
            if(this.camiao.position.x >= posicaoX && this.camiao.position.y <= posicaoY){
              clearInterval(intervalId);
              this.movimentoB(rotunda_armazem,berma_circulo,velocidade_movimento_F,directionRad,rotunda_armazem2);
            }
          }, 1000 / n_fotogramas);
          
          /*
          //movimento B

            let hipotenusa = rotunda_armazem.raio - berma_circulo + 10;
            let cateto_transversal = (rotunda_armazem.largura/2) - berma_circulo + 10;
            angulo_subentendido =  Math.acos(cateto_transversal/hipotenusa);
            comprimento_arco = 10 * angulo_subentendido;
            n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_F);
            velocidade_angular = -(angulo_subentendido/n_fotogramas);
            velocidade_horizontal = 2.0 * 10 * Math.sin(angulo_subentendido/n_fotogramas/2.0); 
            velocidade_vertical = 0.0;
            posicaoX = rotunda_armazem.raio/2 + this.camiao.position.x;
            posicaoY = rotunda_armazem.raio + this.camiao.position.y;
            console.log('x: ',posicaoX);
          console.log('y: ',posicaoY);
            const intervalId2 = setInterval(() => {
              const deltaT = this.clock.getDelta();
            console.log('delta',deltaT);
            let coveredDistance = velocidade_horizontal * deltaT;
            directionRad += velocidade_angular;
            console.log('dir',directionRad)
            this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
            console.log('pos ', this.camiao.position);
            this.camiao.rotateZ(-velocidade_angular);
            if(this.camiao.position.x > posicaoX && this.camiao.position.y < posicaoY){
              clearInterval(intervalId2);
            }
            }, 1000 / n_fotogramas);
            */

            //movimento C

            /*let posicaoX2 = arco_armazem.comprimento + this.camiao.position.x;
            let hipotenusa2 = rotunda_armazem.raio - berma_circulo + RAIO_F;
            let cateto_transversal2 = (rotunda_armazem.largura/2) - berma_circulo + RAIO_F;
            let cateto_longitudinal2 = Math.sqrt((hipotenusa2*hipotenusa2)-(cateto_transversal2*cateto_transversal2));

              let comprimento_percurso2 = arco_armazem.comprimento - cateto_longitudinal2;
              let n_fotogramas2 = Math.ceil(comprimento_percurso2/velocidade_movimento_E);
              let velocidade_angular2 = 0.0;
              let velocidade_horizontal2 = comprimento_percurso2 / n_fotogramas;
              let velocidade_vertical2 = 0.0;
              
              const intervalId3 = setInterval(() => {
                  const deltaT = this.clock.getDelta();
                console.log('delta',deltaT);
                let coveredDistance = velocidade_horizontal2 * deltaT;
                directionRad = arco_armazem.orientacao;
                console.log('dir',directionRad)
                this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
                console.log('pos ', this.camiao.position);
                if(this.camiao.position.x >= posicaoX2){
                  clearInterval(intervalId3);
                }
                }, 1000 / n_fotogramas2); */

            //movimento D
        /*
            for(let index3 = 0; index3 < (this.estradas.length); index3++ ){
              if(this.estradas[index3].xOrigem == rotunda_armazem.x && this.estradas[index3].yOrigem == rotunda_armazem.y && this.estradas[index3].zOrigem == rotunda_armazem.z && this.estradas[index3].x == rotunda_armazem2.x && this.estradas[index3].y == rotunda_armazem2.y && this.estradas[index3].z == rotunda_armazem2.z){
                estrada_armazem = this.estradas[index3];
                console.log('obj:', estrada_armazem);
              }
            }
            let n_fotogramas3 = Math.ceil(estrada_armazem.comprimento/velocidade_movimento_D);
            console.log('estrada',estrada_armazem.comprimento);
            console.log('fotogramas',n_fotogramas);
            let velocidade_angular3 = 0.0;
            console.log(estrada_armazem.comprimentoDaProjecçãonoPlanoOXY);
            let velocidade_horizontal3 =  -estrada_armazem.comprimentoDaProjecçãonoPlanoOXY / n_fotogramas;
            console.log('vel horizontal',velocidade_horizontal);
            let velocidade_vertical3 = estrada_armazem.desnível / n_fotogramas;
            console.log('vel vertical',velocidade_vertical);
            let posicaoX3 = estrada_armazem.comprimento + this.camiao.position.x;

            const intervalId4 = setInterval(() => {
                const deltaT = this.clock.getDelta();
              console.log('delta',deltaT);
              let coveredDistance = velocidade_horizontal3 * deltaT;
              let directionRad = estrada_armazem.orientacao;
              console.log('dir',directionRad)
              this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z + 0.0032);
              this.camiao.rotation.x = estrada_armazem.inclinacao;
              console.log('pos ', this.camiao.position);
              if(this.camiao.position.x >= posicaoX3){
                clearInterval(intervalId4);
              }
            }, 1000 / n_fotogramas);



/*
            //movimento E
            hipotenusa = rotunda_armazem2.raio - berma_circulo + RAIO_F;
            cateto_transversal = (rotunda_armazem2.largura/2) - berma_circulo + RAIO_F;
            cateto_longitudinal = Math.sqrt((hipotenusa*hipotenusa)-(cateto_transversal*cateto_transversal));

            comprimento_percurso = arco_armazem2.comprimento - cateto_longitudinal;
            n_fotogramas = Math.ceil(comprimento_percurso/velocidade_movimento_E);
            velocidade_angular = 0.0;
            velocidade_horizontal = comprimento_percurso / n_fotogramas;
            velocidade_vertical = 0.0;
            setInterval(() => {
                const deltaT = this.clock.getDelta();
              console.log('delta',deltaT);
              let coveredDistance = velocidade_horizontal * deltaT;
              directionRad = arco_armazem2.orientacao;
              console.log('dir',directionRad)
              this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
              console.log('pos ', this.camiao.position);
              }, 1000 / n_fotogramas);

              //movimento F

            hipotenusa = rotunda_armazem2.raio - berma_circulo + 10;
            cateto_transversal = (rotunda_armazem2.largura/2) - berma_circulo + 10;
            angulo_subentendido2 =  Math.acos(cateto_transversal/hipotenusa);
            comprimento_arco = 10 * angulo_subentendido;
            n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_F);
            velocidade_angular = -(angulo_subentendido2/n_fotogramas);
            velocidade_horizontal = 2.0 * 10 * Math.sin(angulo_subentendido2/n_fotogramas/2.0); 
            velocidade_vertical = 0.0;
            
            setInterval(() => {
              const deltaT = this.clock.getDelta();
            console.log('delta',deltaT);
            let coveredDistance = velocidade_horizontal * deltaT;
            directionRad += velocidade_angular;
            console.log('dir',directionRad)
            this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
            console.log('pos ', this.camiao.position);
            this.camiao.rotateZ(-velocidade_angular);
            }, 1000 / n_fotogramas);

            //movimento C
              /*
            let hipotenusa = rotunda_armazem.raio - berma_circulo + RAIO_F;
            let cateto_transversal = (rotunda_armazem.largura/2) - berma_circulo + RAIO_F;
            let cateto_longitudinal = Math.sqrt((hipotenusa*hipotenusa)-(cateto_transversal*cateto_transversal));

            for(let index2 = 0; index2 < (this.arcos.length); index2++ ){
              if(rotunda_armazem.x == this.arcos[index2].x && rotunda_armazem.y == this.arcos[index2].y && rotunda_armazem.z == this.arcos[index2].z){
                arco_armazem = this.arcos[index2];
              }
            }

            let comprimento_percurso = arco_armazem.comprimento - cateto_longitudinal;
            let n_fotogramas = Math.ceil(comprimento_percurso/velocidade_movimento_E);
            velocidade_angular = 0.0;
            velocidade_horizontal = comprimento_percurso / n_fotogramas;
            velocidade_vertical = 0.0;
            setInterval(() => {
                const deltaT = this.clock.getDelta();
              console.log('delta',deltaT);
              let coveredDistance = velocidade_horizontal * deltaT;
              directionRad = arco_armazem.orientacao;
              console.log('dir',directionRad)
              this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
              console.log('pos ', this.camiao.position);
              }, 1000 / n_fotogramas);
*/
            //movimento F
            /*
            let hipotenusa = rotunda_armazem2.raio - berma_circulo + 10;
            let cateto_transversal = (rotunda_armazem2.largura/2) - berma_circulo + 10;
            let angulo_subentendido2 =  Math.acos(cateto_transversal/hipotenusa);
            let comprimento_arco = 10 * angulo_subentendido;
            let n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_F);
            velocidade_angular = -(angulo_subentendido2/n_fotogramas);
            velocidade_horizontal = 2.0 * 10 * Math.sin(angulo_subentendido2/n_fotogramas/2.0); 
            velocidade_vertical = 0.0;
            
            setInterval(() => {
              const deltaT = this.clock.getDelta();
            console.log('delta',deltaT);
            let coveredDistance = velocidade_horizontal * deltaT;
            directionRad += velocidade_angular;
            console.log('dir',directionRad)
            this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
            console.log('pos ', this.camiao.position);
            this.camiao.rotateZ(-velocidade_angular);
            }, 1000 / n_fotogramas);
            
*/
            //movimento B
            /*
            let hipotenusa = rotunda_armazem.raio - berma_circulo + 10;
            let cateto_transversal = (rotunda_armazem.largura/2) - berma_circulo + 10;
            let angulo_subentendido =  Math.acos(cateto_transversal/hipotenusa);
            let comprimento_arco = 10 * angulo_subentendido;
            let n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_F);
            velocidade_angular = -(angulo_subentendido/n_fotogramas);
            velocidade_horizontal = 2.0 * 10 * Math.sin(angulo_subentendido/n_fotogramas/2.0); 
            velocidade_vertical = 0.0;
            
            setInterval(() => {
              const deltaT = this.clock.getDelta();
            console.log('delta',deltaT);
            let coveredDistance = velocidade_horizontal * deltaT;
            directionRad += velocidade_angular;
            console.log('dir',directionRad)
            this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
            console.log('pos ', this.camiao.position);
            this.camiao.rotateZ(-velocidade_angular);
            }, 1000 / n_fotogramas);
            */
            //movimento A

        }
      }

      movimentoB(rotunda_armazem,berma_circulo,velocidade_movimento_B,directionRad,rotunda_armazem2){
        let hipotenusa = rotunda_armazem.raio - berma_circulo + 10;
        let cateto_transversal = (rotunda_armazem.largura/2) - berma_circulo + 10;
        let angulo_subentendido =  Math.acos(cateto_transversal/hipotenusa);
        let comprimento_arco = 10 * angulo_subentendido;
        let n_fotogramas = Math.ceil(comprimento_arco/velocidade_movimento_B);
        let velocidade_angular = -(angulo_subentendido/n_fotogramas);
        let velocidade_horizontal = 2.0 * 10 * Math.sin(angulo_subentendido/n_fotogramas/2.0); 
        let velocidade_vertical = 0.0;
        let posicaoX = rotunda_armazem.raio/2 + this.camiao.position.x;
        let posicaoY = rotunda_armazem.raio + this.camiao.position.y;
        console.log('x: ',posicaoX);
      console.log('y: ',posicaoY);
        const intervalId2 = setInterval(() => {
          const deltaT = this.clock.getDelta();
        console.log('delta',deltaT);
        let coveredDistance = velocidade_horizontal * deltaT;
        directionRad += velocidade_angular;
        console.log('dir',directionRad)
        this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
        console.log('pos ', this.camiao.position);
        this.camiao.rotateZ(-velocidade_angular);
        if(this.camiao.position.x > posicaoX && this.camiao.position.y < posicaoY){
          clearInterval(intervalId2);
          this.movimentoC(rotunda_armazem,berma_circulo,10,1,rotunda_armazem2);
        }
        }, 1000 / n_fotogramas);
      }

      movimentoC(rotunda_armazem,berma_circulo,RAIO_F,velocidade_movimento_C,rotunda_armazem2){

        let arco_armazem;

        let estrada_armazem;
        for(let index3 = 0; index3 < (this.estradas.length); index3++ ){
          if(this.estradas[index3].xOrigem == rotunda_armazem.x && this.estradas[index3].yOrigem == rotunda_armazem.y && this.estradas[index3].zOrigem == rotunda_armazem.z && this.estradas[index3].x == rotunda_armazem2.x && this.estradas[index3].y == rotunda_armazem2.y && this.estradas[index3].z == rotunda_armazem2.z){
            estrada_armazem = this.estradas[index3];
            console.log('obj:', estrada_armazem);
          }

        for(let index2 = 0; index2 < (this.arcos.length); index2++ ){
          if(rotunda_armazem.x == this.arcos[index2].x && rotunda_armazem.y == this.arcos[index2].y && rotunda_armazem.z == this.arcos[index2].z){
            arco_armazem = this.arcos[index2];
          }
        }

        let posicaoX2 = arco_armazem.comprimento + this.camiao.position.x;
            let hipotenusa2 = rotunda_armazem.raio - berma_circulo + RAIO_F;
            let cateto_transversal2 = (rotunda_armazem.largura/2) - berma_circulo + RAIO_F;
            let cateto_longitudinal2 = Math.sqrt((hipotenusa2*hipotenusa2)-(cateto_transversal2*cateto_transversal2));

              let comprimento_percurso2 = arco_armazem.comprimento - cateto_longitudinal2;
              let n_fotogramas2 = Math.ceil(comprimento_percurso2/velocidade_movimento_C);
              let velocidade_angular2 = 0.0;
              let velocidade_horizontal2 = -comprimento_percurso2 / n_fotogramas2;
              let velocidade_vertical2 = 0.0;
              
              const intervalId3 = setInterval(() => {
                  const deltaT = this.clock.getDelta();
                console.log('delta',deltaT);
                let coveredDistance = velocidade_horizontal2 * deltaT;
                let directionRad = arco_armazem.orientacao;
                console.log('dir',directionRad)
                this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y + coveredDistance * Math.sin(directionRad), this.camiao.position.z);
                console.log('pos ', this.camiao.position);
                this.camiao.rotation.x = estrada_armazem.inclinacao;
                if(this.camiao.position.x >= posicaoX2){
                  clearInterval(intervalId3);
                  this.movimentoD(rotunda_armazem,rotunda_armazem2,1,estrada_armazem);
                }
                }, 1000 / n_fotogramas2);
      }
    }
      movimentoD(rotunda_armazem,rotunda_armazem2,velocidade_movimento_D, estrada_armazem){

        let n_fotogramas3 = Math.ceil(estrada_armazem.comprimento/velocidade_movimento_D);
        console.log('estrada',estrada_armazem.comprimento);
        console.log('fotogramas',n_fotogramas3);
        let velocidade_angular3 = 0.0;
        console.log(estrada_armazem.comprimentoDaProjecçãonoPlanoOXY);
        let velocidade_horizontal3 =  -estrada_armazem.comprimentoDaProjecçãonoPlanoOXY / n_fotogramas3;
        console.log('vel horizontal',velocidade_horizontal3);
        let velocidade_vertical3 = estrada_armazem.desnível / n_fotogramas3;
        console.log('vel vertical',velocidade_vertical3);
        let posicaoX3 = estrada_armazem.comprimento + this.camiao.position.x;

        const intervalId4 = setInterval(() => {
            const deltaT = this.clock.getDelta();
          console.log('delta',deltaT);
          let coveredDistance = velocidade_horizontal3 * deltaT;
          let directionRad = estrada_armazem.orientacao;
          console.log('dir',directionRad)
          this.camiao.position.set(this.camiao.position.x - coveredDistance * Math.cos(directionRad), this.camiao.position.y - coveredDistance * Math.sin(directionRad), this.camiao.position.z + 0.00047);
          this.camiao.rotation.x = estrada_armazem.inclinacao;
          console.log('pos ', this.camiao.position);
          if(this.camiao.position.x >= posicaoX3){
            clearInterval(intervalId4);
          }
        }, 1000 / n_fotogramas3);
      }

    }