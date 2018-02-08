/// <reference path='./babylon.d.ts' />
"use strict";

// Création de la scène
var createScene = function(canvas, engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.2, 0.4, 0.8);
    var camera = new BABYLON.ArcRotateCamera("cam", 0, 0, 0, BABYLON.Vector3.Zero(), scene);    
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 100;

    camera.setPosition(new BABYLON.Vector3(0, 1, -5));
    
    var light = new BABYLON.PointLight("pl", camera.position, scene);

    var box = BABYLON.MeshBuilder.CreateBox("box", {sideOrientation: BABYLON.Mesh._DOUBLESIDE}, scene);

    var mat = new BABYLON.StandardMaterial("m", scene);
    mat.diffuseColor = BABYLON.Color3.Green();
    // mat.alpha = 0.8;
    box.material = mat;

    var tex = new BABYLON.Texture('./images/grass.jpg', scene);
    mat.diffuseTexture = tex;

    box.scaling.x = 2;

    var k = 0;
    scene.registerBeforeRender(function(){
        box.rotation.y += 0.01;
        box.position.z = 3 * Math.sin(k);
        // box.position.Z = 3 * Math.sin(k);
        k += 0.01;
    });


    return scene;
};


// Function init : lancement du moteur
var init = function() {
    var canvas = document.querySelector('#renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine);
    window.addEventListener("resize", function() {
        engine.resize();
    });

    engine.runRenderLoop(function(){
        scene.render();
    });
};