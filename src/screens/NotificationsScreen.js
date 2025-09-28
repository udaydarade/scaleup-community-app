// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useStore } from '../state/store';
// import { formatDistanceToNow } from 'date-fns';

// export default function NotificationsScreen(){
//   const { notifications } = useStore();
//   return (
//     <View style={styles.container}>
//       <Text style={styles.h1}>Notifications</Text>
//       <FlatList
//         data={notifications}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>(
//           <View style={styles.row}>
//             <View style={styles.dot} />
//             <View style={{flex:1}}>
//               <Text style={styles.text}>{item.text}</Text>
//               <Text style={styles.time}>{formatDistanceToNow(item.ts, {addSuffix:true})}</Text>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B', marginBottom:10 },
//   row:{ flexDirection:'row', gap:10, padding:12, backgroundColor:'#fff', borderRadius:14, borderWidth:1, borderColor:'#E2EDF1', marginBottom:10 },
//   dot:{ width:10, height:10, borderRadius:10, backgroundColor:'#FFC107', marginTop:8 },
//   text:{ color:'#08313B', fontWeight:'700' },
//   time:{ color:'#5B7A86', fontSize:12 },
//   empty:{ color:'#5B7A86', marginTop:20, textAlign:'center' }
// });

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useStore } from '../state/store';
import { formatDistanceToNow } from 'date-fns';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

export default function NotificationsScreen(){
  const { notifications, communities } = useStore();
  const navigation = useNavigation();

  const handleNotificationPress = (notification) => {
    // Check if the notification has a communityId
    if (notification.communityId) {
      // Find the full community object
      const community = communities.find(c => c.id === notification.communityId);
      if (community) {
        // Navigate to that community's feed
        navigation.navigate('CommunityFeed', { community });
      }
    }
    // If not, do nothing (or you could show an alert)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          // Wrap the row in a TouchableOpacity
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={{flex:1}}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.time}>{formatDistanceToNow(item.ts, {addSuffix:true})}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
      />
    </View>
  );
}

// Styles are unchanged
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
  h1:{ fontSize:22, fontWeight:'800', color:'#08313B', marginBottom:10 },
  row:{ flexDirection:'row', gap:10, padding:12, backgroundColor:'#fff', borderRadius:14, borderWidth:1, borderColor:'#E2EDF1', marginBottom:10 },
  dot:{ width:10, height:10, borderRadius:10, backgroundColor:'#FFC107', marginTop:8 },
  text:{ color:'#08313B', fontWeight:'700' },
  time:{ color:'#5B7A86', fontSize:12 },
  empty:{ color:'#5B7A86', marginTop:20, textAlign:'center' }
});