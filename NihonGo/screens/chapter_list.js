import React , {Component} from 'react'
import {Text , Button , View , StyleSheet} from 'react-native'

class ChapterListPage extends Component {
    state = {
        chapterlist : []
    }
    componentDidMount() {
        this.Fetchchapters();
    }
    Fetchchapters = async () => {
        try {
            console.log("connecting...");
            const response = await fetch('http://192.168.1.12:8000/get_chapters', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  chapter_type : this.props.route.params.chapter_type
                })
              });
              const json = await response.json();
              this.setState({chapterlist : json });
              console.log(this.state.chapterlist);
            }
        catch(error) {
            alert(error);
        }
    }

    render() {
        return (
            <View style={style.container}>
                {this.state.chapterlist.map((chapter)=>
                    <View key={chapter[1]}>
                        <Button title={chapter[2]} onPress={()=>{this.props.navigation.push("Chapter",{
                            uid : this.props.route.params.uid,
                            username : this.props.route.params.username,
                            path_to_query : chapter[1] 
                        })}}/>
                    </View>
                )}
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
})

export default ChapterListPage