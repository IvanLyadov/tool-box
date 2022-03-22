import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import {
    calendar,
    personCircle,
    map,
    informationCircle,
    scanCircleOutline,
    homeOutline,
    albumsOutline
} from 'ionicons/icons';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Camera from "./pages/Camera/Camera";
import Scanner from "./pages/Scanner/Scanner";
import AugmentedInteraction from "./pages/AugmentedInteraction/AugmentedInteraction";
import ThreeDimensionalInteraction from "./pages/ThreeDimantionalInteraction/ThreeDimensionalInteraction";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
          <IonRouterOutlet>
              <Route exact path="/home">
                  <Home />
              </Route>
              <Route exact path="/">
                  <Redirect to="/home" />
              </Route>
              <Route exact path="/camera">
                  <Camera />
              </Route>
              <Route exact path="/scanner">
                  <Scanner />
              </Route>
              {/*<Route exact path="/ar">*/}
              {/*    <AugmentedInteraction />*/}
              {/*</Route>*/}
              {/*<Route exact path="/three-dimensional-interaction">*/}
              {/*    <ThreeDimensionalInteraction />*/}
              {/*</Route>*/}
          </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="camera" href="camera">
            <IonIcon icon={personCircle} />
            <IonLabel>Camera</IonLabel>
          </IonTabButton>

            <IonTabButton tab="scanner" href="scanner">
                <IonIcon icon={scanCircleOutline} />
                <IonLabel>QR Code</IonLabel>
            </IonTabButton>

          {/*<IonTabButton tab="ar" href="ar">*/}
          {/*  <IonIcon icon={albumsOutline} />*/}
          {/*  <IonLabel>Interaction</IonLabel>*/}
          {/*</IonTabButton>*/}

          {/*<IonTabButton tab="three-dimensional-interaction" href="three-dimensional-interaction">*/}
          {/*  <IonIcon icon={informationCircle} />*/}
          {/*  <IonLabel>3D interaction</IonLabel>*/}
          {/*</IonTabButton>*/}
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
