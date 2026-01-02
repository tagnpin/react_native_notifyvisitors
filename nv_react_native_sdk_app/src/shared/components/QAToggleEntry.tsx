import React from 'react';
import ClientSectionCard from '../../client/components/ClientSectionCard';
import ActionButton from './ActionButton';
import { isQAEnabled } from '../../config/QAGateConfig';

type Props = {
  onPress: () => void;
};

const QAToggleEntry: React.FC<Props> = ({ onPress }) => {
  const enabled = isQAEnabled();

  return (
    <ClientSectionCard>
      <ActionButton
        title={enabled ? 'Disable QA Mode' : 'Enable QA Mode'}
        subtitle={
          enabled
            ? 'Exit QA and return to client mode'
            : 'For testing and debugging only'
        }
        variant="row"
        onPress={onPress}
      />
    </ClientSectionCard>
  );
};

export default QAToggleEntry;
