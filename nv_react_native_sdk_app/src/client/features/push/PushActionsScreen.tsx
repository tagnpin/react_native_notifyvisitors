// src/client/features/push/PushActionsScreen.tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ActionRow from '../../../shared/components/ActionRow';
import ResultBottomSheet from '../../../shared/components/ResultBottomSheet';
import { sendPushActions } from './pushActions';

const PushActionsScreen = () => {
  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const execute = async (action: () => Promise<any>) => {
    try {
      const res = await action();
      setResult(res);
    } catch (e: any) {
      setResult({ error: e.message });
    }
    setVisible(true);
  };

  return (
    <>
      <ScrollView>
        {sendPushActions.map(item => (
          <ActionRow
            key={item.key}
            title={item.title}
            description={item.description}
            actionLabel={item.actionLabel}
            actionIcon={item.icon ? item.icon() : undefined}
            layout={item.layout}
            actionBadgeCount={item.actionBadgeCount}
            onPress={() => {
              if (item.execute) {
                execute(item.execute);
              }
            }}
          />
        ))}
      </ScrollView>

      <ResultBottomSheet
        visible={visible}
        title="Push Result"
        result={result}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default PushActionsScreen;
