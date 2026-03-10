// src/qa/screens/InputPlaygroundScreen.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import uuid from 'react-native-uuid';

import { RuntimeParam } from '../../shared/types/runtimeParam';
import { validateInput } from '../inputs/InputValidator';
import ParameterRenderer from '../inputs/ParameterRenderer';
import PayloadPreview from '../inputs/PayloadPreview';
import ActionButton from '../../shared/components/ActionButton';
import SectionHeader from '../../shared/components/SectionHeader';
import SDKManager from '../../sdk/SDKManager';
import DebugLogger from '../../debug/DebugLogger';
import { parseParam } from '../../shared/utils/parseParam';

const InputPlaygroundScreen = () => {
  const [params, setParams] = useState<RuntimeParam[]>([
    {
      id: uuid.v4().toString(),
      name: 'param1',
      type: 'string',
      rawValue: '',
    },
  ]);

  /** ✅ ADD PARAM — FIX */
  const addParam = () => {
    setParams(prev => [
      ...prev,
      {
        id: uuid.v4().toString(),
        name: `param${prev.length + 1}`,
        type: 'string',
        rawValue: '',
      },
    ]);
  };

  const validateAll = (): boolean => {
    for (const p of params) {
      const result = validateInput(p);
      if (!result.valid) {
        Alert.alert('Validation Error', `${p.name}: ${result.error}`);
        return false;
      }
    }
    return true;
  };

  const executeSDK = async () => {
    if (!validateAll() || !payload) return;

    try {
      const result = await SDKManager.trackEvent(payload);

      DebugLogger.log('sdk_execution', 'InputPlaygroundScreen', payload, true);
      // logDebug({
      //   type: 'SDK_EXECUTION',
      //   input: payload,
      //   output: result,
      // });
    } catch (e: any) {
      DebugLogger.log(
        'sdk_execution_error',
        'InputPlaygroundScreen',
        payload,
        false,
      );
      // logDebug({
      //   type: 'SDK_EXECUTION_ERROR',
      //   input: payload,
      //   output: e.message,
      // });
    }
  };

  /** ✅ REMOVE PARAM */
  const removeParam = (id: string) => {
    setParams(prev => prev.filter(p => p.id !== id));
  };

  // const payload = useMemo(() => {
  //   const result: any = {};
  //   for (const p of params) {
  //     const validation = validateInput(p);
  //     if (!validation.valid) return null;
  //     result[p.name] = validation.parsedValue;
  //   }
  //   return result;
  // }, [params]);

  const payload = useMemo(() => {
    const result: Record<string, any> = {};

    for (const p of params) {
      result[p.id] = parseParam(p.rawValue, p);
    }

    return result;
  }, [params]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SectionHeader title="Parameters" />
      {params.map(p => (
        <ParameterRenderer
          key={p.id}
          param={p}
          onChange={updated =>
            setParams(prev =>
              prev.map(x => (x.id === updated.id ? updated : x)),
            )
          }
          onRemove={() => removeParam(p.id)}
        />
      ))}

      {/* ✅ BUTTONS */}
      <ActionButton title="Add Parameter" onPress={() => addParam()} />

      <SectionHeader title="Actions" />

      <ActionButton title="Validate Inputs" onPress={() => validateAll()} />
      <ActionButton title="Execute SDK" onPress={() => executeSDK()} />

      <ActionButton title="Add Parameter" onPress={addParam} />
      <ActionButton title="Validate Inputs" onPress={() => {}} />
      <ActionButton title="Execute SDK" onPress={() => {}} />

      {payload && <PayloadPreview payload={payload} />}
    </ScrollView>
  );
};

export default InputPlaygroundScreen;
