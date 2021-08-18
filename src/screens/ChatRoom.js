// @refresh state
import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput, Image, KeyboardAvoidingView, Alert, Text, TouchableOpacity, LogBox, YellowBox } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat } from "react-native-gifted-chat";
// import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase'
import 'firebase/firestore'
import database from '@react-native-firebase/firestore';

import Login from "../components/Login";
import Background from '../components/Background'
// import { db, auth } from '../firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCfmmo2ZapbXKxdbbx4xRVN5YZMHo-ehZY",
  authDomain: "chat-app-34d87.firebaseapp.com",
  projectId: "chat-app-34d87",
  storageBucket: "chat-app-34d87.appspot.com",
  messagingSenderId: "380142425991",
  appId: "1:380142425991:web:bd3f87b9f7fb991f5de522"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatCollectionRef = db.collection('chats');

const ChatRoom = ({ navigation }) => {

  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getData();
    chatCollectionRef.get()
      .then(snapshot => {
        let documents = querySnapshot.docs.map(doc => doc.data())
        console.log('documents: ', documents)
        // do something with documents
      })
    // setMessages(documents)
    // setMessagesr
  }, []);

  useLayoutEffect(() => {
    const unsubscribe =
      chatCollectionRef
        .orderBy('createdAt', 'desc')
        // .doc('messagesStack')
        .onSnapshot(
          snapshot =>
            setMessages(
              snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
              })
              )
            )
        )
    return unsubscribe

    // const subscriber = firestore()
    // chatCollectionRef
    //   .doc('messagesStack')
    //   .onSnapshot(msg => {
    //     console.log(msg.data());
    //   });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
  }), []

  // useEffect(() => {
  //   getData()
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  //   return
  // }, [])
  // useEffect(() => {
  //   getData()
  //   const unsubscribe = chatCollectionRef.onSnapshot(querySnapshot => {
  //     const messagesFirestore =
  //       querySnapshot.docChanges().filter(({ type }) => type === 'added')
  //         .map(({ doc }) => {
  //           const message = doc.data()
  //           return { ...message, createdAt: message.createdAt.toDate() }
  //         })
  //         .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  //     appendMessages(messagesFirestore)
  //   })
  //   return () => unsubscribe()
  // }, []);
  // const handleSend = async (messages) => {
  //   const messagesStack = messages.map(m => chatCollectionRef.add(m))
  //   await Promise.all(messagesStack)
  //   console.log('appendMessages: ', messagesStack)
  //   console.log('handleSend user: ', user)
  // }

  // const fetch = () => {
  //   database().collection('chats').doc('messagesStack')
  //     .get()
  //     .then((messages) => {
  //       const messagesStack = messages.map(m => chatCollectionRef.add(m))
  //       Promise.all(messagesStack)
  //     })
  //     .catch(err => {
  //       console.log('Error getting documents', err);
  //     });
  // }


  const appendMessages = useCallback((messages) => {
    setMessages(previousMessages => GiftedChat.
      append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    chatCollectionRef
      .doc('messagesStack')
      .update({ _id, createdAt, text, user })
      // .update({
      //   messages: db.FieldValue.arrayUnion({ _id, createdAt, text, user })
      // })
      .then(console.log('messages: ', messages))
  }, [messages])

  const storeData = async () => {
    try {
      console.log('storeData user: ', user);
      const avatar = `https://placeimg.com/${rand1}/${rand2}/any`
      setAvatarURL(avatar)
      const _id = Math.random().toString(36).substring(4)
      const user = { _id, name, avatar }
      await AsyncStorage.setItem('user', JSON.stringify(user))
        .then(() => {
          console.log('AsyncStorage user: ', user),
            setUser(getData)
        })

      // setUser(user)
    } catch (e) { console.error('Error: ', e) }
  }

  const getData = async () => {
    try {
      fetch()
      const user = await AsyncStorage.getItem('user')
      console.log('getData user: ', user)
      if (user) {
        setUser(JSON.parse(user))
      }
      if (!user) {
        return <View style={styles.container}> </View>
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  useEffect(() => {
    name.length > 3 && setActive(true);
  }, [name]);

  if (!user) {
    return (
      <Background style={styles.container}>
        <Image
          resizeMode="contain"
          style={{ flex: 1, marginTop: 100 }}
          source={require("../assets/tictuk-logo.png")}
        />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Input
            onChangeText={text => setName(text)}
            onSubmitEditing={() => { name.length > 3 ? setActive(true) : setActive(false) }}
            rightIcon={{ type: 'font-awesome', name: 'chevron-right', size: 20, color: '#888' }}
            value={name}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ borderColor: "#888", borderBottomWidth: 1, fontSize: 22, textAlign: "center", marginVertical: 20 }}
            placeholder="Enter username"
            leftIcon={
              <Icon
                name='user'
                size={20}
                color='#888'
              />}
          />
          <View style={styles.button}>
            <TouchableOpacity
              // disabled={active}
              onPress={(username) => {
                active ?
                  storeData()
                  // storeData(username)
                  : Alert.alert('Invalid User!', 'Please enter your name.')
              }}
            >
              <LinearGradient
                colors={active ? ['#08d4c4', '#01ab9d'] : ['#ccc', '#bbb']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Join Chat</Text>
                <MaterialIcons
                  name="navigate-next"
                  color="#fff"
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
            {name.length > 3 ? null : <CustomAlert />}
            {/* <Login /> */}
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" />
      </Background>
    );
  }
  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={appendMessages}
      showAvatarForEveryMessage={true}
      user={user}
    />
    // {Platform.OS === "android" && (<KeyboardAvoidingView behavior="padding" />)}
  );
}

export default ChatRoom;

const CustomAlert = () => {
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorText} title={'Invalid User!'}>Username must be 4 characters long.</Text>
    </Animatable.View>
  );
};

const rand1 = Math.round(Math.random() * 200 + 100);
const rand2 = Math.round(Math.random() * 200 + 100);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    margin: 10,
    fontSize: 13
  },
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});