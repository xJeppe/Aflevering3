import { StyleSheet } from 'react-native';

// Et styleSheet komponent, der exporteres og importeres til følgende views: HomeScreen, Products, StoryTelling
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    imageContainer:{
        height: 400,
        width: 450,
        alignItems: 'center'
    },
    storyContainer:{
        height: 460,
        width: 374,
        alignItems: 'center'
    },
    txt:{
        width: '100%',
        textAlign:'center',
        fontSize:16,
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
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
        fontWeight: "bold",
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: {
        width: 100,
        fontWeight: 'bold',
        justifyContent: "center"
    },
    value: {
        flex: 1
    },
});
