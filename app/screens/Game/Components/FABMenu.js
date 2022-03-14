import { StyleSheet, Text, View,Animated,TouchableWithoutFeedback,Alert,Button} from 'react-native'
import {AntDesign} from "@expo/vector-icons";

import React ,{useState,useRef} from 'react'

import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


//subject to change
export default function FABMenu () {

  const [isOpen,setIsOpen] = useState(false)
  const toggleAnimation = useRef(new Animated.Value(0)).current
const toggleMenu =()=>{
const toValue = isOpen ? 0 :1;

Animated.timing(toggleAnimation,{
  toValue:toValue,
  duration:300,
  useNativeDriver:false
}).start();
setIsOpen(!isOpen)

}
  return (
    <View style={styles.container}>
          
    <TouchableWithoutFeedback  onPress={()=>Alert.alert("Right","You checked Correct")}>
        <Animated.View style={{
                   transform:[{
            translateX:toggleAnimation.interpolate({
              inputRange:[0,1],
              outputRange:[0,-70]
            })
          }],
          position:"absolute",
    width:50,
    height:50,

    alignItems:'center',
    justifyContent:'center',
   

        }}>
        <AntDesign name="checkcircle" size={50} color='#50A4FF' />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback  onPress={()=>Alert.alert("Wrong","You checked Wrong")}>
        <Animated.View style={{
          transform:[{
            translateX:toggleAnimation.interpolate({
              inputRange:[0,1],
              outputRange:[0,40]
            })
          }],
          position:"absolute",
    width:50,
    height:50,
    borderRadius:60/2,
    alignItems:'center',
    justifyContent:'center',

  
        }}>
        <AntDesign name="closecircle" size={50} color='#FF6551' />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback   onPress={()=>toggleMenu()} >
        <Animated.View style={
          {
            transform:[{
              translateX:toggleAnimation.interpolate({
                inputRange:[0,1],
                outputRange:[0,170]
              })
            }],
            position:"absolute",
    width:50,
    height:50,
   
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'fff'
 
          }
        } >
        <AntDesign name="infocirlce" size={50}color="black"  />
        </Animated.View>
  
      </TouchableWithoutFeedback>

    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:40,
    paddingLeft:20,
  },

})