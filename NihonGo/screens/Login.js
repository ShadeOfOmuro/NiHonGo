// Login Scripts begin here
import React from "react";
import { Text  , View , Button , Image , StyleSheet} from "react-native";
const DummyLoginPage = ({navigation}) => {
    return (
        <View style={style.container}>
            <Text>
                This is the login page!
            </Text>
            <Button onPress={()=>navigation.navigate("Register")} title="Go to Register Page"></Button>
            <Button onPress={()=>navigation.navigate("Home")} title="Go to Home Page"></Button>
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
export default DummyLoginPage;