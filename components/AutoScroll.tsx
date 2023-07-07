import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, MD2Colors } from "react-native-paper";
import { StyleSheet, ScrollView } from "react-native";
import { ScrollSpeed } from "../constants/Timing";

const AutoScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollJumpLengthRef = useRef<number>(1);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isScrollComplete, setIsScrollComplete] = useState<boolean>(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timer|null>(null);

  useEffect(() => {
    if (isScrollComplete && autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setIsScrolling(false);
    }
  }, [scrollJumpLengthRef.current, isScrollComplete, autoScrollInterval]);

  const startAutoScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0 });
      setIsScrolling(true);
    }

    const interval = setInterval(() => {
      if (scrollViewRef.current && scrollJumpLengthRef.current) {
        scrollViewRef.current.scrollTo({ y: scrollJumpLengthRef.current, animated: true });
        scrollJumpLengthRef.current += 1;
      }
    }, ScrollSpeed);

    setAutoScrollInterval(interval);
  }

  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;

    setIsScrollComplete(scrollPosition >= (contentHeight - scrollViewHeight));

    // TODO: remove
    // console.log('Scroll has reached the bottom', scrollPosition >= (contentHeight - scrollViewHeight));
    // console.log('scroll position', event.nativeEvent.contentOffset.y);
    // console.log('full scroll height', event.nativeEvent.contentSize.height);
   }

  return (
    <>
      <Button
        disabled={isScrolling}
        buttonColor={MD2Colors.tealA700}
        icon="script-text-play-outline"
        mode="contained"
        onPress={startAutoScroll}
      >
        Start
      </Button>
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default AutoScroll;