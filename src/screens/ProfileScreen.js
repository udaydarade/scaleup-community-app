// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { useStore } from '../state/store';

// export default function ProfileScreen(){
//   const { user, communities } = useStore();
//   const myPosts = communities.flatMap(c => c.posts.filter(p => p.userId === user.id).map(p => ({...p, community:c.name})));
//   return (
//     <View style={styles.container}>
//       <Text style={styles.h1}>Profile</Text>
//       <View style={styles.card}>
//         <Text style={styles.name}>{user.name}</Text>
//         <Text style={styles.kpi}>Impact Points: <Text style={{color:'#08313B', fontWeight:'800'}}>{user.impact||0}</Text></Text>
//         <Text style={styles.badge}>Badges: {user.badges?.length ? user.badges.join(', ') : '—'}</Text>
//       </View>
//       <Text style={styles.section}>Your Posts</Text>
//       <FlatList
//         data={myPosts}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>(
//           <View style={styles.post}>
//             <Text style={styles.pTitle}>{item.text}</Text>
//             <Text style={styles.pMeta}>{item.community} • ▲{item.up} ▼{item.down}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.empty}>You haven’t posted yet. Join a community and post!</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B', marginBottom:10 },
//   card:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
//   name:{ fontSize:18, fontWeight:'800', color:'#08313B' },
//   kpi:{ color:'#4B6A75', marginTop:4 },
//   badge:{ color:'#4B6A75', marginTop:2 },
//   section:{ marginTop:12, marginBottom:8, fontWeight:'800', color:'#08313B' },
//   post:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:10 },
//   pTitle:{ color:'#08313B', fontWeight:'700' },
//   pMeta:{ color:'#5B7A86', fontSize:12, marginTop:4 },
//   empty:{ color:'#5B7A86', marginTop:20, textAlign:'center' }
// });


import React, { useState, useMemo } from 'react'; // Import useState and useMemo
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../state/store';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';

export default function ProfileScreen(){
  const { user, communities } = useStore();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Posts'); // State for active tab

  // Prepare data for all three tabs using useMemo for efficiency
  const { myPosts, myComments, myActivity } = useMemo(() => {
    const posts = [];
    const comments = [];
    const activity = [];

    communities.forEach(c => {
      c.posts.forEach(p => {
        // Find user's posts
        if (p.userId === user.id) {
          posts.push({ ...p, community: c });
        }
        // Find user's comments
        if (p.comments) {
          p.comments.forEach(comment => {
            if (comment.userId === user.id) {
              comments.push({ ...comment, post: p, community: c });
            }
          });
        }
        // This is a simplified activity feed - in a real app you'd track votes
        // For now, we'll just show posts they've interacted with (commented on)
        if (p.comments?.some(com => com.userId === user.id) || p.userId === user.id) {
           activity.push({ ...p, community: c, type: p.userId === user.id ? 'Posted' : 'Commented' });
        }
      });
    });

    return { myPosts: posts, myComments: comments, myActivity: activity };
  }, [communities, user.id]);

  const goToPost = (community) => {
    navigation.navigate('CommunityFeed', { community });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Comments':
        return (
          <FlatList
            data={myComments}
            keyExtractor={item => item.id}
            renderItem={({item})=>(
              <TouchableOpacity onPress={() => goToPost(item.community)}>
                <View style={styles.item}>
                  <Text style={styles.pMeta}>You commented:</Text>
                  <Text style={styles.pTitle}>"{item.text}"</Text>
                  <Text style={styles.pMeta}>in {item.community.name} • {formatDistanceToNow(item.ts, {addSuffix:true})}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>You haven’t commented yet.</Text>}
          />
        );
      case 'Activity':
        return (
          <FlatList
            data={myActivity}
            keyExtractor={item => item.id}
            renderItem={({item})=>(
              <TouchableOpacity onPress={() => goToPost(item.community)}>
                <View style={styles.item}>
                  <Text style={styles.pMeta}>You {item.type} in {item.community.name}:</Text>
                  <Text style={styles.pTitle}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>You don't have any activity yet.</Text>}
          />
        );
      case 'Posts':
      default:
        return (
          <FlatList
            data={myPosts}
            keyExtractor={item => item.id}
            renderItem={({item})=>(
              <TouchableOpacity onPress={() => goToPost(item.community)}>
                <View style={styles.item}>
                  <Text style={styles.pTitle}>{item.text}</Text>
                  <Text style={styles.pMeta}>{item.community.name} • ▲{item.up} ▼{item.down}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>You haven’t posted yet.</Text>}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Card (unchanged) */}
      <Text style={styles.h1}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.kpi}>Impact Points: <Text style={{fontWeight:'800'}}>{user.impact||0}</Text></Text>
        <Text style={styles.badgeTitle}>Badges:</Text>
        {user.badges && user.badges.length > 0 ? (
          user.badges.map((badge, index) => <Text key={index} style={styles.badge}>{badge}</Text>)
        ) : (
          <Text style={styles.noBadge}>No badges yet. Keep contributing!</Text>
        )}
      </View>
      
      {/* Custom Tab Navigator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'Posts' && styles.activeTab]} onPress={() => setActiveTab('Posts')}>
          <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Comments' && styles.activeTab]} onPress={() => setActiveTab('Comments')}>
          <Text style={[styles.tabText, activeTab === 'Comments' && styles.activeTabText]}>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Activity' && styles.activeTab]} onPress={() => setActiveTab('Activity')}>
          <Text style={[styles.tabText, activeTab === 'Activity' && styles.activeTabText]}>Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally Rendered Content */}
      {renderContent()}
    </View>
  );
}

// Add new styles for the tabs and list items
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
  h1:{ fontSize:22, fontWeight:'800', color:'#08313B', marginBottom:10 },
  card:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
  name:{ fontSize:18, fontWeight:'800', color:'#08313B' },
  kpi:{ color:'#4B6A75', marginTop:4, marginBottom: 8 },
  badgeTitle: { color: '#4B6A75', fontWeight: 'bold' },
  badge:{ color:'#08313B', marginTop:4, marginLeft: 10, fontWeight: '500' },
  noBadge: { color: '#7aa0ac', fontStyle: 'italic', marginTop: 4, marginLeft: 10 },
  
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E2EDF1',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    color: '#4B6A75',
    fontWeight: '700',
  },
  activeTabText: {
    color: '#08313B',
  },

  // Generic item style for lists
  item:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:10 },
  pTitle:{ color:'#08313B', fontWeight:'700' },
  pMeta:{ color:'#5B7A86', fontSize:12, marginBottom:4 },
  empty:{ color:'#5B7A86', marginTop:20, textAlign:'center' }
});