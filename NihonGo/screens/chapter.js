import React , {Component} from 'react'
import { Button , Text , View , StyleSheet } from 'react-native'

class ChapterPage extends Component {
    state = {
        datapayload : {}
    }
    data_gaining = async () => {
        try {
            console.log("connecting...")
            const response = await fetch('http://192.168.1.12:8000/get_chapter_data', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chapter_name : this.props.route.params.path_to_query
              })
            });
            const json = await response.json();
            console.log(json);
            this.setState({datapayload : json});
            }
        catch {
            alert("Something Error!");
        }
    }
    componentDidMount() {
        this.data_gaining();
    }
    render() {
        return(
            <View style={style.container}>
                <Text >Title : {this.state.datapayload['title']}</Text>
                <Text>Content : {this.state.datapayload['content']}</Text>
                <Button title="Back" onPress={()=>{this.props.navigation.goBack()}} />
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
export default ChapterPage;