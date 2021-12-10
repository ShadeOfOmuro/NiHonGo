import React , {Component} from 'react'
import {View , StyleSheet , Text , Button} from 'react-native'

class StudyPage extends Component {

    render() {
        return (
            <View style={style.container}>
                <Button title="Hiragana" onPress={()=>{
                this.props.navigation.push("Study_List",{
                    uid : this.props.route.params.uid ,
                    username : this.props.route.params.username,
                    chapter_type : "hiragana"
                })}}/>
                <Button title="katakana" onPress={()=>{
                this.props.navigation.push("Study_List",{
                    uid : this.props.route.params.uid ,
                    username : this.props.route.params.username,
                    chapter_type : "katakana"
                })}}/>
                <Button title="Back" onPress={()=>{this.props.navigation.goBack()}} />
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
export default StudyPage;