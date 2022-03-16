import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TextComponent,
    View,
  } from "react-native";
import ConfrimWheel from './Components/ConfirmWheel';
export default function EndScreen({route}){
    return(
        <ConfrimWheel items={route.params.Data} />
    )
}


