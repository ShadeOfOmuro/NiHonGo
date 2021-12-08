import React , {Component} from 'react'
import {View , Text , Button , StyleSheet} from 'react-native'
class SettingPage extends Component {
    render() {
        return(
            <View style={style.container}>
                <Text>Logged in as {this.props.route.params.username}#{this.props.route.params.uid}</Text>
                <Button title="Logout" onPress={() => {this.props.navigation.push("Login")}} />
                <Button style = {style.button} onPress={()=>this.props.navigation.goBack()} title="Back"></Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container : {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FFFFFF",
        flex : 1
    }
});

export default SettingPage;