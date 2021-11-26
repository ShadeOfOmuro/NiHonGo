// Homepage Scripts begin here
import React from "react";
import { Text  , View , Button , Image , StyleSheet} from "react-native";
const DummyHomePage = ({navigation , route}) => {
    return (
        <View style={style.container}>
            <Button onPress={()=>alert("UID: " + String(route.params.uid) + " , USERNAME: " + String(route.params.username))} title="View Detail"></Button>
            <Button onPress={()=>navigation.goBack()} title="Back"></Button>
        </View>
    );
}

const style = StyleSheet.create({
    container : {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FFFFFF",
        flex : 1
    }
});
export default DummyHomePage;