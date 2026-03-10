// src/qa/inputs/ParameterRenderer.tsx

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { RuntimeParam } from '../../shared/types/runtimeParam';
import { parseParam } from '../../shared/utils/paramUtils';

type Props = {
  param: RuntimeParam;
  onChange: (param: RuntimeParam) => void;
  onRemove?: () => void;
};

const ParameterRenderer: React.FC<Props> = ({ param, onChange, onRemove }) => {
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    try {
      parseParam(value, param);
      // parseParam(value, param.type);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{param.id}</Text>
        {onRemove && (
          <Text style={styles.remove} onPress={onRemove}>
            Remove
          </Text>
        )}
      </View>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        multiline
        placeholder={param.description || 'Enter value'}
        value={param.rawValue}
        onChangeText={text => {
          onChange({ ...param, rawValue: text });
          validate(text);
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default ParameterRenderer;

// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { InputParameter, InputType } from '../../shared/types/InputTypes';
// import { validateInput } from './InputValidator';

// type Props = {
//   param: InputParameter;
//   onChange: (param: InputParameter) => void;
//   onRemove?: () => void;
// };

// const ParameterRenderer: React.FC<Props> = ({ param, onChange, onRemove }) => {
//   const [error, setError] = useState<string | null>(null);

//   // Validate JSON live if type is JSON
//   useEffect(() => {
//     if (
//       param.type === InputType.JSON_OBJECT ||
//       param.type === InputType.JSON_ARRAY
//     ) {
//       try {
//         const parsed = JSON.parse(param.rawValue);
//         if (
//           (param.type === InputType.JSON_OBJECT && Array.isArray(parsed)) ||
//           (param.type === InputType.JSON_ARRAY && !Array.isArray(parsed))
//         ) {
//           setError(
//             `Expected ${
//               param.type === InputType.JSON_OBJECT ? 'object' : 'array'
//             }`,
//           );
//         } else {
//           setError(null);
//         }
//       } catch (e: any) {
//         setError(e.message);
//       }
//     } else {
//       setError(null);
//     }
//   }, [param.rawValue, param.type]);

//   // Format JSON on blur
//   const handleBlur = () => {
//     if (!error && param.rawValue) {
//       if (
//         param.type === InputType.JSON_OBJECT ||
//         param.type === InputType.JSON_ARRAY
//       ) {
//         try {
//           const formatted = JSON.stringify(JSON.parse(param.rawValue), null, 2);
//           onChange({ ...param, rawValue: formatted });
//         } catch {}
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerRow}>
//         <Text style={styles.label}>{param.name}</Text>

//         {onRemove && (
//           <Text style={styles.remove} onPress={onRemove}>
//             Remove
//           </Text>
//         )}
//       </View>

//       <Picker
//         selectedValue={param.type}
//         onValueChange={value =>
//           onChange({ ...param, type: value as InputType })
//         }
//       >
//         {Object.values(InputType).map(type => (
//           <Picker.Item key={type} label={type} value={type} />
//         ))}
//       </Picker>

//       <TextInput
//         style={[styles.input, error ? styles.inputError : null]}
//         multiline
//         placeholder="Paste value here"
//         value={param.rawValue}
//         onChangeText={text => onChange({ ...param, rawValue: text })}
//         onBlur={handleBlur}
//       />

//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

// export default ParameterRenderer;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  container: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: '#c00',
    marginTop: 4,
    fontSize: 12,
    fontStyle: 'italic',
  },
  remove: {
    color: '#d00',
    marginTop: 6,
    fontSize: 12,
  },
});
