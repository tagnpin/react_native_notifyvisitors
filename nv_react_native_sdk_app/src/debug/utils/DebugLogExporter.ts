// import RNFS from 'react-native-fs';
// import DebugLogsStore from '../DebugLogsStore';
// import SDKManager from '../../sdk/SDKManager';

// const EXPORT_FILE_NAME = 'sdk_debug_logs.json';

// const buildExportPayload = async () => {
//   const deviceInfo = await SDKManager.getDeviceInfo();
//   const logs = DebugLogsStore.getAll();
//   const session = DebugLogsStore.getSessionInfo();

//   return {
//     exportedAt: new Date().toISOString(),
//     device: deviceInfo,
//     session,
//     logCount: logs.length,
//     logs,
//   };
// };

// const exportJSON = async (payload: any) => {
//   const path = `${RNFS.CachesDirectoryPath}/sdk_debug_logs.json`;

//   await RNFS.writeFile(path, JSON.stringify(payload, null, 2), 'utf8');

//   return path;
// };

// const exportTXT = async (payload: any) => {
//   const lines: string[] = [];

//   const { device, session, logs } = payload;

//   lines.push('=== SDK DEBUG LOGS ===');
//   lines.push(`Exported At: ${payload.exportedAt}`);
//   lines.push('');

//   lines.push('--- DEVICE INFO ---');
//   Object.entries(device).forEach(([k, v]) => {
//     lines.push(`${k}: ${String(v)}`);
//   });

//   lines.push('');
//   lines.push('--- SESSION INFO ---');
//   lines.push(`Session ID: ${session.sessionId}`);
//   lines.push(`Started At: ${new Date(session.startedAt).toISOString()}`);
//   lines.push(`Duration (ms): ${session.durationMs}`);

//   lines.push('');
//   lines.push('--- LOGS ---');

//   logs.forEach((log: any, index: number) => {
//     lines.push('');
//     lines.push(`#${index + 1}`);
//     lines.push(`Time: ${new Date(log.timestamp).toISOString()}`);
//     lines.push(`Type: ${log.type}`);
//     lines.push(`Source: ${log.source}`);
//     lines.push(`Success: ${String(log.success)}`);
//     lines.push(`Payload: ${JSON.stringify(log.payload)}`);
//   });

//   const path = `${RNFS.CachesDirectoryPath}/sdk_debug_logs.txt`;

//   await RNFS.writeFile(path, lines.join('\n'), 'utf8');

//   return path;
// };

// export const exportDebugLogs = async () => {
//   const payload = await buildExportPayload();

//   if (!payload.logs.length) {
//     throw new Error('No logs to export');
//   }

//   const jsonPath = await exportJSON(payload);
//   const txtPath = await exportTXT(payload);

//   await Share.open({
//     urls: [`file://${jsonPath}`, `file://${txtPath}`],
//     failOnCancel: false,
//   });
// };

// export const exportDebugLogs = async () => {
//   const logs = DebugLogsStore.getAll();

//   if (!logs.length) {
//     throw new Error('No logs to export');
//   }

//   const filePath = `${RNFS.CachesDirectoryPath}/${EXPORT_FILE_NAME}`;

//   const payload = {
//     exportedAt: new Date().toISOString(),
//     logCount: logs.length,
//     logs,
//   };

//   await RNFS.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8');

//   await Share.open({
//     url: `file://${filePath}`,
//     type: 'application/json',
//     failOnCancel: false,
//   });
// };
