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
    backgroundColor: "#DA9E78",
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
    transform : [{translateX : -75}],
    marginBottom : 19
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
    top : 45
  },
  description_pics : {
    position : 'absolute',
    alignSelf : "center",
    top : 180,
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
    fontSize : 24,
    transform : [{translateY : 6}]
  },
  type_head : {
      transform : [{translateY : 10}],
      alignSelf : "center",
      position : "absolute"
  },
  question_box : {
    marginTop : 46,
    width: 275,
    height: 275,
    borderRadius: 25,
    backgroundColor: "#755038",
    justifyContent : "center",
    alignItems : "center"
  },
  question_text : {
      fontFamily : "Roboto-Bold",
      fontSize : 144,
      color : "#FFFFFF"
  },
  row : {
      marginTop : 25,
      flexDirection : "row",
      justifyContent : "space-between"
  },
  column : {
      flexDirection : "column",
      justifyContent : "space-between"
  },
  answer_box : {
    width: 120,
    height: 120,
    borderRadius: 25,
    backgroundColor: "#868686",
    justifyContent : "center",
    alignItems : "center"
  },
  answer_text : {
    fontFamily : "Roboto-Bold",
    fontSize : 32,
    color : "#FFFFFF"
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
class GamePage extends Component {
    route_storage = this.props.route.params;
    linker = this.props.navigation;
    fetch_quiz = async () => {
        try {
            console.log("connecting");
            const response = await fetch("http://192.168.1.21:8000/get_questions",{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "num_of_question": 1000,
                    "track": this.route_storage.track
                })   
            });
            const json = await response.json();
            console.log(json)
            await this.setState({
                quiz_payload : json,
                curr_question : json["0"]["word"],
                curr_choice_1 : json["0"]["choices"][0],
                curr_choice_2 : json["0"]["choices"][1],
                curr_choice_3 : json["0"]["choices"][2],
                curr_choice_4 : json["0"]["choices"][3],
                curr_question_num : 0,
                curr_correct_answer : json["0"]["key"]
            })
            return json;
        }
        catch {
            await alert("Error Fetching Quiz");
            return {};
        }
    }
    state = {
      fontLoaded : false,
      score_gained : 0,
      max_items : 1000,
      score_multiplier : 100,
      total_score : 0,
      curr_question : "",
      curr_correct_answer : 0,
      curr_choice_1 : "",
      curr_choice_2 : "",
      curr_choice_3 : "",
      curr_choice_4 : "",
      curr_question_num : 0,
      quiz_payload : this.fetch_quiz(),
      show_answer : false
    }
    next_question = (selected_choice) => {
        // if It's correct. He got point and go to the next question
        this.setState({show_answer : true});
        setTimeout(()=>{
            this.setState({show_answer : false})
            if(selected_choice == this.state.curr_correct_answer) {
                console.log("correct!");
                if(this.state.curr_question_num+1 < this.state.max_items) {
                    this.setState({
                        score_gained : this.state.score_gained + this.state.score_multiplier,
                        total_score : this.state.total_score + this.state.score_multiplier,
                        curr_question : this.state.quiz_payload[String(this.state.curr_question_num+1)]["word"],
                        curr_correct_answer : this.state.quiz_payload[String(this.state.curr_question_num+1)]["key"],
                        curr_choice_1 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][0],
                        curr_choice_2 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][1],
                        curr_choice_3 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][2],
                        curr_choice_4 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][3],
                        curr_question_num : this.state.curr_question_num + 1,
                    });
                    console.log("+100pt");
                }
                else {
                    console.log("+100pt");
                    this.setState({total_score : this.state.total_score + this.state.score_multiplier,score_gained : this.state.score_gained + this.state.score_multiplier});
                    console.log("migrating to result");
                    this.linker.push("QuizGameResult" ,{uid : this.route_storage.uid , username : this.route_storage.username , score : this.state.score_gained , type : "Game"})
                }
            }
            //If it's incorrect He will forced to go to the next question
            else {
                console.log("wrong! maybe next time");
                if(this.state.curr_question_num+1 < this.state.max_items) {
                    this.setState({
                        curr_question : this.state.quiz_payload[String(this.state.curr_question_num+1)]["word"],
                        curr_correct_answer : this.state.quiz_payload[String(this.state.curr_question_num+1)]["key"],
                        curr_choice_1 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][0],
                        curr_choice_2 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][1],
                        curr_choice_3 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][2],
                        curr_choice_4 : this.state.quiz_payload[String(this.state.curr_question_num+1)]["choices"][3],
                        curr_question_num : this.state.curr_question_num + 1,
                    });
                }
                else {
                    console.log("migrating to result");
                    // things to send to another page [credential and overall score]
                    this.linker.push("QuizGameResult" ,{uid : this.route_storage.uid , username : this.route_storage.username , score : this.state.score_gained , type : "Game"})
                }
            }
    
        },2000)

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
          <Image style={{ height: "100%", width: "100%", position: 'absolute',opacity : 0.4}} source={require('../assets/Images/Background2.png')} />
          <View style={style.nav_bar}>
            <View style={style.Hstack_wrapper}> 
              <Text style={style.nav_bar_text}>Item {this.state.curr_question_num+1} ({this.state.score_gained} points)</Text>
              <TouchableOpacity onPress={()=>{this.linker.push("QuizGameResult" ,{uid : this.route_storage.uid , username : this.route_storage.username , score : this.state.score_gained , type : "Game",num_items : this.state.curr_question_num})}}>
                <Image style={style.back_button} source={require("../assets/Images/BackButton.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
              <View style={style.question_box}>
                  <Text　style={style.question_text}>{this.state.curr_question}</Text>
              </View>
              <View style={style.row}>
                <TouchableOpacity onPress={()=>{this.next_question(1)}}>
                <View style={[style.answer_box,(this.state.show_answer)? (1 == this.state.curr_correct_answer)? {backgroundColor : "green"} : {backgroundColor : "red"} : {}]}>
                    <Text style={style.answer_text}>{this.state.curr_choice_1}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.next_question(2)}}>
                <View style={[style.answer_box,(this.state.show_answer)? (2 == this.state.curr_correct_answer)? {backgroundColor : "green"} : {backgroundColor : "red"} : {}]}>
                    <Text style={style.answer_text}>{this.state.curr_choice_2}</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={style.row}>
              <TouchableOpacity onPress={()=>{this.next_question(3)}}>               
              <View style={[style.answer_box,(this.state.show_answer)? (3 == this.state.curr_correct_answer)? {backgroundColor : "green"} : {backgroundColor : "red"} : {}]}>
                    <Text style={style.answer_text}>{this.state.curr_choice_3}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.next_question(4)}}>  
              <View style={[style.answer_box,(this.state.show_answer)? (4 == this.state.curr_correct_answer)? {backgroundColor : "green"} : {backgroundColor : "red"} : {}]}>
                    <Text style={style.answer_text}>{this.state.curr_choice_4}</Text>
                </View>
              </TouchableOpacity>
              </View>
          </ScrollView>
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

export{GamePage};