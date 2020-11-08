import * as React from 'react';
import firebase from 'firebase';
import { createAppContainer } from "react-navigation";
import LoginView from "./components/views/withoutUser/LoginView";
import RegistrationView from "./components/views/withoutUser/RegistrationView";
import { createDrawerNavigator } from "react-navigation-drawer";
import StoryTelling from "./components/views/withUser/StoryTelling";
import HomeScreen from "./components/views/withUser/HomeScreen";
import { createStackNavigator} from "react-navigation-stack";
import Products from "./components/views/withUser/product/Products";
import ProductDetails from "./components/views/withUser/product/details/ProductDetails";
import BlockChain from './components/views/withUser/BlockChain';

//Her definerer vi en konstant reference til værdien LoginDrawerNavigator
//ved oprettelse af DrawerNavigator
const LoginDrawerNavigator = createDrawerNavigator( {
  Login: {
    screen:LoginView
  },
  Registration: {
    screen:RegistrationView
  },
});

//Her oprettes en AppContainer, som anvender reference "LoginDrawerNavigator"
//hvor vi laver en ny konstant reference LogNav
const LogNav = createAppContainer(LoginDrawerNavigator)

//Her oprettes en StackNavigator, som bliver wrappet ind i MyDrawerNavigator
const ProductNavigator = createStackNavigator(
    {
      Products: {
        screen: Products
      },
      Details: {
        screen: ProductDetails
      },
    },
    //Definerer hvilken skærm der skal vises først i stacken
    {
      initialRouteKey: 'Products'
    }
);

//Samme som ved LoginDrawerNavigator
const MyDrawerNavigator = createDrawerNavigator( {
  Home: {
    screen:HomeScreen
  },
  Story: {
    screen:StoryTelling
  },
  Blockchain: {
    screen: BlockChain
  },
  Products: {
    //Her bliver StackNavigator wrappet ind
    screen: ProductNavigator
  },
});

//Samme som ved LogNav
const MainNav = createAppContainer(MyDrawerNavigator)

export default class App extends React.Component {
  state = {user: null}
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }

  componentDidMount() {
//Config til firebase - oprettelse af forbindelse til DB
    const fireBaseConfig = {
      apiKey: "AIzaSyB59liEWBDP9WKIq5EcfSsVQOVd7rSwPck",
      authDomain: "aflevering2-5761a.firebaseapp.com",
      databaseURL: "https://aflevering2-5761a.firebaseio.com",
      projectId: "aflevering2-5761a",
      storageBucket: "aflevering2-5761a.appspot.com",
      messagingSenderId: "459136195084",
      appId: "1:459136195084:web:0144ad9c68987bf2bcac29"
    }

    
//Tilføjer nedestående if statement for at undgå at firebase bliver instantieret flere gange
    if (!firebase.apps.length) {
      firebase.initializeApp(fireBaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  render() {
    const {user} = this.state
//Kontrollere om brugeren er logget ind eller ej
//Hvis ikke, returnerer den referencen LogNav og dets views
//Ellers returnerer den referencen MainNav
    if (!user) {
      return (
          <LogNav/>
      )
    }
    else
    {
      return (<MainNav user={user}/>)
    };
  }
}
