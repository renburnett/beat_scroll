import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, MD2Colors } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { ScrollSpeed } from '../../constants/Timing';
import { View } from '../../components/Themed';

const AutoScroller = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollJumpLengthRef = useRef<number>(1);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isScrollComplete, setIsScrollComplete] = useState<boolean>(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    /* when scrolling is finished, clear interval and update `isScrolling` */
    if (isScrollComplete) {
      if (autoScrollInterval && scrollViewRef.current) {
        clearInterval(autoScrollInterval);
        setIsScrolling(false);
      }
    }
  }, [scrollJumpLengthRef.current, isScrollComplete, autoScrollInterval]);

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
        scrollJumpLengthRef.current += 0.5;
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
  }

  const handleScroll = (event: any) => {
    console.log(event)
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;

    setIsScrollComplete(scrollPosition >= (contentHeight - scrollViewHeight));
  }

  return (
    <View style={styles.container}>
      {!isScrollComplete ? (
        <View style={{marginTop: 20}}>
          <Button
            disabled={isScrolling}
            buttonColor={MD2Colors.tealA700}
            icon="script-text-play-outline"
            mode="contained"
            onPress={startAutoScroll}
          >
            Start
          </Button>
        </View>
      ) : (
        <View style={{marginTop: 20}}>
          <Button
            disabled={isScrolling}
            buttonColor={MD2Colors.redA700}
            icon="refresh"
            mode="contained"
            onPress={resetAutoScroll}
          >
            Reset
          </Button>
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.text}>
          {/* TODO: Add dynamic text */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat felis vitae
          Nullam nec eros condimentum, lacinia mauris non, tincidunt arcu.
          Vivamus id ex a eros iaculis aliquet in at elit. Fusce dapibus risus vel turpis finibus,
          eget venenatis dui hendrerit. Sed eu ante enim. Mauris ullamcorper, orci sed dictum
          efficitur, dolor nunc placerat risus, non volutpat velit urna ac libero
          eget venenatis dui hendrerit. Sed eu ante enim. Mauris ullamcorper, orci sed dictum
          mauris iaculis congue. Nullam nec eros condimentum, lacinia mauris non, tincidunt arcu.
          Vivamus id ex a eros iaculis aliquet in at elit. Fusce dapibus risus vel turpis finibus,
          mauris iaculis congue. Nullam nec eros condimentum, lacinia mauris non, tincidunt arcu.
          eget venenatis dui hendrerit. Sed eu ante enim. Mauris ullamcorper, orci sed dictum
          efficitur, dolor nunc placerat risus, non volutpat velit urna ac libero
          Vivamus id ex a eros iaculis aliquet in at elit. Fusce dapibus risus vel turpis finibus,
          eget venenatis dui hendrerit. Sed eu ante enim. Nullam nec eros condimentum, lacinia mauris non,
          dolor nunc placerat risus, non volutpat velit urna ac liberotincidunt arcu.
          Vivamus id ex a eros iaculis aliquet in at elit. Fusce dapibus risus vel turpis finibus,
          eget venenatis dui hendrerit. Sed eu ante enim. Mauris ullamcorper, orci sed dictum
          efficitur, dolor nunc placerat risus, non volutpat velit urna ac libero.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});

export default AutoScroller;
