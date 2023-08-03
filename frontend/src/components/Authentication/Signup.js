import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  position,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react"
import { Input, VStack } from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();


  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();

  const postDetails = (pics) => {
    setPicLoading(true);
    if(pics === undefined ) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return ;

    } 
    if(pics.type === "image/png" || pics.type === "image/jpeg" || pics.type === "image/jpg"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","chat-app");
      data.append("cloud_name","dlkpgjqvq");
      fetch("https://api.cloudinary.com/v1_1/dlkpgjqvq/image/upload",{
        method:"post",
        body:data,
      }).then((res)=>{
        res.json().then(data=> {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        }).catch((err)=> {
            console.log(err);
            setPicLoading(false);
        })
      })
    }
    else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return ;

    }
  };
  const submitHandler = async() => {
    setPicLoading(true);
    if(!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status:"warning",
        duration :5000,
        isClosable:true,
        position:"bottom",
      });
      setPicLoading(false);
      return ;
    }
    if(password !== confirmpassword) {
      toast({
        title: "Passwords do not Match",
        status:"warning",
        duration :5000,
        isClosable:true,
        position:"bottom",
      });
      return ;
    }
    try {
      const config = {
        headers: {
          "Content-type":"application/json",
        },
        
      }
      const {data} = await axios.post("/api/user",
      {name, email,password,pic},
      config 
      );
      toast({
        title: "Registration Successful",
        status:"success",
        duration :5000,
        isClosable:true,
        position:"bottom",
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    }
    catch(error){
      toast({
        title: "Error Occured!",
        description:error.reponse.data.message,
        status:"error",
        duration :5000,
        isClosable:true,
        position:"bottom",
      });
      setPicLoading(false);
    }
  };


  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
