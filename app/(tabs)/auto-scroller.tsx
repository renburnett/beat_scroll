import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, Caption, MD2Colors } from 'react-native-paper';
import { StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { ScrollSpeed } from '../../constants/Timing';
import { View } from '../../components/Themed';
import { DND_LOREM } from '../../constants/DummyText';

const AutoScroller = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollJumpLengthRef = useRef<number>(1);

  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isScrollComplete, setIsScrollComplete] = useState<boolean>(false);
  const [hasManuallyScrolled, setHasManuallyScrolled] = useState<boolean>(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timer | null>(null);
  const [bpm, setBpm] = useState<number>(120);
  const [scrollSpeed, setScrollSpeed] = useState<number>(60000 / bpm);

  useEffect(() => {
    const newScrollSpeed = 60000 / bpm;
    setScrollSpeed(newScrollSpeed);
    console.log(bpm);
  }, [bpm]);

  useEffect(() => {
    if (isScrollComplete) {
      if (autoScrollInterval && scrollViewRef.current) {
        clearInterval(autoScrollInterval);
        setIsScrolling(false);
      }
    }
  }, [scrollJumpLengthRef.current, isScrollComplete, autoScrollInterval, bpm]);

  const startAutoScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }

    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }

    setIsScrolling(true);

    const interval = setInterval(() => {
      if (scrollViewRef.current && scrollJumpLengthRef.current) {
        scrollViewRef.current.scrollTo({ y: scrollJumpLengthRef.current, animated: false });
        scrollJumpLengthRef.current += 0.5; /* pixel distance */
      }
    }, ScrollSpeed);

    setAutoScrollInterval(interval);
  }

  const resetAutoScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }

    if (scrollJumpLengthRef.current) {
      scrollJumpLengthRef.current = 1;
    }

    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }

    setIsScrollComplete(false);
    setHasManuallyScrolled(false);
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;

    /*
      if the window is not auto-scrolling and the user is scrolling manually,
      set this flag to indicate that the user has manually scrolled
    */
    if (!isScrolling && scrollPosition > 0) {
      setHasManuallyScrolled(true);
    }
    setIsScrollComplete(scrollPosition >= (contentHeight - scrollViewHeight));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={!isScrolling}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.text}>
          {DND_LOREM}
        </Text>
      </ScrollView>

      <Slider
        style={styles.slider}
        minimumValue={40}
        maximumValue={220}
        step={1}
        value={bpm}
        onValueChange={setBpm}
        minimumTrackTintColor={MD2Colors.blue500}
        maximumTrackTintColor={MD2Colors.blue300}
        thumbTintColor={MD2Colors.blue500}
      />
      <Caption style={styles.caption}>BPM: {bpm}</Caption>
      {hasManuallyScrolled ? (
        <Button
          style={styles.button}
          disabled={isScrolling}
          buttonColor={MD2Colors.redA700}
          icon="refresh"
          mode="contained"
          onPress={resetAutoScroll}
        >
          Reset
        </Button>
      ) : (
        <Button
          style={styles.button}
          disabled={isScrolling}
          buttonColor={MD2Colors.tealA700}
          icon="script-text-play-outline"
          mode="contained"
          onPress={startAutoScroll}
        >
          Start
        </Button>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  contentContainer: {
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: 16,
  },
  caption: {
    textAlign: 'center',
    color: MD2Colors.black,
  },
  button: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default AutoScroller;
