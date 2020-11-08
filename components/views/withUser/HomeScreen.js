import * as React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase';
import Header from './Header';
import styles from './WithStyles';

export default class HomeScreen extends React.Component {
    //Kaldes på efter første render
    componentDidMount = () => {
        const { user } = firebase.auth();
        this.setState({ user });
    };
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    //Bruges til at kunne logge brugeren af
    handleLogOut = async () => {
        await firebase.auth().signOut();
    };
    //Hvad der bliver renderet i komponenten
    render() {
        return (
            <View style={[styles.mainContainer]}>
                <Header navigation={this.props.navigation} title="Wehlers"/>
                <View style={styles.imageContainer}>
                    <Image source={{uri: 'https://wehlers.com/wp-content/uploads/2018/10/press-16.jpg'}}
                           style ={{ width: '100%', height:'100%'}}/>
                </View>
                <View>
                    <TouchableOpacity onPress={this.handleLogOut} style={styles.button}>
                        <Text style={styles.buttonTitle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};
