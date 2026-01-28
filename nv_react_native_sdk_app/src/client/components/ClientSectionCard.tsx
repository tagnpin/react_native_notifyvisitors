import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../shared/styles/theme';

type Props = {
  children: React.ReactNode;
};

const ClientSectionCard: React.FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default ClientSectionCard;

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

// import React from 'react';
// import { View, StyleSheet } from 'react-native';

// type Props = {
//   children: React.ReactNode;
// };

// const ClientSectionCard: React.FC<Props> = ({ children }) => {
//   return <View style={styles.card}>{children}</View>;
// };

// export default ClientSectionCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
// });
