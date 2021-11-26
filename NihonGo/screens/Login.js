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

class LoginPage extends Component{
    state = {
        uid : -1,
        username : "",
        password : "",
        logged_in : false,
        false_password : false 
      }
      login = async () => {
        try {
        console.log("connecting...")
        const response = await fetch('http://192.168.1.12:8000/login', {
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
  render() {
  return (
    <NativeBaseProvider>
    <Center flex={1} px="3" backgroundColor="#FFF">
    <Box safeArea p="1" py="8" w="100%" maxW="300">
      <Heading
        size="md"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Welcome!
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
        Sign in to start learning!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input  onChangeText={(username)=> this.setState({username: username})} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={(password)=> this.setState({password: password})}/>
        </FormControl>
        <Text alignSelf="flex-start" mt={2} color='danger.700'>{ !this.state.false_password ? "" : "Username or Password is incorrect" }</Text>
        <Button mt="1" colorScheme="indigo" onPress={()=>this.login()} >
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="md"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            newbie here ? {" "}
          </Text>
          <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "md",
            }}
            onPress={()=>this.props.navigation.navigate("Register")}
          >
            Register
          </Link>
        </HStack>
      </VStack>
    </Box>
    </Center>
    </NativeBaseProvider>
  );
}
}


export default LoginPage;