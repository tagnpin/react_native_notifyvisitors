import React from 'react';
import ActionButton from './ActionButton';
import { isQAEnabled } from '../../config/QAGateConfig';
import SectionCard from './SectionCard';

type Props = {
  onPress: () => void;
};

const QAToggleEntry: React.FC<Props> = ({ onPress }) => {
  const enabled = isQAEnabled();

  return (
    <SectionCard>
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
    </SectionCard>
  );
};

export default QAToggleEntry;
