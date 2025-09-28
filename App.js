

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StoreProvider } from './src/state/store';
import { StatusBar } from 'expo-status-bar';

import CommunitiesScreen from './src/screens/CommunitiesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CommunityFeedScreen from './src/screens/CommunityFeedScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#08313B' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#08313B',
        tabBarInactiveTintColor: '#7aa0ac',
      }}
    >
      <Tab.Screen name="CommunitiesTab" component={CommunitiesScreen} options={{title: 'Communities'}} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#08313B' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen 
            name="CommunityFeed" 
            component={CommunityFeedScreen}
            options={({ route }) => ({ title: route.params.community.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}