import React from 'react';
import { Button,InputEvent 
  ,Image, ImageBackground,
   StyleSheet, Text,
    TouchableOpacity, 
    View, TextInput } from 'react-native';

function CreateGame(props) {
    return (
     <View >





<Image source={require('./assets/Settings.png')}  style ={{
  width:150,
  height:150,
position:'absolute',
top:80,
right:50
}
  
}/>


<Image source={require('./assets/Logout.png')}  style ={{
  width:150,
  height:150,
position:'absolute',
top:80,
left:50
}
}/>


<View >
  <Text style={{
  fontSize:60,
  fontWeight: 'bold',
  position:'absolute',
  top:220,
  left:220

}}>Create Game</Text>
</View>


<Image source={require('./assets/Profile.png')}  style ={{
  width:150,
  height:150,
position:'absolute',
top:1000,
left:50
}
}/>

<Image source={require('./assets/Play.png')}  style ={{
  width:150,
  height:150,
position:'absolute',
top:1000,
right:330
}
}/>

<Image source={require('./assets/Feed.png')}  style ={{
  width:150,
  height:150,
position:'absolute',
top:1000,
right:50
}
}/>




<TextInput 
               underlineColorAndroid = "transparent"
               placeholder = "Title"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               style={{
                 position:'absolute',
                 top:330,
                 borderRightWidth: 2,
                 borderLeftWidth: 2,
                 borderTopWidth:2,
                 borderBottomWidth:2,
                 width: 350,
                 alignItems:'center',
                 textAlign:'center',
                 padding:12,
                 left: 220,
                 fontSize:30,
                 borderRadius:20


               }}
               />



               
<TextInput 
               underlineColorAndroid = "transparent"
               placeholder = "Category"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               style={{
                 position:'absolute',
                 top:440,
                 borderRightWidth: 2,
                 borderLeftWidth: 2,
                 borderTopWidth:2,
                 borderBottomWidth:2,
                 width: 350,
                 alignItems:'center',
                 textAlign:'center',
                 padding:12,
                 left: 220,
                 fontSize:30,
                 borderRadius:20


               }}
               />


               
<TextInput 
               underlineColorAndroid = "transparent"
               placeholder = "Time Limit"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               style={{
                 position:'absolute',
                 top:540,
                 borderRightWidth: 2,
                 borderLeftWidth: 2,
                 borderTopWidth:2,
                 borderBottomWidth:2,
                 width: 350,
                 alignItems:'center',
                 textAlign:'center',
                 padding:12,
                 left: 220,
                 fontSize:30,
                 borderRadius:20


               }}
               />

               

            
<View style={{
  position:'absolute',
  top:700,
  left:250,
  borderColor:'black',
    width:300,


 zIndex:3,
fontSize:20,

}} >
               
                <TouchableOpacity activeOpacity={0.95} style={styles.button}>
                    <Text style={styles.text}>HOST</Text>
                </TouchableOpacity>
            </View>










<TextInput 
               underlineColorAndroid = "transparent"
               placeholder = "Difficulty"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               style={{
                 position:'absolute',
                 top:640,
                 borderRightWidth: 2,
                 borderLeftWidth: 2,
                 borderTopWidth:2,
                 borderBottomWidth:2,
                 width: 350,
                 alignItems:'center',
                 textAlign:'center',
                 padding:12,
                 left: 220,
                 fontSize:30,
                 borderRadius:20


               }}
               />


    
     
     </View>
    );
}

const styles = StyleSheet.create({
    background:{

       position:'absolute',
       top:200


    },
    texts:{
      fontSize:30

    },
   
  button: {
      flexDirection: 'row', 
      height: 50, 
      backgroundColor: 'lightblue',
      borderRadius:20,
    
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      elevation:3,
  },
  button2: {
    flexDirection: 'row', 
    height: 50, 
    backgroundColor: 'lightblue',
    borderRadius:20,

   
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation:3,
},
  text: {
      fontSize: 20,
      padding:10,
      
      fontWeight: 'bold',
  }
})

export default CreateGame;