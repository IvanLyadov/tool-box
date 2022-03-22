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
import {usePhotoGallery, UserPhoto} from '../../services/hooks';
import {cameraOutline, trash, close, scanCircleOutline, stopCircleOutline, scanOutline} from "ionicons/icons";
import React, {useEffect, useState} from 'react';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import "./Scanner.css";


const Scanner: React.FC = () => {


    const [err, setErr] = useState<string>()
    const [hideBg, setHideBg] = useState("")

    const startScan = async () => {
        BarcodeScanner.hideBackground() // make background of WebView transparent
        setHideBg("hideBg")

        const result = await BarcodeScanner.startScan() // start scanning and wait for a result
        stopScan()

        // if the result has content
        if (result.hasContent) {
            console.log(result.content)
            const message = `<a href="http://www.google.com/search?q=${result.content!}">${result.content!}</a>`;
            present(message, [{text: 'OK', role: "cancel"}])
            // log the raw scanned content
        }
    }

    const stopScan = () => {
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
        setHideBg("")
    }

    const [present] = useIonAlert()

    useEffect(() => {
        // present('<a href="https://google.com" target="_blank">test</a>', [{text: 'OK', role: "cancel"}])
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({ force: true })

                if (status.granted) {
                    return true
                }

                return false
            } catch (error) {
                // @ts-ignore
                setErr(error.message)
                console.log(error)
            }
        }

        checkPermission()

        return () => {}
    }, [])

    if (err) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>QRScanner</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonRow>
                        <IonText color="danger">{err}</IonText>
                    </IonRow>
                </IonContent>
            </IonPage>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>QRScanner</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
                            <IonIcon icon={stopCircleOutline} slot="start" />
                            Stop Scan
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <div className="scanner-pointer">
                <div className="scanner-item"/>
            </div>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton onClick={() => startScan()} hidden={!!hideBg}>
                    <IonIcon icon={scanOutline} />
                </IonFabButton>
            </IonFab>

        </IonPage>
    )
};

export default Scanner;
