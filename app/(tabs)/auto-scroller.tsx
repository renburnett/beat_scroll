import { Text, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import AutoScroll from '../../components/AutoScroll';

export default function AutoScroller() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>Tap start to scroll</Text>
      <AutoScroll/>
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
