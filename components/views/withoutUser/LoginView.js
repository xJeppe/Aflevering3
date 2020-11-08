import * as React from 'react';
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styles from "./WithoutStyles";
import Header from "./Header";
import firebase from 'firebase';

export default class LoginView extends React.Component {
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    // vi anvender state da data ikke er fast (dvs. det ændrer sig afhængig af hvem der logger ind)
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };
    //setStates der bliver kaldt på
    startLoading = () => this.setState({isLoading: true});
    endLoading = () => this.setState({isLoading: false});
    setError = errorMessage => this.setState({errorMessage});
    clearError = () => this.setState({errorMessage: null});

    handleChangeEmail = email => this.setState({email});
    handleChangePassword = password => this.setState({password});
    // Kalder async på DB, så man ikke skal vente på svar
    handleSubmit = async () => {
        const {email, password} = this.state;
        try {
            this.startLoading();
            this.clearError();
            // Kontrollere om det indtastede eksisterer i DB
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({isCompleted: true});
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
            this.setError(error.message);
            this.endLoading();
        }
    };
    //Hvad der bliver renderet i komponenten
    render = () => {
        const {errorMessage, email, password, isCompleted} = this.state;
        if (isCompleted) {
            return <Text>You are now logged in</Text>;
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title="Login"/>
                <Image
                    style={styles.logo}
                    source={{uri: 'https://wehlers.com/wp-content/uploads/2018/10/press-16.jpg'}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#ffffff"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    value={password}
                    onChangeText={this.handleChangePassword}
                />
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
            </View>
        );
    };

    //Props der bruges til at submittede det indtastede til DB
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
    };
}
