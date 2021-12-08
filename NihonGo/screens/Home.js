import React , {Component} from 'react'
import {Text , Button , View , StyleSheet} from 'react-native'

class HomePage extends Component {
    route_storage = this.props.route.params;
    linker = this.props.navigation;
    render() {
        return (
            <View style={style.container}>
                <Button title="My Account" onPress={()=>{alert("userID : " + this.route_storage.username + '#' + String(this.route_storage.uid))}}/>
                <Button title="Study" onPress={()=>{this.linker.push("Study" ,{uid : this.route_storage.uid , username : this.route_storage.username})}}/>
                <Button title="LeaderBoard" onPress={()=>{this.linker.push("Leaderboard",{uid : this.route_storage.uid , username : this.route_storage.username})}}/>
                <Button title="Setting" onPress={()=>{this.linker.push("Setting",{uid : this.route_storage.uid , username : this.route_storage.username})}}/>
                <Button title="Back" onPress={()=>{this.linker.goBack()}}/>
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

export default HomePage;