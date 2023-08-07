import { useState } from "react";
import { StyleSheet, Text, View as NonThemedView } from "react-native";
import { View } from '../../components/Themed';
import Icon from "react-native-paper/src/components/Icon";
import { DEFAULT_BPM } from "../../constants/Timing";
import { Button, Snackbar, MD2Colors } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BeatTracker() {
  const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
  const [intervals, setIntervals] = useState<number[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isTrackingBeat, setIsTrackingBeat] = useState<boolean>(false);
  const [trackingButtonIcon, setTrackingButtonIcon] = useState<boolean>(false);
  const [previousInterval, setPreviousInterval] = useState<number>(Date.now());
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(5);

  /* TODO: make this based on user input */
  const initialCoundownTimeLeftInSeconds = 5;

  const addBeatInterval = () => {
    if (isTrackingBeat) {
      const now = Date.now();

      setIntervals((prevIntervalArr) => {
        prevIntervalArr.push(now - previousInterval);
        return prevIntervalArr;
      });

      setPreviousInterval(now);
      setTrackingButtonIcon((prevIcon) => !prevIcon);
    }
  };

  const calculateBeatInterval = () => {
    if (intervals.length > 1) {
      const sumTotalIntervals = intervals.reduce((a, b) => a + b, 0);

      const averageIntervalInSeconds =
        sumTotalIntervals / intervals.length / 1000;
      const newBpm = Math.round(60 / averageIntervalInSeconds);

      setBpm(newBpm);
    }
    // TODO: maybe set error here?
  };

  const startTrackingBeatInterval = () => {
    if (!isTrackingBeat) {
      setIsTrackingBeat(true);
      setPreviousInterval(Date.now());

      const timer = setInterval(() => {
        setTimeLeftInSeconds((prevTime) => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        console.log(`${initialCoundownTimeLeftInSeconds} has passed`);
        setSnackbarVisible(true);
        setIsTrackingBeat(false);
        setIntervals([]);
        calculateBeatInterval();
        clearInterval(timer);
        setTimeLeftInSeconds(initialCoundownTimeLeftInSeconds);
      }, 1000 * initialCoundownTimeLeftInSeconds);
    }
  };

  const handleSaveBpm = () => {
    setTimeout(async () =>  {
      setSnackbarVisible(false);

      try {
        await AsyncStorage.setItem('@bpm', JSON.stringify(bpm));
        setBpm(bpm);
      } catch (e) {
        /* TODO: throw error */
        console.error(e);
      }
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}> Track Your Beat</Text>
      <Text style={{fontSize: 13}}>
        {isTrackingBeat
          ? timeLeftInSeconds
          : "Press Start to Calculate Your BPM"}
      </Text>
      <View style={styles.separator} />
      <Button
        disabled={isTrackingBeat}
        buttonColor={MD2Colors.tealA700}
        icon="play-speed"
        mode="contained"
        onPress={startTrackingBeatInterval}
      >
        Start
      </Button>
      <View style={styles.separator} />
      <Button
        disabled={!isTrackingBeat}
        buttonColor={MD2Colors.blue500}
        icon={trackingButtonIcon ? "metronome" : "metronome-tick"}
        mode="contained"
        onPress={addBeatInterval}
      >
        Track
      </Button>
      <View style={styles.separator} />
      <Text style={{fontSize: 13}}>Saved Bpm: {bpm}</Text>
      <Snackbar
        visible={snackbarVisible}
        action={{
          label: "Cancel",
          onPress: () => setSnackbarVisible(false),
        }}
        onDismiss={handleSaveBpm}
      >
          <NonThemedView style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Icon color={MD2Colors.purple200} size={25} source="content-save-check" />
            <Text
              style={{ color: "white", alignItems: "center", display: "flex" }}
            >
              {"Saving..."}
            </Text>
          </NonThemedView>
          {/* TODO: add error logic? */}
          {/* <Text style={{ color: "white", alignItems: "center", display: "flex" }}>{(intervals.length > 1) ? 'Bpm Saved!' : 'Please Try Again.'}</Text> */}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
