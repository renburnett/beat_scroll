import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-paper';
import { CountdownTimeInSeconds } from '../constants/Timer';

import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const [isTrackingBeat, setIsTrackingBeat] = useState<boolean>(false);
  const [previousInterval, setPreviousInterval] = useState<number>(Date.now());

  const [bpm, setBpm] = useState<number>(60);
  const [intervals, setIntervals] = useState<number[]>([]);

  const addBeatInterval = () => {
    if (isTrackingBeat) {
      const now = Date.now();

      setIntervals((prevIntervalArr) => {
        prevIntervalArr.push(now - previousInterval);
        return prevIntervalArr;
      });

      setPreviousInterval(now);

      console.log('intervals', intervals)
    }
  }

  const calculateBeatInterval = () => {
    const sumTotalBpm = intervals.reduce((a, b) => a + b, 0);
    console.log('sumTotalBpm', sumTotalBpm)
    
    const averageBpm = (sumTotalBpm / intervals.length);
    console.log('averageBpm', averageBpm);

    const roundedBpm = Math.round(averageBpm);
    console.log('roundedBpm', roundedBpm);

    setBpm(roundedBpm);
    
    console.log('bpm', bpm);
  }

  const startTrackingBeatInterval = () => {
    if (!isTrackingBeat) {
      setIsTrackingBeat(true);
      setPreviousInterval(Date.now());

      setTimeout(() => {
        console.log('5sec has passed')
        setIsTrackingBeat(false);
        setIntervals([]);
        calculateBeatInterval();
      }, (1000 * CountdownTimeInSeconds))
    }
  }




  return (
    <View style={styles.container}>
      <Text style={styles.title}> Track Your Beat </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button icon="camera" mode="contained" onPress={startTrackingBeatInterval}>
        Start
      </Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button icon="camera" mode="contained" onPress={addBeatInterval}>
        Capture BPM
      </Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{bpm}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
