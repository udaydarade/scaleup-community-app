// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CommunitiesScreen from './src/screens/CommunitiesScreen';
// import NotificationsScreen from './src/screens/NotificationsScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import { StoreProvider } from './src/state/store';
// import { StatusBar } from 'expo-status-bar';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <StoreProvider>
//       <NavigationContainer>
//         <StatusBar style="light" />
//         <Tab.Navigator
//           screenOptions={{
//             headerStyle: { backgroundColor: '#08313B' },
//             headerTintColor: '#fff',
//             tabBarActiveTintColor: '#08313B',
//             tabBarInactiveTintColor: '#7aa0ac',
//           }}
//         >
//           <Tab.Screen name="Communities" component={CommunitiesScreen} />
//           <Tab.Screen name="Notifications" component={NotificationsScreen} />
//           <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </StoreProvider>
//   );

// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 1. Import the new Stack Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StoreProvider } from './src/state/store';
import { StatusBar } from 'expo-status-bar';

// Import all your screens, including the new one
import CommunitiesScreen from './src/screens/CommunitiesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CommunityFeedScreen from './src/screens/CommunityFeedScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // 2. Create the Stack Navigator

// 3. Move your existing Tab Navigator into its own component
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

// 4. Your main App component now uses the Stack Navigator
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
          {/* The first screen in the stack is your entire tab bar */}
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          {/* Add other screens you can navigate to here */}
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