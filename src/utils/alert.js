// In src/utils/alert.js
import { Platform, Alert } from 'react-native';

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    // Use the browser's built-in alert on web
    alert(`${title}\n\n${message}`);
  } else {
    // Use the native alert on iOS and Android
    Alert.alert(title, message);
  }
};

export default showAlert;