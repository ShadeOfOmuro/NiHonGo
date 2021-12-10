import React , {Component} from 'react'
import {View , Text , Button , StyleSheet} from 'react-native'

class LeaderBoardPage extends Component {
    state = {
        leaderboard_payload : {},
        usr_payload : {}
    }

    getting_data = async () => {
        try {
            console.log("connecting...")
            const response = await fetch('http://192.168.1.12:8000/leaderboard', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uid : this.props.route.params.uid
              })
            });
            const json = await response.json();
            console.log(json.leaderboard);
            this.setState({usr_payload : json.usr , leaderboard_payload : json.leaderboard});
        }
        catch {
            console.log("Network error!")
        }
    }
    componentDidMount() {
        this.getting_data();
    }
    render() {
        return (
            <View style = {style.container}>
                <Text>Username : {String(this.state.usr_payload.username)}</Text>
                <Text>your place : {String(this.state.usr_payload.place)}</Text>
                <Text>your score : {String(this.state.usr_payload.score)}</Text>
                <Button title="Back" onPress={()=>{this.props.navigation.goBack()}}/>
                {/* <Text>==========LEADERBOARD==========</Text>
                {this.state.leaderboard_payload[0].map((board,i)=>
                    <View key={board[0]}>
                        <Text>place : {i} Username : {board[1]} score : {board[2]}</Text>
                    </View>
                )} */}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container : {
        justifyContent : "center",
        alignItems : "center",
        flex : 1
    }
});

export default LeaderBoardPage;