import {
    IonActionSheet, IonButton, IonButtons,
    IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader,
    IonIcon, IonImg,
    IonPage, IonRow, IonText,
    IonTitle,
    IonToolbar, useIonAlert
} from '@ionic/react';
import {
    cameraOutline,
    trash,
    close,
    scanCircleOutline,
    stopCircleOutline,
    scanOutline,
    addCircle, document
} from "ionicons/icons";
import React, {useEffect, useState} from 'react';

import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FirstPersonControls} from "../../modules/FirstPersonControls";




const ThreeDimensionalInteraction: React.FC = () => {

    const initThreeJS = () => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const size = 10;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        const hideBg = window.document.querySelector('.hideBg') as HTMLElement;
        hideBg.appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 0.7, 0.7, 0.7 );
        var material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );



        camera.position.x = 1;
        camera.position.y = 2;
        camera.position.z = 4;

        camera.rotation.x = -0.3;
        camera.rotation.y = -0.3;

        //10 * 100/10
        //(180 * 50) / 100
        const degree = 180;
        const percentValue = 50;
        const value = (180 * percentValue) / 100



        var vector = new THREE.Vector3( 2, 2, -2 );
        // vector.applyQuaternion( camera.quaternion );
        // angle = vector.angleTo( target.position );

        // camera.lookAt( vector, 1, 1 );
        // camera.lookAt( 10, 10, 2 );

        console.log('vector', vector)
        console.log('camera.getWorldDirection( vector );', camera.getWorldDirection( vector ))

        // const controls = new OrbitControls(camera, renderer.domElement)
        // controls.enableDamping = true;
        // controls.autoRotate = true;

        const firstPersonControls = new FirstPersonControls(camera, renderer.domElement)


        function animate() {
            requestAnimationFrame( animate );

            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            firstPersonControls.update(0.2);

            renderer.render( scene, camera );
        };

        animate();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Three Dimensional Interaction</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={'hideBg'}>
                <IonButton
                    className="start-scan-button"
                    onClick={() => initThreeJS()}
                >
                    <IonIcon icon={scanOutline} slot="start" />
                    Start Interaction
                </IonButton>

            </IonContent>
        </IonPage>
    )
};

export default ThreeDimensionalInteraction;
