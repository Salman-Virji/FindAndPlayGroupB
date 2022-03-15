import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TextComponent,
    View,
  } from "react-native";
import ConfrimWheel from './Components/ConfirmWheel';
export default function EndScreen({route}){
    return(
        <ConfrimWheel items={tempObj} />
    )
}


const tempObj = [{
    "objectiveid": 123,
    "description": "Squirrel",
    "points": 10,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken":  require('../../assets/images/cat.jpg'),
    "score": 0,
    "hasSet": false
  },
  {
    "objectiveid": 124,
    "description": "Tree",
    "points": 5,
    "referenceimage": require('../../assets/images/tree.jpg'),
    "picturetaken": null,
    "score": 5,
    "hasSet": false
  },
  
  {
    "objectiveid": 125,
    "description": "Bird",
    "points": 8,
    "referenceimage": require('../../assets/images/bird.jpg'),
    "picturetaken": null,
    "score": 0,
    "hasSet": false
  },
  {
    "objectiveid": 127,
    "description": "Cat",
    "points": 4,
    "referenceimage": require('../../assets/images/cat.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 129,
    "description": "Tele",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 130,
    "description": "Bear",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 131,
    "description": "Lion",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  }];