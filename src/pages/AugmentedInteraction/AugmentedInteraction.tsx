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
    addCircle
} from "ionicons/icons";
import React, {useEffect, useState} from 'react';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';



const AugmentedInteraction: React.FC = () => {
    const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0})
    const [accelerationIncludingGravity, setAccelerationIncludingGravity] = useState({x: 0, y: 0, z: 0})
    const [rotationRate, setRotationRate] = useState({alpha: 0, beta: 0, gamma: 0})
    const [test, setTest] = useState(0);
    const [interval, setInterval] = useState(0);

    let accelHandler: PluginListenerHandle;

    const initInteraction = () => {
        // Stop the acceleration listener
        const stopAcceleration = () => {
            if (accelHandler) {
                accelHandler.remove();
            }
        };

        // Remove all listeners
        const removeListeners = () => {
            Motion.removeAllListeners();
        };
    }

    const initAccel = async () => {
        // Once the user approves, can start listening:
        accelHandler = await Motion.addListener('accel', event => {
            setAccelData(event.acceleration);
            setAccelerationIncludingGravity(event.accelerationIncludingGravity);
            setRotationRate(event.rotationRate);
            setInterval(event.interval);
            console.log('Device motion event:', event);
        });
    }

    const permissionRequest = () => {
        if ( window.DeviceMotionEvent && typeof (window.DeviceMotionEvent as any).requestPermission === 'function' ){
            (window.DeviceMotionEvent as any).requestPermission();
        }
    }

    const handleClick = () => {
        setTest(Math.random())
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>World interaction</IonTitle>
                    <div>
                        <div>Acceleration</div>
                        <div>x: {accelData.x} </div>
                        <div>y: {accelData.y} </div>
                        <div>z: {accelData.z} </div>
                    </div>
                </IonToolbar>
                <br/>
                <IonToolbar>
                    <div>
                        <div>Acceleration Including Gravity</div>
                        <div>x: {accelerationIncludingGravity.x} </div>
                        <div>y: {accelerationIncludingGravity.y} </div>
                        <div>z: {accelerationIncludingGravity.z} </div>
                    </div>
                </IonToolbar>
                <br/>
                <IonToolbar>
                    <div>
                        <div>Rotation Rate</div>
                        <div>alpha: {rotationRate.alpha} </div>
                        <div>beta: {rotationRate.beta} </div>
                        <div>gamma: {rotationRate.gamma} </div>
                    </div>
                </IonToolbar>
                <br/>
                <div>interval: {interval}</div>
                <br/>
                <span>test: {test}</span>
            </IonHeader>
            <IonContent className={'hideBg'}>
                <IonButton
                    className="start-scan-button"
                    onClick={() => console.log('test')}
                >
                    <IonIcon icon={scanOutline} slot="start" />
                    Start Interaction
                </IonButton>
                <IonButton
                    className="start-scan-button"
                    onClick={() => permissionRequest()}
                >
                    <IonIcon icon={addCircle} slot="start" />
                    Init Permission
                </IonButton>
                <IonButton
                    className="start-scan-button"
                    onClick={() => initAccel()}
                >
                    <IonIcon icon={addCircle} slot="start" />
                    Init Interaction
                </IonButton>
                <IonButton
                    className="start-scan-button"
                    onClick={() => handleClick()}
                >
                    <IonIcon icon={addCircle} slot="start" />
                    Handle Test
                </IonButton>
            </IonContent>
        </IonPage>
    )
};

export default AugmentedInteraction;
