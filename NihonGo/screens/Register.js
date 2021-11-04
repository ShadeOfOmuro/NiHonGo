// Register Scripts begin here
import React from "react";
import { Text  , View , Button , Image , StyleSheet} from "react-native";
const DummyRegisterPage = ({navigation}) => {
    return (
        <View style={style.container}>
            <Text>
                This is the register page!
            </Text>
            <Button onPress={()=>navigation.navigate("Home")} title="Go to Home Page"></Button>
            <Button onPress={()=>navigation.navigate("Login")} title="Go to Login Page"></Button>
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
export default DummyRegisterPage;