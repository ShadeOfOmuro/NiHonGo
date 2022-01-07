import React , {Component} from 'react'
import {Text , Button , View , StyleSheet} from 'react-native'

class QuizGameResult extends Component {
    route_storage = this.props.route.params;
    linker = this.props.navigation;
    clearscore = async () => {
        try {
            console.log("connecting");
            const response = await fetch("http://192.168.1.21:8000/update_score",{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": this.route_storage.uid,
                    "score": this.route_storage.score
                })   
            });
            const json = await response.json();
            console.log(json);
        }
        catch {
            await alert("Error Assigning Score");
        }
        
        await this.linker.push("Homepage",this.route_storage);
    }
    render() {
        return (
            <View style={style.container}>
                <Text>Type : {this.route_storage.type}</Text>
                <Text>{this.route_storage.score/100} Out of 10</Text>
                <Text>Score Gained : {this.route_storage.score}</Text>
                <Button title="Back" onPress={()=>{this.clearscore()}}/>
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
})
export{QuizGameResult};