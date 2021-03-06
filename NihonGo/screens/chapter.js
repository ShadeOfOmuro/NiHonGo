import React , { Component } from 'react';
import {ImageBackground,SafeAreaView,View , Text , Image , ScrollView ,StyleSheet , TouchableOpacity} from 'react-native'
import * as Font from 'expo-font';
import { backgroundColor, transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { minHeight } from 'styled-system';

const style = StyleSheet.create({
  bottom_nav_bar : {
    width: 330,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom : 10
  },
  wrap_icon : {
    width: "80%",
    flex : 1,
    flexDirection : "row",
    marginHorizontal : 27,
    alignItems : "baseline" ,
    justifyContent : "space-between",
    transform : [{translateY : 13}],
  },
  nav_bar : {
    justifyContent : "flex-end",
    width: "100%",
    height: 95,
    backgroundColor: "#74ADD2",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1
  },
  cardwrapper : {
    height : 264,
    width : 250,
    marginVertical : 10
  },
  title_text : {
    marginTop : 22,
    alignItems : "center",
    transform : [{translateX : -60}],
    marginBottom : 19,
    fontSize : 36,
    width : "100%",
    fontFamily : "Roboto-Bold"
  },
  card1 : {
    backgroundColor : "#F0C34E" ,
    borderRadius : 25,
    height : 250,
    width : "100%"
  },
  card2 : {
    backgroundColor : "#9B2F2F" ,
    borderRadius : 25,
    height : 250,
    width : "100%"
  },
  card3 : {
    backgroundColor : "#D46BBD" ,
    borderRadius : 25,
    height : 250,
    width : "100%"
  },
  button_card : {
    alignSelf : "center",
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DB6B6B"
  },
  button_card_text : {
    alignSelf : "center",
    justifyContent :"center",
    color : "#FFFFFF",
    fontFamily : "Roboto-Bold",
    fontSize : 24,
    transform : [{translateY : 7}]
  },
  Button_padder : {
    transform : [{translateY : 220}]
  },
  banner_pics : {
    position : 'absolute',
    alignSelf : "center",
    top : 20
  },
  description_pics : {
    position : 'absolute',
    alignSelf : "center",
    top : 170,
    width : 213,
    height : 35
  },
  Hstack_wrapper : {
    flexDirection : "row",
    justifyContent : "space-between",
    marginHorizontal : 10
  },
  nav_bar_text : {
    marginHorizontal : 10,
    fontFamily : "Roboto-Bold",
    fontSize : 18,
    transform : [{translateY : 12}]
  },
  row_wrap : {
      justifyContent : "center",
      alignItems : "center"
  },
  pills : {
    width: 250,
    height: 80,
    borderRadius: 25,
    backgroundColor: "#DB6B6B",
    justifyContent : "center",
    alignItems : "center",
    marginVertical : 10
  },
  text_container : {
      width : "100%",
      width: 315,
      borderRadius: 25,
      backgroundColor: "#74ADD2",
      maxHeight : 9999,
      minHeight : 256
  },
  content : {
      padding : 10,
      fontFamily : "Roboto-Bold",
      fontSize : 16,
      color : "#000000"
  }
});

class CustomButton extends Component {
  render() {
    return(
      <View style={this.props.style}>
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={style.button_card}>
          <Text style={style.button_card_text}>Start</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}
class ChapterPage extends Component {
  state = {
    fontLoaded : false,
    datapayload : {}
  }
  async loadFonts() {
    await Font.loadAsync({
      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Roboto-Bold': {
        uri: require('../assets/fonts/Roboto-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Roboto-Regular': {
        uri: require('../assets/fonts/Roboto-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      }
    });
    this.setState({ fontsLoaded: true });
  }

    data_gaining = async () => {
        try {
            console.log("connecting...")
            const response = await fetch('http://192.168.1.21:8000/get_chapter_data', {
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
      this.loadFonts();
      this.data_gaining();
  }
  route_storage = this.props.route.params;
  linker = this.props.navigation;
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{flex : 1 , justifyContent : "center" , alignItems : "center" , backgroundColor : "#FFFFFF"}}>
          <Image style={{ height: "100%", width: "100%", position: 'absolute',opacity : 0.4}} source={require('../assets/Images/Background3.png')} />
          <View style={style.nav_bar}>
            <View style={style.Hstack_wrapper}> 
            <Image source={require("../assets/Images/jp_flag.png")} style={{width : 40,height:40,borderRadius:400/2}}/>
              <Text style={style.nav_bar_text}>Welcome, {this.route_storage.username}</Text>
              <TouchableOpacity onPress={()=>{this.linker.goBack()}}>
                <Image style={style.back_button} source={require("../assets/Images/BackButton.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.row_wrap}>
            <Text style={style.title_text}>{this.state.datapayload['title']}</Text>
          </View>
          <ScrollView>
              <View style={style.text_container}>
                <Text style={style.content}>{this.state.datapayload['content']}</Text>
              </View>
          </ScrollView>
          <View>
          <View style={style.bottom_nav_bar}>
              <View style={style.wrap_icon}>
                <TouchableOpacity onPress={()=>{this.linker.push("Homepage",{uid : this.route_storage.uid , username : this.route_storage.username})}}>
                  <Image source={require('../assets/Images/home.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.linker.push("GameSelect",{uid : this.route_storage.uid , username : this.route_storage.username})}}>
                  <Image source={require('../assets/Images/games.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.linker.push("Leaderboard",{uid : this.route_storage.uid , username : this.route_storage.username})}}>
                  <Image source={require('../assets/Images/leaderboard.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.linker.push("Setting",{uid : this.route_storage.uid , username : this.route_storage.username})}}>
                  <Image source={require('../assets/Images/settings.png')}/>
                </TouchableOpacity>
              </View>
              <View style={style.wrap_icon}>
              </View>
            </View>
          </View>
          </View>
      );
    }
    else {
      return (
        <Text>Loading</Text>
        );
    }
  }
}

export{ChapterPage};