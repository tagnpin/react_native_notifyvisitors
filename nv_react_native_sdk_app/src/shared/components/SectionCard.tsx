import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

type Props = {
  children: React.ReactNode;
};

const SectionCard: React.FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default SectionCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
