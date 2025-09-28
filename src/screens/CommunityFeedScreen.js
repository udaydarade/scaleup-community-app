

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useStore } from '../state/store';
import PostCard from '../components/PostCard';


export default function CommunityFeedScreen({ route }) {
  const { community } = route.params;
  const { communities, api, refresh, user, db } = useStore();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const currentCommunity = communities.find(c => c.id === community.id);
  const isMember = currentCommunity?.members.includes(user.id);

  const sortedPosts = useMemo(() => {
    if (!currentCommunity?.posts) return [];
    
    return [...currentCommunity.posts].sort((a, b) => {
      if (sortOrder === 'mostLiked') {
        return b.up - a.up;
      }
      return b.ts - a.ts;
    });
  }, [currentCommunity?.posts, sortOrder]);

  const handleVote = async (post, delta) => {
    await api.votePost({ postId: post.id, delta });
    await refresh(); 

    const currentSort = sortOrder;
    setSortOrder(''); 
    setTimeout(() => setSortOrder(currentSort), 0);
  };
  
  const handleCreatePost = async () => {
    if (!postText.trim()) {
      return Alert.alert('Error', 'Post cannot be empty.');
    }
    await api.createPost({
      communityId: currentCommunity.id,
      userId: user.id,
      text: postText.trim(),
    });
    
    setIsModalVisible(false);
    setPostText('');
    Alert.alert('Success!', 'Your post has been created.');
    await refresh();
    const currentSort = sortOrder;
    setSortOrder('');
    setTimeout(() => setSortOrder(currentSort), 0);
  };

  const renderPost = ({ item: post }) => {
    const postAuthor = db.users.find(u => u.id === post.userId);
    return <PostCard post={post} author={postAuthor} onVote={handleVote} />;
  };

  if (!currentCommunity) {
    return <Text style={styles.empty}>Community not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPosts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        ListHeaderComponent={
          <>
            <View>
              <Text style={styles.h1}>{currentCommunity.name}</Text>
              <Text style={styles.sub}>
                {isMember
                  ? 'View posts and contribute to the community!'
                  : 'Join this community to post and comment.'
                }
              </Text>
            </View>
            
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={[styles.sortButton, sortOrder === 'newest' && styles.activeSortButton]}
                onPress={() => setSortOrder('newest')}
              >
                <Text style={[styles.sortButtonText, sortOrder === 'newest' && styles.activeSortButtonText]}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sortButton, sortOrder === 'mostLiked' && styles.activeSortButton]}
                onPress={() => setSortOrder('mostLiked')}
              >
                <Text style={[styles.sortButtonText, sortOrder === 'mostLiked' && styles.activeSortButtonText]}>Most Liked</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={<Text style={styles.empty}>No posts yet. Be the first!</Text>}
      />
      
      {isMember && (
        <TouchableOpacity style={styles.fab} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create a New Post</Text>
            <TextInput
              style={styles.input}
              placeholder="What's on your mind?"
              multiline
              value={postText}
              onChangeText={setPostText}
            />
            <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FAFC', padding: 16 },
  h1: { fontSize: 22, fontWeight: '800', color: '#08313B' },
  sub: { color: '#4B6A75', marginBottom: 16 },
  empty: { color: '#5B7A86', marginTop: 20, textAlign: 'center' },
  sortContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#E2EDF1',
    borderRadius: 8,
    padding: 4,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSortButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sortButtonText: {
    fontWeight: 'bold',
    color: '#4B6A75',
  },
  activeSortButtonText: {
    color: '#08313B',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#08313B',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    fontSize: 30,
    color: 'white',
  },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#CCE1E8',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  postButton: { backgroundColor: '#08313B', borderRadius: 10, padding: 12, elevation: 2, width: '100%' },
  postButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  closeButton: { marginTop: 15 },
  closeButtonText: { color: '#4B6A75' },
});