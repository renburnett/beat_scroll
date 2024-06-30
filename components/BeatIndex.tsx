import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Button } from 'react-native-paper';
import { Song } from '../constants/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DND_LOREM, NORMAL_LOREM, POKEMON_LOREM, JURASSIC_PARK_LOREM, STAR_WARS_LOREM, BACK_TO_THE_FUTURE_LOREM } from "../constants/DummyText";

export default function BeatIndex({ path }: { path: string }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  //TODO: remove for production
  const dummySongs: Song[] = [
    { bpm: 120, name: "DND Song", date: "2024-01-01", lyrics: DND_LOREM },
    { bpm: 100, name: "Normal Song", date: "2024-01-02", lyrics: NORMAL_LOREM },
    { bpm: 150, name: "Pokemon Song", date: "2024-01-03", lyrics: POKEMON_LOREM },
    { bpm: 50, name: "Jurassic Park Song", date: "2024-02-13", lyrics: JURASSIC_PARK_LOREM },
    { bpm: 75, name: "Star Wars Song", date: "2024-02-13", lyrics: STAR_WARS_LOREM },
    { bpm: 80, name: "Back to the Future Song", date: "2024-05-16", lyrics: BACK_TO_THE_FUTURE_LOREM },
  ];

  useEffect(() => {
    (async () => {
      await AsyncStorage.clear();

      const storedSongs = await AsyncStorage.getItem('@songs');
      if (storedSongs) {
        setSongs(JSON.parse(storedSongs));
      } else {
        //TODO: remove for production
        await AsyncStorage.setItem('@songs', JSON.stringify(dummySongs));
        setSongs(dummySongs);
      }
    })();
  }, []);

  const handleFormSubmit = async (newBeat: Song) => {
    const updatedBeats = [...songs, newBeat];
    setSongs(updatedBeats);
    await AsyncStorage.setItem('@songs', JSON.stringify(updatedBeats));
  }

  const handleNext = () => {
    if (currentPage * itemsPerPage < songs.length) {
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
      return 'music-note-half';
    } else if (bpm > 80 && bpm < 140) {
      return 'music-note-quarter';
    } else if (bpm >= 140) {
      return 'music-note-sixteenth';
    } else {
      return 'music';
    }
  }

  return (
    <View style={styles.container}>
        <List.Section>
          {songs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((song: Song, idx: number) => (
            <List.Item
              key={idx}
              left={props => <List.Icon {...props} icon={listIcon(song.bpm)} />}
              title={`BPM: ${song.bpm}`}
              descriptionNumberOfLines={2}
              description={`${song.name}\n${song.date}`}
              descriptionStyle={styles.description}
              style={styles.listItem}
            />
          ))}
        </List.Section>
      <View style={styles.pagination}>
        <Button mode="contained" onPress={handlePrev} disabled={currentPage === 1} style={styles.button}>Previous</Button>
        <Button mode="contained" onPress={handleNext} disabled={currentPage * itemsPerPage >= songs.length} style={styles.button}>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',

  },
  description: {
    textTransform: "uppercase",
    fontSize: 12,
  },
  listItem: {
    marginBottom: 10,
    width: 300,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});
