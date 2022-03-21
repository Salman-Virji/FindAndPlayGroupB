import React, {useState} from 'react';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import {TextInput,Image, ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity } from 'react-native';


function LandingScreen({navigation,route}) {
    const[Isvisible,setVisibility] = useState(false);
    const Username = route.params
   
    return (
        <ImageBackground style={styles.background} source={require("../assets/BGs/background1.png")}>
        {/* conditional rendering for popup to ask user if they want to create a game or join one */}
        {Isvisible? <View style={{
                position:'absolute',
                top:'25%',
                width:'60%',
                height:'30%',
                border: 2,
                borderRadius:30,
                zIndex:999,
                backgroundColor:'#50A4FF',
                bordercolor:'black ',
                elevation:50,
                padding:5
            }} >
                <TouchableOpacity style={{
                    textAlign:'center',
                    top:'25%',
                    left:'20%',
                    width:'60%',
                    fontSize:25,
                    margin:10,
                    border:10,
                    borderColor:'#000000'
                }} onPress={() => navigation.navigate('CreateGameScreen', {Username:Username.Username})}>
                    <Text
                   style={{
                    textAlign:'center',
                    left:'10%',
                    width:'60%',
                    fontSize:25
                }}
                    > Create a game</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={{
                    textAlign:'center',
                    left:'20%',
                    top:'30%',
                    width:'60%',
                    fontSize:25,
                    margin:10,
                    border:2,
                    borderColor:'#000000'
                }} onPress={() => navigation.navigate('JoinGame', {Username:Username})}>
                    <Text style={{
                        textAlign:'center',
                        left:'10%',
                        width:'60%',
                        fontSize:25,
                    }}> Join a game</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    textAlign:'center',
                    left:'20%',
                    top:'40%',
                    width:'60%',
                    fontSize:25,
                    margin:10,
                    border:2,
                    borderColor:'#000000'
                }} onPress={() =>setVisibility(false)}>
                    <Text style={{
                    textAlign:'center',
                    left:'10%',
                    width:'60%',
                    fontSize:25
                }}> cancel</Text>
                </TouchableOpacity>
            </View>: <View></View>}
            {/* touchableOpacity buttons */} 

            {/*settings button*/}
        <TouchableOpacity  style ={styles.settingBtnContainer}>
            <Image
                source={require('../assets/icons/settings2.png')} 
            />
            <Text style = {styles.loutoutBtnText}>Settings</Text> 
        </TouchableOpacity>

            {/*logout button*/}
        <TouchableOpacity onPress ={() => navigation.navigate('SigninScreen')} style ={styles.logoutBtnContainer}>
            <Image
                source={require('../assets/icons/logoutIcon.png')} 
            /> 
            <Text onPress ={() => navigation.navigate('SigninScreen')} style = {styles.loutoutBtnText}>Logout</Text>
        </TouchableOpacity>

             {/*FACTS banner*/}
        <View style = {styles.funFactContainer}>
             <Text style = {styles.funFactContainerText}>Fun Facts</Text>  
         </View>

             {/*facts image/details*/}
         <View style = {styles.factCard}>
            <Image
                source={require('../assets/factSlides/penguin2.jpg')}
                style ={styles.factImg} 
            /> 
            <Text style={styles.factText}>
                Did you know..
                {"\n"}
                {"\n"}
                The black and white “tuxedo” look donned by most penguin species is a clever camouflage called countershading.</Text>
         </View>

            {/*profile/play/feed buttons*/}

            {/*profile button*/}
        <View style = {styles.profilePlayFeedContainer}>

            <TouchableOpacity style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/profileIcon.png')} 
            />
                <Text style={styles.ppfText}>Profile</Text>
            </TouchableOpacity>

            {/*play button*/}  
            <TouchableOpacity onPress ={() => Username.Username? setVisibility(true):navigation.navigate('JoinGame')} style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/controllerIcon.png')} 
            />
                <Text style={styles.ppfText}>Play</Text>
            </TouchableOpacity>

             {/*feed button*/}
            <TouchableOpacity style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/feedIcon.png')} 
            />
                <Text style={styles.ppfText}>Feed</Text>
            </TouchableOpacity>
           
            
        </View>
        
        

    </ImageBackground>
    );
}




const styles = StyleSheet.create({
    background: {
      resizeMode:"contain", 
      flex: 1,
      justifyContent:"flex-end",
      alignItems: "center",
      
     
    },

    
   //fact title styling
    funFactContainer:{
        zIndex: 2, 
        position: "absolute",
        bottom:990,
        alignItems:"center",
        backgroundColor: "#FFE551",
        paddingLeft:145,
        paddingRight:145,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:20
      },

    funFactContainerText:{
        fontWeight:"bold",
        fontSize:45,
    },

     //text styling for ppf (profile play feed)
    ppfText:{
        zIndex: 2, 
        alignItems:"center",
        borderRadius:20,
        marginRight:40,
        marginLeft:40,
        fontSize:25,
        color:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    profilePlayFeedContainer:{
        zIndex: 2, 
        position: "absolute",
        bottom:25,
        alignItems:"center",
        flexDirection:"row",
    },

    //logout button
    logoutBtnContainer:{ 
        zIndex: 2, 
        position:'absolute',
        top:65,
        left:30,
        alignItems:"center",
        backgroundColor: "#FFE551",
        padding:15,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    loutoutBtnText:{
        fontSize:20,
        fontWeight:'normal',
        color:"#000000"
    },

    //settings button 
    settingBtnContainer:{ 
        zIndex: 2, 
        position:'absolute',
        top:65,
        right:30,
        alignItems:"center",
        backgroundColor: "#FFE551",
        padding:15,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

   ppfBtnImg:{ //ppf (profile play feed) button styling 
    zIndex: 2, 
    bottom:25,
    alignItems:"center",
    backgroundColor: "#50A4FF",
    padding:15,
    borderRadius:20,
    marginRight:40,
    marginLeft:40,
    fontSize:30,
    color:"#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
   },

   factCard:{ //styling for fact card, might need to change this when functionality is added
    zIndex: 2, 
    bottom:450,
    alignItems:"center",
    backgroundColor: "#50A4FF",
    padding:0,
    borderRadius:100,
    width:700,
    height:500,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 30,
   },

   //styling for image
   factImg:{ 
       borderRadius:20,
       width:700,
       height:245,
       borderRadius: 150 / 2,
       overflow: "hidden",
       borderWidth: 7,
       borderColor: "black",
       borderRadius:100, 
       shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
   },
   
//TODO: make container for factsText and add attributes for aligning, centering text
   factText:{
    zIndex: 2, 
    alignItems:"center",
    position:'absolute',
    top:260,
    paddingLeft:70,
    paddingRight:70,
    fontWeight:'bold',
    fontSize:30,
    color:"#FFFFFF",
    shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
   },

})
export default LandingScreen;