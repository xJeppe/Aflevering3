import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import styles from './../../WithStyles';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class ProductDetails extends React.Component {
    // vi anvender state da data ikke er fast
    state = { product: null };

    state = {
        model: '',
        idNumber: '',
        year: '',
    };
    //Kaldes på efter første render
    componentDidMount() {
        // Vi udlæser ID fra navgation parametre og loader produktet når komponenten starter
        const id = this.props.navigation.getParam('id');
        this.loadProduct(id);
    }
    // loader data fra Firebase
    loadProduct = id => {
        firebase
            .database().ref(`/Products/${id}`).on('value', snapshot => {
            this.setState({ product: snapshot.val() });
        });
    };
    //Hvad der bliver renderet i komponenten
    render() {
        const { product } = this.state;
        if (!product) {
            return <Text>No data</Text>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Model</Text>
                    <Text style={styles.value}>{product.model}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Id Number</Text>
                    <Text style={styles.value}>{product.idNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Year</Text>
                    <Text style={styles.value}>{product.year}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#ffffff"
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>Transfer Ownership</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTitle}>Report Stolen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
