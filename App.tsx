import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen/HomeScreen';
import {Header} from './src/components/Header';
import {RootStackParamList} from './src/types/screensTypes';
import {DetailScreen} from './src/screens/DetailScreen/DetailScreen';
import {FormScreen} from './src/screens/FormScreen/FormScreen';
import {colors} from './src/theme';
import {SafeAreaView, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: Header,
            contentStyle: styles.contentStyle,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  contentStyle: {padding: 20, backgroundColor: colors.white},
});

export default App;
