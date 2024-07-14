import React from 'react';
import StopWatch from './components/StopWatch';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
          <StopWatch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
