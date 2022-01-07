import React , {Component} from 'react'
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"

class RegisterPage extends Component {
    state = {
        uid : -1,
        username : "",
        password : "",
        re_password : "",
        logged_in : false,
        false_password : false 
      }
    register = async () => {
        if (this.state.re_password == this.state.password) {
        try {
            console.log("connecting...")
            const response = await fetch('http://192.168.1.21:8000/register', {
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
            if (json.status != "-1") {
              await this.setState({uid : json.uid , username : json.username , logged_in : true,false_password : false});
              let payload  = {uid : this.state.uid , username : this.state.username}
              this.props.navigation.push("Login",payload);
            }
            else {
              await this.setState({false_password : true});
            }
            
          }
          catch(error) {
            await alert(error);
          }
        }
        else {
            await this.setState({false_password : true}); 
        }
    }
      render() {
  return (
    <NativeBaseProvider>
    <Center flex={1} px="3">
    <Box safeArea p="1" py="8" w="100%" maxW="300">
      <Heading
        size="md"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Register!
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="lg"
      >
        Enter fields below
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input onChangeText={(username)=> this.setState({username: username})}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={(password)=> this.setState({password: password})}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Re-Enter Password</FormControl.Label>
          <Input type="password" onChangeText={(re_password)=> this.setState({re_password: re_password})}/>
        </FormControl>
        <Text alignSelf="flex-start" mt={2} color='danger.700'>{ !this.state.false_password ? "" : "Username is taken or Password is incorrect" }</Text>
        <Button mt="2" colorScheme="indigo" onPress={()=>{this.register()}}>
          Register
        </Button>
        <HStack mt="6" justifyContent="center">
        </HStack>
      </VStack>
    </Box>
    </Center>
    </NativeBaseProvider>
  );
}
}

export{RegisterPage};