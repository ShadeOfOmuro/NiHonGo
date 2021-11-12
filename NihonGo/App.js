import React , {Component} from 'react';
import { NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,HStack} from 'native-base';

class LoginPage extends Component {
  state = {
    uid : -1,
    username : "",
    password : "",
    logged_in : false,
    false_password : false 
  }
  login = async () => {
    try {
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
    }
    else {
      await this.setState({false_password : true});
    }
    
  }
  catch(error) {
    await alert(error);
  }
  }
  render () {
    return (
      <NativeBaseProvider>
      <Box
        safeArea
        flex={1}
        p={2}
        w="90%"
        mx='auto'
      >
        <Heading size="lg" color='primary.500'>
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Username
            </FormControl.Label>
            <Input onChangeText={(username)=> this.setState({username: username})}/>
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Password
            </FormControl.Label>
            <Input type="password" onChangeText={(password)=> this.setState({password: password})}/>
            <Text alignSelf="flex-start" mt={2} color='danger.700'>{ !this.state.false_password ? "" : "Username or Password is incorrect" }</Text>
            {/* <Link
              _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
              alignSelf="flex-end"
              mt={-5}
            >
              Forget Password?
            </Link> */}
          </FormControl>
          <VStack space={2}>
            <Button colorScheme="cyan" _text={{ color: 'white' }} onPress={()=>this.login()}>
              Login
            </Button>
          </VStack>
          <HStack justifyContent="center" >
            <Text fontSize='sm' color='muted.700' fontWeight={400}>Logged in : {String(this.state.logged_in)}</Text>
          </HStack>
          <HStack justifyContent="center" >
            <Text fontSize='sm' color='muted.700' fontWeight={400}>Uid : {String(this.state.uid)}</Text>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
    );
  }
}

export default LoginPage;