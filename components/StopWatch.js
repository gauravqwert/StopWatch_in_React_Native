import React, { useState, useRef, useCallback } from "react";
import { StyleSheet,SafeAreaView, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import  Constants  from "expo-constants";
import Result from "./Result";
import Control from "./Control";
import { displayTime } from "./util";
import MyHeader from "./Header";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const timer = useRef(null);

  // useCallback -> Typically useCallback hook is helpful when passing callback props to highly optimized child components.

  // For example , if a child components that accepts a caalback relies on a referential equality check (e.g :React memo()) to prevent unnecessary re-renders when its props change,then it is important that any callback props do not change between renders.

  // to do this ,the parent component can wrap the callback prop in useCallback hook and be guarantted that it is passing the same function object down into the optimized child component.

  const handleLeftButtonPress = useCallback(() => {
    if (isRunning) {
      setResults((previousResults) => [time, ...previousResults]);
    } else {
      setResults([]);
      setTime(0);
    }
  }, [isRunning, time]);

  const handleRightButtonPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousResults) => previousResults + 1);
      }, 10);
      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }
    setRunning((previousState) => !previousState);
  }, [isRunning]);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <StatusBar style="light" />
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayTime(time)}</Text>
      </View>

      <View style={styles.control}>
        <Control
          isRunning={isRunning}
          handleLeftButtonPress={handleLeftButtonPress}
          handleRightButtonPress={handleRightButtonPress}
        />
      </View>
      <View style={styles.result}>
        <Result results={results} />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor :"black",
        paddingTop :Constants.StatusBarHeight,
    },
    display: {
        flex:3/5,
        justifyContent:"center",
        alignItems:"center",
    },
    displayText:{
        color :"#fff",
        fontSize:70,
        fontWeight:"200",
        fontFamily :Platform.OS === "ios"? "Helvetica Neue": null,
    },
    control: {
        height: 70,
        flexDirection:"row",
        justifyContent:"space-around",
    },
    result:{
        flex:2/5
    },
})