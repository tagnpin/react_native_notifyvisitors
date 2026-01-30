import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../shared/styles/theme';

type Props = {
  title: string;
};

const SectionHeader: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={0}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },

  title: {
    ...theme.text.title,
    color: theme.colors.textPrimary,
  },
});
