import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { QAStackParamList } from '../../navigation/NavigationTypes';
import { theme } from '../../shared/styles/theme';
import SectionCard from '../../shared/components/SectionCard';
import SectionHeader from '../../shared/components/SectionHeader';

type Props = NativeStackScreenProps<QAStackParamList, 'QALinkLanding'>;

const contentByPage: Record<'about-us' | 'contact-us', { heading: string; body: string }> =
  {
    'about-us': {
      heading: 'About Us',
      body: 'This QA landing screen validates deeplink or push routing to About Us.',
    },
    'contact-us': {
      heading: 'Contact Us',
      body: 'This QA landing screen validates deeplink or push routing to Contact Us.',
    },
  };

const QALinkLandingScreen: React.FC<Props> = ({ route }) => {
  const { page, source, linkInfoJSON } = route.params;
  const content = contentByPage[page];

  const formattedJSON = useMemo(() => {
    if (!linkInfoJSON) {
      return 'No getLinkInfo payload was provided.';
    }

    try {
      return JSON.stringify(JSON.parse(linkInfoJSON), null, 2);
    } catch {
      return linkInfoJSON;
    }
  }, [linkInfoJSON]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionCard>
        <Text style={styles.heading}>{content.heading}</Text>
        <Text style={styles.body}>{content.body}</Text>
        <Text style={styles.meta}>Source: {source}</Text>
      </SectionCard>

      <SectionHeader title="Received getLinkInfo JSON" />
      <SectionCard>
        <Text selectable style={styles.jsonText}>
          {formattedJSON}
        </Text>
      </SectionCard>
    </ScrollView>
  );
};

export default QALinkLandingScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },
  heading: {
    ...theme.text.title,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  body: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  meta: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textPrimary,
  },
});
