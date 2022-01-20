import React , { Component } from 'react';
import {ImageBackground,SafeAreaView,View , Text , Image , ScrollView ,StyleSheet , TouchableOpacity} from 'react-native'
import * as Font from 'expo-font';
import { backgroundColor, transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

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
    backgroundColor: "#E99090",
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
  title_image : {
    marginTop : 22,
    alignItems : "flex-start",
    transform : [{translateX : -120}],
    marginBottom : 19
  },
  card1 : {
    backgroundColor : "#E07E47" ,
    borderRadius : 25,
    height : 250,
    width : "100%"
  },
  card2 : {
    backgroundColor : "#4DC6EC" ,
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
    top : 45
  },
  description_pics : {
    position : 'absolute',
    alignSelf : "center",
    top : 180,
    width : 213,
    height : 35
  },
  description_pics2 : {
    position : 'absolute',
    alignSelf : "center",
    top : 180,
    width : 187,
    height : 40
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
  type_head : {
      transform : [{translateY : 10}],
      alignSelf : "center",
      position : "absolute"
  },
  settingpill : {
    marginTop: 10,
    width: 316,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A1A1A1",
    justifyContent : "center",
    alignItems : "center",
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
class SettingPage extends Component {
  state = {
    fontLoaded : false
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

  componentDidMount() {
    this.loadFonts();
  }
  route_storage = this.props.route.params;
  linker = this.props.navigation;
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{flex : 1 , justifyContent : "center" , alignItems : "center" , backgroundColor : "#FEEFED"}}>
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
            <Image style={style.title_image} source={require("../assets/Images/Settings_t.png")} />
          </View>
          <ScrollView>
            <TouchableOpacity onPress={()=>{this.linker.push("Login")}}>
                <View style={style.settingpill}>
                    <Text style={{    color : "#FFFFFF",fontFamily : "Roboto-Bold",fontSize : 24}}>Logout</Text>
                </View>
            </TouchableOpacity>
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
                <TouchableOpacity >
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

export{SettingPage};