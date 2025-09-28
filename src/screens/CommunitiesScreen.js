

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