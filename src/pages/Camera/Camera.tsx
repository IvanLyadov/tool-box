import {
    IonActionSheet,
    IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader,
    IonIcon, IonImg,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {usePhotoGallery, UserPhoto} from '../../services/hooks';
import {cameraOutline, trash, close} from "ionicons/icons";
import React, { useState } from 'react';

const Camera: React.FC = () => {
    const { takePhoto, photos, deletePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Camera</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonGrid>
              <IonRow>
                  {photos.map((photo, index) => (
                      <IonCol size="6" key={index}>
                          <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                      </IonCol>
                  ))}
              </IonRow>
            </IonGrid>
        </IonContent>

          <IonFab vertical="bottom" horizontal="center" slot="fixed">
             <IonFabButton onClick={() => takePhoto()}>
                <IonIcon icon={cameraOutline} />
             </IonFabButton>
          </IonFab>
          <IonActionSheet
              isOpen={!!photoToDelete}
              buttons={[
                  {
                      text: 'Delete',
                      role: 'destructive',
                      icon: trash,
                      handler: () => {
                          if (photoToDelete) {
                              deletePhoto(photoToDelete);
                              setPhotoToDelete(undefined);
                          }
                      },
                  },
                  {
                      text: 'Cancel',
                      icon: close,
                      role: 'cancel',
                  },
              ]}
              onDidDismiss={() => setPhotoToDelete(undefined)}
          />
      </IonContent>
    </IonPage>
    );
};

export default Camera;
