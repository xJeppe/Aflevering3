import React,{Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Header extends Component {
    //Prop der bruges til vores DrawerNavigator når man trykker på iconet dertil
    handleNavigation = () =>{
        this.props.navigation.openDrawer()
    }
    //Hvad der bliver renderet i komponenten
    render() {
        //Sætter title som en props, så den kan bruges
        const {title}= this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={this.handleNavigation}>
                    <MaterialCommunityIcons name="menu-open" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txt}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-around',
        paddingTop:40,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    icon:{
        width:'14%',
        height: '28%',
        display: 'flex',
        justifyContent: 'flex-end',

    },
    txt:{
        width: '75%',
        textAlign:'center',
        fontSize:40,
        paddingRight:66
    },
})
