import { Button, Snackbar, Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import { CountdownTimeInSeconds } from "../../constants/Timer";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [bpm, setBpm] = useState<number>(60);
  const [intervals, setIntervals] = useState<number[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isTrackingBeat, setIsTrackingBeat] = useState<boolean>(false);
  const [previousInterval, setPreviousInterval] = useState<number>(Date.now());
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(CountdownTimeInSeconds);

  const addBeatInterval = () => {
    if (isTrackingBeat) {
      const now = Date.now();

      setIntervals((prevIntervalArr) => {
        prevIntervalArr.push(now - previousInterval);
        return prevIntervalArr;
      });

      setPreviousInterval(now);
    }
  };

  const calculateBeatInterval = () => {
    if (intervals.length > 1) {
      const sumTotalIntervals = intervals.reduce((a, b) => a + b, 0);

      const averageIntervalInSeconds = (sumTotalIntervals / intervals.length) / 1000;
      const newBpm = Math.round(60 / averageIntervalInSeconds);

      setBpm(newBpm);
    }
  };

  const startTrackingBeatInterval = () => {
    if (!isTrackingBeat) {
      setIsTrackingBeat(true);
      setPreviousInterval(Date.now());

      const timer = setInterval(() => {
        const updatedTime = timeLeftInSeconds - 1;
        setTimeLeftInSeconds(updatedTime);
      }, 1000);

      setTimeout(() => {
        console.log("5sec has passed");
        setSnackbarVisible(true);
        setIsTrackingBeat(false);
        setIntervals([]);
        calculateBeatInterval();
        clearInterval(timer);
      }, 1000 * CountdownTimeInSeconds);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge"> Track Your Beat!</Text>
      <Text variant="titleMedium"> Time Remaining: {timeLeftInSeconds}</Text>
      <View style={styles.separator} />
      <Button
        disabled={isTrackingBeat}
        icon="play-speed"
        mode="contained"
        onPress={startTrackingBeatInterval}
      >
        Start
      </Button>
      <View style={styles.separator} />
      <Button disabled={!isTrackingBeat} icon="metronome" mode="contained" onPress={addBeatInterval}>
        Track
      </Button>
      <View style={styles.separator} />
      <Text variant="headlineSmall">Current Bpm Interval: {bpm}</Text>
      <Snackbar
        visible={snackbarVisible}
        action={{
          label: "Clear",
          onPress: () => setSnackbarVisible(false),
        }}
        onDismiss={() => setSnackbarVisible(false)}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Icon color="white" size={25} source="content-save-check" />
          <Text style={{ color: "white", alignItems: "center", display: "flex" }}>{'Bpm Saved!'}</Text>
          {/* <Text style={{ color: "white", alignItems: "center", display: "flex" }}>{(intervals.length > 1) ? 'Bpm Saved!' : 'Please Try Again.'}</Text> */}
        </View>
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
