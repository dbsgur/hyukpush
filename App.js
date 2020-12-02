import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {notificationManager} from './src/NotificationManager';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.localNotify = null;
  }
  componentDidMount() {
    this.localNotify = notificationManager;
    this.localNotify.configure(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
  }

  onRegister(token) {
    console.log('[Notification] Register : ', token);
  }

  onNotification(notify) {
    console.log('[Notification] onNotification', notify);
  }

  onOpenNotification(notify) {
    console.log('[Notification] onOpenNotification : ', notify);
    alert('Open Notification');
  }

  onPressCancelNotification = () => {
    this.localNotify.cancelAllLocalNotification();
  };
  onPressSendNotification = () => {
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true,
    };
    this.localNotify.showNotification(
      1,
      'App Notification',
      'Local Notification',
      {}, //data
      options, //options
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressSendNotification}>
          <Text>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressCancelNotification}>
          <Text>cancel Notification</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    width: 200,
    marginTop: 20,
  },
});
