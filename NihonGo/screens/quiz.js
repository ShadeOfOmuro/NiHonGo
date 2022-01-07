import React , {Component} from 'react';
import {Button ,Text , View , StyleSheet} from 'react-native'

class QuizPage extends Component {
    
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
                    "num_of_question": 10,
                    "track": "mix"
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
        score_gained : 0,
        max_items : 10,
        score_multiplier : 100,
        total_score : 0,
        curr_question : "",
        curr_correct_answer : 0,
        curr_choice_1 : "",
        curr_choice_2 : "",
        curr_choice_3 : "",
        curr_choice_4 : "",
        curr_question_num : 0,
        quiz_payload : this.fetch_quiz()
    }
    route_storage = this.props.route.params;
    linker = this.props.navigation;
    next_question = (selected_choice) => {
        // if It's correct. He got point and go to the next question
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
                this.linker.push("QuizGameResult" ,{uid : this.route_storage.uid , username : this.route_storage.username , score : this.state.score_gained , type : "quiz"})
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
                this.linker.push("QuizGameResult" ,{uid : this.route_storage.uid , username : this.route_storage.username , score : this.state.score_gained , type : "quiz"})
            }
        }
    }
    
    render() {
        return (
            <View style={style.container}>
                <Text>{this.state.curr_question_num+1}) {this.state.curr_question}</Text>
                <Button title={this.state.curr_choice_1} onPress={()=>{this.next_question(1)}}/>
                <Button title={this.state.curr_choice_2} onPress={()=>{this.next_question(2)}}/>
                <Button title={this.state.curr_choice_3} onPress={()=>{this.next_question(3)}}/>
                <Button title={this.state.curr_choice_4} onPress={()=>{this.next_question(4)}}/>
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

export{QuizPage};