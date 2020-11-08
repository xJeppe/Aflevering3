import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 3,
        margin: 10,
        padding: 5,
        height: 45,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});

export default class ProductItems extends React.Component {
    handlePress = () => {
        // Her pakker vi ting ud fra props
        const {id, onSelect} = this.props
        // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
        onSelect(id)
    };
    //Hvad der bliver renderet i komponenten
    render() {
        const { product } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                <Text style={styles.label}>
                    {product.idNumber}
                </Text>
            </TouchableOpacity>
        );
    }
}
