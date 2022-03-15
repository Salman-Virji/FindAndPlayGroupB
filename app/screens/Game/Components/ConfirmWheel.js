import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FlatButton from './FlatButton';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.5;

function confrimWheel({items}) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden/>
        <FlatList
        data={items}
        keyExtractor={(item) => item.description}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return (
          <View style={{justifyContent: 'center', alignItems: 'center', width}}>
            <View style={{backgroundColor: 'gray', borderRadius: 20, padding: 15}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{paddingBottom: 50, fontSize: 35, fontWeight: 'bold'}}>{item.description}</Text>
                </View>
                <Image
                  source={item.picturetaken != null? item.picturetaken : item.referenceimage} 
                  style={{
                    width: imageWidth,
                    resizeMode: 'cover',
                    borderRadius: 15,
                    marginBottom: 20,
                    padding: 50,
                    backgroundColor: 'red'
                  }} 
                />
              </View>
          </View>
          );
        }}
      />
  
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    }
  });
  
  export default confrimWheel