import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

export default function App() {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification : ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : ', notify);
      alert('Open Notification : ' + notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Push Test</Text>
      <Button title="Test" onPress={() => alert('remoteMessage')} />
      <Button
        title="Press"
        onPress={() => localNotificationService.cancelAllLocalNotifications()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import React, {Component} from 'react';
// import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import {notificationManager} from './src/NotificationManager';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.localNotify = null;
//   }
//   componentDidMount() {
//     this.localNotify = notificationManager;
//     this.localNotify.configure(
//       this.onRegister,
//       this.onNotification,
//       this.onOpenNotification,
//     );
//   }

//   onRegister(token) {
//     console.log('[Notification] Register : ', token);
//   }

//   onNotification(notify) {
//     console.log('[Notification] onNotification', notify);
//   }

//   onOpenNotification(notify) {
//     console.log('[Notification] onOpenNotification : ', notify);
//     alert('Open Notification');
//   }

//   onPressCancelNotification = () => {
//     this.localNotify.cancelAllLocalNotification();
//   };
//   onPressSendNotification = () => {
//     const options = {
//       soundName: 'default',
//       playSound: true,
//       vibrate: true,
//     };
//     this.localNotify.showNotification(
//       1,
//       'App Notification',
//       'Local Notification',
//       {}, //data
//       options, //options
//     );
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={this.onPressSendNotification}>
//           <Text>Send Notification</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={this.onPressCancelNotification}>
//           <Text>cancel Notification</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: 'pink',
//     padding: 10,
//     width: 200,
//     marginTop: 20,
//   },
// });
