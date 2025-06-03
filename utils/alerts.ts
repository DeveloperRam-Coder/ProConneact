import { Alert } from 'react-native';

export const showError = (message: string) => {
  Alert.alert(
    'Error',
    message,
    [{ text: 'OK', style: 'cancel' }],
    { cancelable: false }
  );
};

export const showSuccess = (message: string) => {
  Alert.alert(
    'Success',
    message,
    [{ text: 'OK', style: 'default' }],
    { cancelable: false }
  );
};
