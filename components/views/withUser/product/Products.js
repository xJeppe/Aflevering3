import * as React from 'react'
import {View, FlatList} from 'react-native';
import firebase from 'firebase';
import ProductItems from "./details/ProductItems";

export default class Products extends React.Component {
    state = {
        products: {},
    };
    //Kaldes på efter første render
    componentDidMount() {
        firebase
            .database()
            //pathen hvor den skal hente data fra - her "/Products"
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({ products: snapshot.val() });
            });
    }

    handleSelectProduct = id => {
        this.props.navigation.navigate('Details', { id });
    };
    //Hvad der bliver renderet i komponenten
    render() {
        const { products } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!products) {
            return null;
        }
        // Flatlist forventer et array.
        // Derfor tager vi alle values fra vores prouducts objekt, og bruger som array til listen
        const productArray = Object.values(products);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const productKeys = Object.keys(products);
        return (
            <View>
                <FlatList
                    data={productArray}
                    // Vi bruger productKeys til at finde ID på det aktuelle produkt
                    // og returnerer dette som key, og giver det med som ID til ProductItems
                    keyExtractor={(item, index) => productKeys[index]}
                    renderItem={({ item, index }) => (
                        <ProductItems
                            product={item}
                            id={productKeys[index]}
                            onSelect={this.handleSelectProduct}
                        />
                    )}
                />
            </View>
        );
    }
}
