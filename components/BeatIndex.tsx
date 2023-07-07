import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function BeatIndex({ path }: { path: string }) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Beats">
      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

const styles = StyleSheet.create({

});
