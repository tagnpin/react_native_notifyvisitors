import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: React.ReactNode;
};

const QAAccordion: React.FC<Props> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </Pressable>

      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export default QAAccordion;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
});
