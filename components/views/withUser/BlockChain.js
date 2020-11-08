import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,FlatList,Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from './Header';

export default class BlockChain extends React.Component{

    componentDidMount() {
        this.fetchData();
        
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    state={
        wehlersProducts:{}
    }

    /*Asynkront kald*/
    fetchData = async () =>{
        if(Platform.OS !== "web"){
            const url = 'http://13.69.31.213/wh/getall';

            try {
                /*Try'er to we can fetch, cant fetch on browser bcs cors*/
                const response =  await fetch(url);
                /*Await to parse when we have const response*/
                const jsonResponse = await response.json();
                /*Get JSON and parse*/
                const parsed = JSON.parse(jsonResponse.response);
                console.log("\n\n ------Results-----\n");

                const wehlersArray=[];

                /*Remember to spell Whelers correct from DB product 1 and 13 */
                for(let [index, product] of Object.entries(parsed)){

                    if(product.Record.product_brand === "Wehlers" || product.Record.product_brand === "Whelers" ){

                        product.Record.metadata = JSON.parse(product.Record.metadata)
                        wehlersArray.push(product)
                    }

                }

                this.setState({wehlersProducts:wehlersArray})

                /*Amount of products */
                console.log("Efter push til array antal:\n",wehlersArray.length);

                /*Use this one to output wehlers products */

                console.log("Wehlers produkter:\n",wehlersArray);

            }catch (e) {
                console.log("\n---FejlBesked---\n\n",e)
            }
        }else {
            alert('Denne applikation er kun til mobile enheder!')
        }


    };

  render(){
    const {wehlersProducts} = this.state;

    return(
        
        <View style={styles.container}>
            <Header navigation={this.props.navigation} title="BlockChain"/>
            <ScrollView
                data={wehlersProducts}
                keyExtractor={item => item.Key}
                renderItem={({item})=>(
                    <View>
                        <Text>Key: {item.Key}  </Text>

                        {/*Meta data loop*/}
                        <ScrollView
                            data={item.Record.metadata}
                            keyExtractor={item => item.event_timestamp}
                            renderItem={({item})=> (
                                <Text>
                                  Meta Event src: {item.event_src}
                                </Text>
                            )}
                        />
                        <Text>Produkt id:  {item.Record.product_id}</Text>
                        <Text>Product time: {item.Record.product_time}</Text>
                        <Text>Product_brand: {item.Record.product_brand} {"\n"}</Text>
                    </View>
            )}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      padding:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});