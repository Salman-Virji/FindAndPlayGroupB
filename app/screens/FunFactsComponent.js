import React, {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class FunFact extends Component{
    render(){
        return(
            <View style={styles.factCard}>
               
                <View style={{flex:2}}> 
                    <Image
                        source={this.props.factImage} 
                        style={styles.factImg}
                    />
                </View>

                <View style={{marginTop:20}}>
                    <Text style={styles.factHeader}>Did you know...</Text>
                </View>

                
                <View style={styles.factTextContainer}>
                    <Text style={styles.factText}>
                        {this.props.funFact} 
                    </Text>
                </View>
            </View>
        )
    }
}

export default FunFact;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    factCard:{ 
        alignItems:"center",
        backgroundColor: "#50A4FF",
        borderRadius:100,
        elevation: 20,
        height:540, 
        width:570, 
        margin:25
       },
       
     factImg:{ 
       width:570,
       height:245,
       overflow: "hidden",
       borderWidth: 6,
       borderColor: "black",
       borderRadius:100, 
       flex:1, 
       resizeMode:'cover'
   },

   factText:{
       alignItems:'center',
       fontWeight:'bold',
       fontSize:26,
       color:'#FFFFFF'
   
   },

   factTextContainer:{
    flex:1, 
    paddingLeft:10, 
    paddingTop:10,
    margin:10,

   },

   factHeader:{
    fontSize:26,
    color:'#FFFFFF',
    fontWeight:'bold',
   },
   
})