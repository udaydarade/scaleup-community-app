// // import React, { useMemo, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
// // import { useStore } from '../state/store';
// // import CommunityCard from '../components/CommunityCard';

// // export default function CommunitiesScreen(){
// //   const { communities, api, refresh, user } = useStore();
// //   const parents = useMemo(()=> communities.filter(c => !c.parentId), [communities]);
// //   const children = useMemo(()=> communities.filter(c => c.parentId), [communities]);
// //   const [name, setName] = useState('');
// //   const [parentId, setParentId] = useState('');

// //   const create = async ()=>{
// //     if(!name.trim()) return;
// //     await api.createCommunity({ name: name.trim(), parentId: parentId || null });
// //     setName(''); setParentId('');
// //     refresh();
// //   };

// //   const join = async (c)=>{
// //     await api.joinCommunity({ userId: user.id, communityId: c.id });
// //     refresh();
// //   };

// //   const autoJoin = async (c)=>{
// //     await api.autoJoinChild({ userId: user.id, parentId: c.id });
// //     refresh();
// //   };

// //   const openCommunity = (c)=>{
// //     Alert.prompt('New Post in '+c.name, 'Type something to post', async (text)=>{
// //       if(!text) return;
// //       await api.createPost({ communityId: c.id, userId: user.id, text });
// //       refresh();
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.h1}>Communities</Text>
// //         <Text style={styles.sub}>Create parent or sub-communities; join & auto-join flows</Text>
// //       </View>

// //       <View style={styles.form}>
// //         <Text style={styles.label}>Create community</Text>
// //         <TextInput style={styles.input} placeholder="Name (e.g., Hostel 8)" value={name} onChangeText={setName} />
// //         <TextInput style={styles.input} placeholder="Parent community ID (optional)" value={parentId} onChangeText={setParentId} />
// //         <TouchableOpacity style={styles.btn} onPress={create}><Text style={styles.btnText}>Create</Text></TouchableOpacity>
// //       </View>

// //       <Text style={styles.section}>Parent communities</Text>
// //       <FlatList
// //         data={parents}
// //         keyExtractor={i=>i.id}
// //         renderItem={({item})=>(
// //           <View>
// //             <CommunityCard item={item} onPress={()=>openCommunity(item)} />
// //             <View style={styles.row}>
// //               <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}><Text style={styles.smallText}>Join</Text></TouchableOpacity>
// //               <TouchableOpacity style={[styles.smallBtn,{backgroundColor:'#00D1B2'}]} onPress={()=>autoJoin(item)}><Text style={[styles.smallText,{color:'#042a2a'}]}>Auto-Join Child</Text></TouchableOpacity>
// //             </View>
// //           </View>
// //         )}
// //       />

// //       <Text style={styles.section}>Sub-communities</Text>
// //       <FlatList
// //         data={children}
// //         keyExtractor={i=>i.id}
// //         renderItem={({item})=>(
// //           <View>
// //             <CommunityCard item={item} onPress={()=>openCommunity(item)} />
// //             <View style={styles.row}>
// //               <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}><Text style={styles.smallText}>Join</Text></TouchableOpacity>
// //             </View>
// //           </View>
// //         )}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
// //   header:{ marginBottom:8 },
// //   h1:{ fontSize:22, fontWeight:'800', color:'#08313B' },
// //   sub:{ color:'#4B6A75' },
// //   form:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
// //   label:{ fontWeight:'700', color:'#08313B', marginBottom:6 },
// //   input:{ borderWidth:1, borderColor:'#CCE1E8', borderRadius:10, padding:10, marginBottom:8, backgroundColor:'#fff' },
// //   btn:{ backgroundColor:'#08313B', padding:12, borderRadius:10, alignItems:'center' },
// //   btnText:{ color:'#fff', fontWeight:'800' },
// //   section:{ marginTop:12, marginBottom:8, fontWeight:'800', color:'#08313B' },
// //   row:{ flexDirection:'row', gap:8, marginBottom:10 },
// //   smallBtn:{ backgroundColor:'#08313B', paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
// //   smallText:{ color:'#fff', fontWeight:'700' }
// // });

// // In CommunitiesScreen.js

// import React, { useMemo, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { useStore } from '../state/store';
// import CommunityCard from '../components/CommunityCard';

// export default function CommunitiesScreen(){
//   const { communities, api, refresh, user } = useStore();
//   const parents = useMemo(()=> communities.filter(c => !c.parentId), [communities]);
//   const children = useMemo(()=> communities.filter(c => c.parentId), [communities]);
//   const [name, setName] = useState('');
//   const [parentId, setParentId] = useState('');

//   const create = async ()=>{
//     if(!name.trim()) return;
//     await api.createCommunity({ name: name.trim(), parentId: parentId || null });
//     Alert.alert('Success!', `Community "${name.trim()}" created.`);
//     setName(''); setParentId('');
//     refresh();
//   };

//   // UPDATED join function with success alert
//   const join = async (c)=>{
//     await api.joinCommunity({ userId: user.id, communityId: c.id });
//     Alert.alert('Success!', `You have joined ${c.name}.`);
//     refresh();
//   };
  
//   // UPDATED autoJoin function with success alert
//   const autoJoin = async (c)=>{
//     await api.autoJoinChild({ userId: user.id, parentId: c.id });
//     Alert.alert('Success!', `You have auto-joined all sub-communities of ${c.name}.`);
//     refresh();
//   };

//   const openCommunity = (c)=>{
//     Alert.prompt('New Post in '+c.name, 'Type something to post', async (text)=>{
//       if(!text) return;
//       await api.createPost({ communityId: c.id, userId: user.id, text });
//       refresh();
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* The header and form sections remain the same */}
//       <View style={styles.header}>
//         <Text style={styles.h1}>Communities</Text>
//         <Text style={styles.sub}>Create parent or sub-communities; join & auto-join flows</Text>
//       </View>
//       <View style={styles.form}>
//         <Text style={styles.label}>Create community</Text>
//         <TextInput style={styles.input} placeholder="Name (e.g., Hostel 8)" value={name} onChangeText={setName} />
//         <TextInput style={styles.input} placeholder="Parent community ID (optional)" value={parentId} onChangeText={setParentId} />
//         <TouchableOpacity style={styles.btn} onPress={create}><Text style={styles.btnText}>Create</Text></TouchableOpacity>
//       </View>

//       <Text style={styles.section}>Parent communities</Text>
//       <FlatList
//         data={parents}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           // Check if the user is a member of this community
//           const isMember = item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   <Text style={styles.joinedText}>✓ Joined</Text>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//                 <TouchableOpacity style={[styles.smallBtn,{backgroundColor:'#00D1B2'}]} onPress={()=>autoJoin(item)}>
//                   <Text style={[styles.smallText,{color:'#042a2a'}]}>Auto-Join Child</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         }}
//       />

//       <Text style={styles.section}>Sub-communities</Text>
//       <FlatList
//         data={children}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           // Check if the user is a member of this community
//           const isMember = item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   <Text style={styles.joinedText}>✓ Joined</Text>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// // Add the new "joinedText" style
// const styles = StyleSheet.create({
//   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   header:{ marginBottom:8 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B' },
//   sub:{ color:'#4B6A75' },
//   form:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
//   label:{ fontWeight:'700', color:'#08313B', marginBottom:6 },
//   input:{ borderWidth:1, borderColor:'#CCE1E8', borderRadius:10, padding:10, marginBottom:8, backgroundColor:'#fff' },
//   btn:{ backgroundColor:'#08313B', padding:12, borderRadius:10, alignItems:'center' },
//   btnText:{ color:'#fff', fontWeight:'800' },
//   section:{ marginTop:12, marginBottom:8, fontWeight:'800', color:'#08313B' },
//   row:{ flexDirection:'row', gap:8, marginBottom:10, alignItems: 'center' }, // Added alignItems
//   smallBtn:{ backgroundColor:'#08313B', paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
//   smallText:{ color:'#fff', fontWeight:'700' },
//   joinedText:{ color: '#2E7D32', fontWeight: 'bold' } // Style for the "Joined" text
// });

// import React, { useMemo, useState } from 'react';
// // Import Modal from react-native
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
// import { useStore } from '../state/store';
// import CommunityCard from '../components/CommunityCard';
// import { useNavigation } from '@react-navigation/native';


// export default function CommunitiesScreen(){
//   const { communities, api, refresh, user } = useStore();
//   const parents = useMemo(()=> communities.filter(c => !c.parentId), [communities]);
//   const children = useMemo(()=> communities.filter(c => c.parentId), [communities]);
//   const navigation = useNavigation();
  
//   // Form state
//   const [name, setName] = useState('');
//   const [parentId, setParentId] = useState(null); // Will store the ID of the selected parent
//   const [parentName, setParentName] = useState(''); // Will store the NAME for display
//   const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

//   // ... (keep the create, join, autoJoin, and openCommunity functions as they are)
//   const create = async ()=>{
//     if(!name.trim()) return;
//       if (!parentId && user.impact < 10) {
//       Alert.alert(
//         'Insufficient Karma',
//         'You need at least 10 Karma points to create a new parent community.'
//       );
//       return; // Stop the function here
//     }
//     await api.createCommunity({ name: name.trim(), parentId: parentId || null });
//     Alert.alert('Success!', `Community "${name.trim()}" created.`);
//     setName(''); setParentId(null); setParentName(''); // Reset all form fields
//     refresh();
//   };
  
//   const join = async (c)=>{
//     await api.joinCommunity({ userId: user.id, communityId: c.id });
//     Alert.alert('Success!', `You have joined ${c.name}.`);
//     refresh();
//   };
  
//     const leave = async (c) => {
//     await api.leaveCommunity({ userId: user.id, communityId: c.id });
//     Alert.alert('Success!', `You have left ${c.name}.`);
//     refresh();
//   };

//   const autoJoin = async (c)=>{
//     await api.autoJoinChild({ userId: user.id, parentId: c.id });
//     Alert.alert('Success!', `You have auto-joined all sub-communities of ${c.name}.`);
//     refresh();
//   };

//   const openCommunity = (c)=>{
//     navigation.navigate('CommunityFeed', { community: c });
//   };

//   const selectParent = (parent) => {
//     setParentId(parent.id);
//     setParentName(parent.name);
//     setIsModalVisible(false);
//   };

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredParents = useMemo(() => 
//     communities.filter(c => !c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase())),
//     [communities, searchQuery]
//   );

//   const filteredChildren = useMemo(() => 
//     communities.filter(c => c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase())),
//     [communities, searchQuery]
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header is the same */}
//       <View style={styles.header}>
//         <Text style={styles.h1}>Communities</Text>
//         <Text style={styles.sub}>Create parent or sub-communities; join & auto-join flows</Text>
//       </View>

//       {/* UPDATED FORM */}
//       <View style={styles.form}>
//         <Text style={styles.label}>Create community</Text>
//         <TextInput style={styles.input} placeholder="Name (e.g., Hostel 8)" value={name} onChangeText={setName} />
        
//         {/* This TouchableOpacity replaces the old TextInput for Parent ID */}
//         <TouchableOpacity style={styles.input} onPress={() => setIsModalVisible(true)}>
//           <Text style={parentName ? styles.selectedText : styles.placeholderText}>
//             {parentName || 'Select parent community (optional)'}
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.btn} onPress={create}><Text style={styles.btnText}>Create</Text></TouchableOpacity>
//       </View>

//       <View style={styles.header}>
//         <Text style={styles.h1}>Communities</Text>
//       </View>

//       {/* NEW Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for a community..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>


//       {/* MODAL FOR PARENT SELECTION */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalTitle}>Select a Parent Community</Text>
//             <FlatList
//               data={parents}
//               keyExtractor={item => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.modalItem} onPress={() => selectParent(item)}>
//                   <Text style={styles.modalItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <Text style={styles.section}>Parent communities</Text>
//       <FlatList
//         data={parents}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           const isMember = item.members && item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   // If member, show a "Leave" button instead of "Joined" text
//                   <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(item)}>
//                     <Text style={styles.leaveText}>Leave</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//                 <TouchableOpacity style={[styles.smallBtn,{backgroundColor:'#00D1B2'}]} onPress={()=>autoJoin(item)}>
//                   <Text style={[styles.smallText,{color:'#042a2a'}]}>Auto-Join Child</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         }}
//       />
      
//       <Text style={styles.section}>Sub-communities</Text>
//       <FlatList
//         data={children}
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           const isMember = item.members && item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   // Also show the "Leave" button here
//                   <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(item)}>
//                     <Text style={styles.leaveText}>Leave</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// // Add new styles for the modal and updated form
// const styles = StyleSheet.create({
//   //... keep all your existing styles
//   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   header:{ marginBottom:8 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B' },
//   sub:{ color:'#4B6A75' },
//   form:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
//   label:{ fontWeight:'700', color:'#08313B', marginBottom:6 },
//   input:{ borderWidth:1, borderColor:'#CCE1E8', borderRadius:10, padding:10, marginBottom:8, backgroundColor:'#fff', justifyContent: 'center' },
//   btn:{ backgroundColor:'#08313B', padding:12, borderRadius:10, alignItems:'center' },
//   btnText:{ color:'#fff', fontWeight:'800' },
//   section:{ marginTop:12, marginBottom:8, fontWeight:'800', color:'#08313B' },
//   row:{ flexDirection:'row', gap:8, marginBottom:10, alignItems: 'center' },
//   smallBtn:{ backgroundColor:'#08313B', paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
//   smallText:{ color:'#fff', fontWeight:'700' },
//   joinedText:{ color: '#2E7D32', fontWeight: 'bold' },
  
//   // New styles for the selection input
//   placeholderText: { color: '#A0A0A0' },
//   selectedText: { color: '#000' },

//   // New styles for the modal
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '80%' },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   modalItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', width: '100%', alignItems: 'center' },
//   modalItemText: { fontSize: 16 },
//   closeButton: { backgroundColor: '#08313B', borderRadius: 10, padding: 10, elevation: 2, marginTop: 15 },
//   closeButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
//     row:{ flexDirection:'row', gap:8, marginBottom:10, alignItems: 'center' },
//   smallBtn:{ backgroundColor:'#08313B', paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
//   smallText:{ color:'#fff', fontWeight:'700' },
  
//   // New styles for the Leave button
//   leaveBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#FF3860' },
//   leaveText: { color: '#FF3860', fontWeight: '700' },


//     container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   header:{ marginBottom:8 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B' },

//   // New Search Bar styles
//   searchContainer: {
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E2EDF1',
//   },
// });

// import React, { useMemo, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
// import { useStore } from '../state/store';
// import CommunityCard from '../components/CommunityCard';
// import { useNavigation } from '@react-navigation/native';

// export default function CommunitiesScreen(){
//   const { communities, api, refresh, user } = useStore();
//   const navigation = useNavigation();
  
//   const [name, setName] = useState('');
//   const [parentId, setParentId] = useState(null);
//   const [parentName, setParentName] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // The original unfiltered list of parents (for the creation modal)
//   const parents = useMemo(()=> communities.filter(c => !c.parentId), [communities]);

//   // Filtered lists for display based on the search query
//   const filteredParents = useMemo(() => 
//     communities.filter(c => !c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase())),
//     [communities, searchQuery]
//   );

//   const filteredChildren = useMemo(() => 
//     communities.filter(c => c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase())),
//     [communities, searchQuery]
//   );

//   const create = async ()=>{
//     if(!name.trim()) return;
//     if (!parentId && user.impact < 10) {
//       Alert.alert('Insufficient Karma', 'You need at least 10 Karma points to create a new parent community.');
//       return;
//     }
//     await api.createCommunity({ name: name.trim(), parentId: parentId || null });
//     Alert.alert('Success!', `Community "${name.trim()}" created.`);
//     setName(''); setParentId(null); setParentName('');
//     refresh();
//   };
  
//   const join = async (c)=>{
//     await api.joinCommunity({ userId: user.id, communityId: c.id });
//     Alert.alert('Success!', `You have joined ${c.name}.`);
//     refresh();
//   };
  
//   const leave = async (c) => {
//     await api.leaveCommunity({ userId: user.id, communityId: c.id });
//     Alert.alert('Success!', `You have left ${c.name}.`);
//     refresh();
//   };

//   const autoJoin = async (c)=>{
//     await api.autoJoinChild({ userId: user.id, parentId: c.id });
//     Alert.alert('Success!', `You have auto-joined all sub-communities of ${c.name}.`);
//     refresh();
//   };

//   const openCommunity = (c)=>{
//     navigation.navigate('CommunityFeed', { community: c });
//   };

//   const selectParent = (parent) => {
//     setParentId(parent.id);
//     setParentName(parent.name);
//     setIsModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.h1}>Communities</Text>
//         <Text style={styles.sub}>Create, join, and search for communities</Text>
//       </View>

//       <View style={styles.form}>
//         <Text style={styles.label}>Create community</Text>
//         <TextInput style={styles.input} placeholder="Name (e.g., Hostel 8)" value={name} onChangeText={setName} />
//         <TouchableOpacity style={styles.input} onPress={() => setIsModalVisible(true)}>
//           <Text style={parentName ? styles.selectedText : styles.placeholderText}>
//             {parentName || 'Select parent community (optional)'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btn} onPress={create}><Text style={styles.btnText}>Create</Text></TouchableOpacity>
//       </View>

//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for a community..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalTitle}>Select a Parent Community</Text>
//             <FlatList
//               data={parents} // The modal should always show all parents, not filtered ones
//               keyExtractor={item => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.modalItem} onPress={() => selectParent(item)}>
//                   <Text style={styles.modalItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <Text style={styles.section}>Parent communities</Text>
//       <FlatList
//         data={filteredParents} // Use the filtered data for the list
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           const isMember = item.members && item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(item)}>
//                     <Text style={styles.leaveText}>Leave</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//                 <TouchableOpacity style={[styles.smallBtn,{backgroundColor:'#00D1B2'}]} onPress={()=>autoJoin(item)}>
//                   <Text style={[styles.smallText,{color:'#042a2a'}]}>Auto-Join Child</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         }}
//       />
      
//       <Text style={styles.section}>Sub-communities</Text>
//       <FlatList
//         data={filteredChildren} // Use the filtered data for the list
//         keyExtractor={i=>i.id}
//         renderItem={({item})=>{
//           const isMember = item.members && item.members.includes(user.id);
//           return (
//             <View>
//               <CommunityCard item={item} onPress={()=>openCommunity(item)} />
//               <View style={styles.row}>
//                 {isMember ? (
//                   <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(item)}>
//                     <Text style={styles.leaveText}>Leave</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
//                     <Text style={styles.smallText}>Join</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// // Consolidated and cleaned up all styles
// const styles = StyleSheet.create({
//   container:{ flex:1, backgroundColor:'#F4FAFC', padding:16 },
//   header:{ marginBottom:8 },
//   h1:{ fontSize:22, fontWeight:'800', color:'#08313B' },
//   sub:{ color:'#4B6A75' },
//   form:{ backgroundColor:'#fff', borderRadius:14, padding:12, borderWidth:1, borderColor:'#E2EDF1', marginBottom:12 },
//   label:{ fontWeight:'700', color:'#08313B', marginBottom:6 },
//   input:{ borderWidth:1, borderColor:'#CCE1E8', borderRadius:10, padding:10, marginBottom:8, backgroundColor:'#fff', justifyContent: 'center' },
//   btn:{ backgroundColor:'#08313B', padding:12, borderRadius:10, alignItems:'center' },
//   btnText:{ color:'#fff', fontWeight:'800' },
//   section:{ marginTop:12, marginBottom:8, fontWeight:'800', color:'#08313B' },
//   row:{ flexDirection:'row', gap:8, marginBottom:10, alignItems: 'center' },
//   smallBtn:{ backgroundColor:'#08313B', paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
//   smallText:{ color:'#fff', fontWeight:'700' },
//   joinedText:{ color: '#2E7D32', fontWeight: 'bold' },
//   placeholderText: { color: '#A0A0A0' },
//   selectedText: { color: '#000' },
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '80%' },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   modalItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', width: '100%', alignItems: 'center' },
//   modalItemText: { fontSize: 16 },
//   closeButton: { backgroundColor: '#08313B', borderRadius: 10, padding: 10, elevation: 2, marginTop: 15 },
//   closeButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
//   leaveBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#FF3860' },
//   leaveText: { color: '#FF3860', fontWeight: '700' },
//   searchContainer: {
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E2EDF1',
//   },
// });

import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TextInput, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { useStore } from '../state/store';
import CommunityCard from '../components/CommunityCard';
import { useNavigation } from '@react-navigation/native';

export default function CommunitiesScreen(){
  const { communities, api, refresh, user } = useStore();
  const navigation = useNavigation();
  
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isParentModalVisible, setParentModalVisible] = useState(false);
  
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(null);
  const [parentName, setParentName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const parents = useMemo(()=> communities.filter(c => !c.parentId), [communities]);

  const communitySections = useMemo(() => {
    const filteredParents = communities.filter(c => !c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredChildren = communities.filter(c => c.parentId && c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const sections = [];
    if (filteredParents.length > 0) {
      sections.push({ title: 'Parent communities', data: filteredParents });
    }
    if (filteredChildren.length > 0) {
      sections.push({ title: 'Sub-communities', data: filteredChildren });
    }
    return sections;
  }, [communities, searchQuery]);

  const create = async ()=>{
    if(!name.trim()) return;
    if (!parentId && user.impact < 10) {
      Alert.alert('Insufficient Karma', 'You need at least 10 Karma points to create a new parent community.');
      return;
    }
    await api.createCommunity({ name: name.trim(), parentId: parentId || null });
    Alert.alert('Success!', `Community "${name.trim()}" created.`);
    setName(''); setParentId(null); setParentName('');
    setCreateModalVisible(false);
    refresh();
  };
  
  const join = async (c)=>{
    await api.joinCommunity({ userId: user.id, communityId: c.id });
    Alert.alert('Success!', `You have joined ${c.name}.`);
    refresh();
  };
  
  const leave = async (c) => {
    await api.leaveCommunity({ userId: user.id, communityId: c.id });
    Alert.alert('Success!', `You have left ${c.name}.`);
    refresh();
  };

  const autoJoin = async (c)=>{
    await api.autoJoinChild({ userId: user.id, parentId: c.id });
    Alert.alert('Success!', `You have auto-joined all sub-communities of ${c.name}.`);
    refresh();
  };

  const openCommunity = (c)=>{
    navigation.navigate('CommunityFeed', { community: c });
  };

  const selectParent = (parent) => {
    setParentId(parent.id);
    setParentName(parent.name);
    setParentModalVisible(false);
  };
  
  const renderCommunity = ({ item, section }) => {
    const isMember = item.members && item.members.includes(user.id);
    return (
      <View style={styles.listItem}>
        <CommunityCard item={item} onPress={()=>openCommunity(item)} />
        <View style={styles.row}>
          {isMember ? (
            <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(item)}>
              <Text style={styles.leaveText}>Leave</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.smallBtn} onPress={()=>join(item)}>
              <Text style={styles.smallText}>Join</Text>
            </TouchableOpacity>
          )}
          {section.title === 'Parent communities' && (
            <TouchableOpacity style={[styles.smallBtn,{backgroundColor:'#00D1B2'}]} onPress={()=>autoJoin(item)}>
              <Text style={[styles.smallText,{color:'#042a2a'}]}>Auto-Join Child</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={communitySections}
        keyExtractor={(item) => item.id}
        renderItem={renderCommunity}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.section}>{title}</Text>}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.h1}>Communities</Text>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a community..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      
      <TouchableOpacity style={styles.fab} onPress={() => setCreateModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create a New Community</Text>
            <TextInput style={styles.input} placeholder="Name (e.g., Hostel 8)" value={name} onChangeText={setName} />
            <TouchableOpacity style={styles.input} onPress={() => setParentModalVisible(true)}>
              <Text style={parentName ? styles.selectedText : styles.placeholderText}>
                {parentName || 'Select parent community (optional)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={create}><Text style={styles.btnText}>Create</Text></TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCreateModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isParentModalVisible}
        onRequestClose={() => setParentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select a Parent Community</Text>
            <FlatList
              data={parents}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectParent(item)}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setParentModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FAFC' },
  header: { marginBottom: 8, paddingTop: 16 },
  h1: { fontSize: 22, fontWeight: '800', color: '#08313B' },
  section: { marginTop: 16, marginBottom: 8, fontWeight: '800', color: '#08313B', fontSize: 16 },
  listItem: { marginBottom: 4 },
  row: { flexDirection: 'row', gap: 8, marginTop: -4, marginBottom: 10, paddingLeft: 4 },
  smallBtn: { backgroundColor: '#08313B', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  smallText: { color: '#fff', fontWeight: '700' },
  leaveBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#FF3860' },
  leaveText: { color: '#FF3860', fontWeight: '700' },
  searchContainer: { marginBottom: 8 },
  searchInput: { backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#E2EDF1' },
  fab: { position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', right: 30, bottom: 30, backgroundColor: '#08313B', borderRadius: 30, elevation: 8, shadowColor: '#000', shadowRadius: 5, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } },
  fabText: { fontSize: 30, color: 'white' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCE1E8', borderRadius: 10, padding: 10, marginBottom: 15, backgroundColor: '#fff', justifyContent: 'center', width: '100%' },
  btn: { backgroundColor: '#08313B', padding: 12, borderRadius: 10, alignItems: 'center', width: '100%' },
  btnText: { color: '#fff', fontWeight: '800' },
  placeholderText: { color: '#A0A0A0' },
  selectedText: { color: '#000' },
  modalItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', width: '100%', alignItems: 'center' },
  modalItemText: { fontSize: 16 },
  closeButton: { marginTop: 15 },
  closeButtonText: { color: '#4B6A75' },
});