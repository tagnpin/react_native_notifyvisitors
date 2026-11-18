// src/qa/inputs/PresetsStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputParameter } from '../inputs/InputTypes';

const PRESETS_KEY = 'INPUT_PLAYGROUND_PRESETS';

export type Preset = {
  id: string;
  name: string;
  params: InputParameter[];
};

export const savePreset = async (preset: Preset) => {
  const stored = await AsyncStorage.getItem(PRESETS_KEY);
  const list: Preset[] = stored ? JSON.parse(stored) : [];
  const filtered = list.filter(p => p.id !== preset.id); // replace if exists
  await AsyncStorage.setItem(
    PRESETS_KEY,
    JSON.stringify([...filtered, preset]),
  );
};

export const loadPresets = async (): Promise<Preset[]> => {
  const stored = await AsyncStorage.getItem(PRESETS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deletePreset = async (id: string) => {
  const stored = await AsyncStorage.getItem(PRESETS_KEY);
  const list: Preset[] = stored ? JSON.parse(stored) : [];
  const filtered = list.filter(p => p.id !== id);
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
};
