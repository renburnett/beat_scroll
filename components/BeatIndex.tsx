import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { List, Button, MD2Colors } from 'react-native-paper';
import { Beat } from '../constants/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BeatIndex({ path }: { path: string }) {
  const [bpm, setBpm] = useState<string>('DEFAULT_BPM');
  const [name, setName] = useState<string>('');
  const [beats, setBeats] = useState<Beat[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  useEffect(() => {
    (async () => {
      const storedBeats = await AsyncStorage.getItem('@beats');
      if (storedBeats) {
        setBeats(JSON.parse(storedBeats));
      }
    })();
  }, []);

  // const handleSubmit = async () => {
  //   const newBeat: Beat = { bpm: parseInt(bpm), name, date: new Date().toDateString() };
  //   const updatedBeats = [...beats, newBeat];
  //   setBeats(updatedBeats);

  //   await AsyncStorage.setItem('@beats', JSON.stringify(updatedBeats));
  //   setBpm('DEFAULT_BPM');
  //   setName('');
  // }

  const handleFormSubmit = async (newBeat: Beat) => {
    const updatedBeats = [...beats, newBeat];
    setBeats(updatedBeats);
    await AsyncStorage.setItem('@beats', JSON.stringify(updatedBeats));
  }

  const handleNext = () => {
    if (currentPage * itemsPerPage < beats.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const listIcon = (bpm: number) => {
    if (bpm <= 80) {
      return 'music-note-half'
    } else if (bpm > 80 && bpm < 140) {
      return 'music-note-quarter'
    } else if (bpm >= 140) {
      return 'music-note-sixteenth'
    } else {
      return 'music'
    }
  }

  return (
    <View style={styles.container}>
      <List.Section>
        {beats.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((beat: Beat, idx: number) => (
          <List.Item
            key={idx}
            left={props => <List.Icon {...props} icon={listIcon(beat.bpm)} />}
            title={`BPM: ${beat.bpm}`}
            descriptionNumberOfLines={2}
            description={`${beat.name}\n${beat.date}`}
            descriptionStyle={styles.description}
            />
        ))}
      </List.Section>
      <View style={styles.pagination}>
        <Button mode="contained" onPress={handlePrev} style={styles.prevButton}>Previous</Button>
        <Button mode="contained" onPress={handleNext} style={styles.nextButton}>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  description: {
    textTransform: "uppercase",
    fontSize: 12,
  },
  form: {
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  prevButton: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
});
