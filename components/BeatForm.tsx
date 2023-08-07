// TODO: make this into a standalone page
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';
import { Beat } from '../constants/Types';
import { DEFAULT_BPM } from '../constants/Timing';

interface BeatFormProps {
  onFormSubmit: (beat: Beat) => void;
}

export default function BeatForm({ onFormSubmit }: BeatFormProps) {
  const [bpm, setBpm] = useState<string>(DEFAULT_BPM.toString());
  const [name, setName] = useState<string>('');

  const handleSubmit = () => {
    const newBeat: Beat = { bpm: parseInt(bpm), name, date: new Date().toDateString() };
    onFormSubmit(newBeat);
    setBpm(DEFAULT_BPM.toString());
    setName('');
  }

  return (
    <View style={styles.form}>
      <TextInput
        value={bpm}
        onChangeText={setBpm}
        style={styles.input}
        placeholder="Enter BPM between ${MIN_BPM} and ${MAX_BPM}"
        keyboardType="numeric"
      />
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter Name"
      />
      <Button mode="contained" buttonColor={MD2Colors.blue400} onPress={handleSubmit}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
