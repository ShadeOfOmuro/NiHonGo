// importing modules

import React , { Component } from 'react';
import {SafeAreaView ,Text , View , StyleSheet, TextInput , Image , ImageBackground, TouchableOpacity ,KeyboardAvoidingView} from 'react-native'
import * as Font from 'expo-font';
// styling

const style = StyleSheet.create({
  container : {
    width : "100%",
    height : "100%",
    resizeMode : "cover",
    alignItems : "center",
  },
  wrapper : {
    flex : 1,
    marginLeft : 21,
    marginRight : 21,
    justifyContent : 'flex-start'
  },
  login_logo : {
    height : 90,
    width : 316,
    marginTop : 100
  },
  label_username : {
    marginTop : 20,
    width : 316,
    height: 30,
    fontSize : 24,
    fontFamily : 'Roboto-Bold'
  },
  LoginBox : {
    width: 316,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    paddingLeft : 10,
    fontFamily : 'Roboto-Regular',
    fontSize : 18,
    marginTop : 7
  },
  submitbutton : {
    width: 222,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D94343",
    marginTop : 20,
    justifyContent : "center",
    alignItems : "center"
  },
  submit_text : {
    color: "#FFFFFF",
    fontSize : 24,
    fontFamily : "Roboto-Bold",
  },
  err_text :  {
    color : "red",
    marginTop : 5
  },
  register_text : {
    marginTop : 10,
    color : "#00308E",
    fontFamily : "Roboto-Bold"
  }
});
class LoginPage extends Component { 
  route_storage = this.props.route.params;
  linker = this.props.navigation;
  state = {
    fontsLoaded: false,
    uid : -1,
    username : "",
    password : "",
    logged_in : false,
    false_password : false 
  };

  login = async () => {
    try {
    console.log("connecting...")
    const response = await fetch('http://192.168.1.21:8000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.username != "not found") {
      await this.setState({uid : json.uid , username : json.username , logged_in : true,false_password : false});
      let payload  = {uid : this.state.uid , username : this.state.username}
      this.props.navigation.push("Homepage",payload);
    }
    else {
      await this.setState({false_password : true});
    }
    
  }
  catch(error) {
    await alert(error);
  }
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
  // Rendering the page
  render() {
    if (this.state.fontsLoaded) {
    return (
      <SafeAreaView>
        <ImageBackground style={style.container} source={require('../assets/Images/Background.png')}>
          <View style={style.wrapper} >
            <Image style={style.login_logo} source={require('../assets/Images/LoginLogo.png')}/>
            <Text style={style.label_username}>Username</Text>   
            <TextInput onChangeText={(username)=> this.setState({username: username})} style={style.LoginBox}/>
            <Text style={style.label_username}>Password</Text>   
            <TextInput secureTextEntry={true} onChangeText={(password)=> this.setState({password: password})} style={style.LoginBox} />
            <Text style={style.err_text}>{(this.state.false_password)? "Your password is incorrect!" : "" }</Text> 
            <View style={{alignItems:"center"}}>
              <TouchableOpacity  onPress={()=>{this.login()}}>
                <View title="Confirm" style={style.submitbutton}>
                  <Text style={style.submit_text}>Confirm</Text>  
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.linker.push("Register")}}>
                <Text style={style.register_text}>No account? register</Text>   
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>  
      </SafeAreaView>
    );
  }
  else {
    return (<Text>Loading</Text>);
  }
}
}


export{LoginPage};