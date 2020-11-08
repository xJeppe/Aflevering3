import { StyleSheet } from 'react-native';

// Et styleSheet komponent, der exporteres og importeres til følgende views: LoginView og RegistrationView
export default StyleSheet.create({
    title: {
    },
    logo: {
        flex: 1,
        height: "50%",
        width: "60%",
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        color: 'white',
        backgroundColor: '#668098',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#4962dd',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    error: {
        color: 'red',
        marginLeft: 30,
        marginRight: 30
    }
})
