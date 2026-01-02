import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const ClientSectionCard: React.FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default ClientSectionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
