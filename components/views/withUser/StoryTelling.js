import * as React from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import Header from "./Header";
import styles from "./WithStyles";

export default class StoryTelling extends React.Component {
    //Hvad der bliver renderet i komponenten
    render() {
        return(
            <View style={styles.mainContainer}>
                <Header navigation={this.props.navigation} title="Product Story"/>
                <Text style={styles.txt}>Search to see the story of the product</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='SR50915623'
                        placeholderTextColor="#ffffff"
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTitle}>Search</Text>
                    </TouchableOpacity>
                    <Text> </Text>
                </View>
                <View style={styles.storyContainer}>
                    <Image source={require('../../../assets/StoryMap.png')}
                           style ={{ width: '90%', height:'90%'}}/>
                </View>
            </View>
        )
    }
}

