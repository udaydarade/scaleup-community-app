import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button } from 'react-native'; // Import TextInput and Button
import { useStore } from '../state/store';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post, author, onVote }) {
  const { api, refresh, user, db } = useStore();
  
  // State to manage visibility
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await api.addComment({ postId: post.id, userId: user.id, text: commentText.trim() });
    
    // Reset and give feedback
    setCommentText('');
    setShowCommentInput(false);
    Alert.alert('Success!', 'Your comment was posted and you earned 2 Karma points!');
    refresh();
  };
    const handleVoteComment = async (comment, delta) => {
    await api.voteComment({ commentId: comment.id, delta });
    refresh();
  };

  if (!author) {
    return (
      <View style={styles.card}>
        <Text>Error: Post author not found.</Text>
      </View>
    );
  }

  const commentCount = post.comments?.length || 0;

  return (
    <View style={styles.card}>
      {/* Post Text and Author Info */}
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.footer}>
        <Text style={styles.authorText}>
          by {author.name} (Karma: {author.impact || 0})
        </Text>
        <View style={styles.voteContainer}>
          <TouchableOpacity onPress={() => onVote(post, 1)}>
            <Text style={styles.voteText}>▲ {post.up}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onVote(post, -1)}>
            <Text style={styles.voteText}>▼ {post.down}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NEW Comment actions section */}
      <View style={styles.commentActions}>
        <TouchableOpacity onPress={() => setShowComments(!showComments)}>
          <Text style={styles.commentActionText}>
            {showComments ? 'Hide' : 'View'} {commentCount} Comments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCommentInput(!showCommentInput)}>
          <Text style={styles.commentActionText}>
            {showCommentInput ? 'Cancel' : 'Add Comment'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* NEW Conditional input for adding a comment */}
      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <Button title="Post" onPress={handleAddComment} color="#08313B" />
        </View>
      )}
      
      {/* Updated Display Comments section */}
      {showComments && commentCount > 0 && (
        <View style={styles.commentsContainer}>
          {post.comments.map(comment => {
            const commenter = db.users.find(u => u.id === comment.userId);
            return (
              <View key={comment.id} style={styles.comment}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentMeta}>
                    - {commenter?.name || 'Unknown'} ({formatDistanceToNow(comment.ts, { addSuffix: true })})
                  </Text>
                  {/* Vote buttons for comments */}
                  <View style={styles.commentVoteContainer}>
                    <TouchableOpacity onPress={() => handleVoteComment(comment, 1)}>
                      <Text style={styles.commentVoteText}>▲ {comment.up || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleVoteComment(comment, -1)}>
                      <Text style={styles.commentVoteText}>▼ {comment.down || 0}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.commentText}>"{comment.text}"</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// Add new and updated styles
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2EDF1' },
  postText: { fontSize: 16, color: '#08313B', marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorText: { color: '#4B6A75', fontSize: 12 },
  voteContainer: { flexDirection: 'row', gap: 15 },
  voteText: { fontSize: 16, fontWeight: 'bold', color: '#08313B' },
  
  // NEW comment action styles
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2EDF1',
    marginTop: 12,
    paddingTop: 8,
  },
  commentActionText: {
    color: '#08313B',
    fontWeight: 'bold',
  },
  
  // NEW comment input styles
  commentInputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCE1E8',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },

  // Comments section styles
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E2EDF1',
    marginTop: 12,
    paddingTop: 8,
  },
  comment: {
    backgroundColor: '#F4FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  commentText: {
    fontStyle: 'italic',
    color: '#08313B',
  },
  commentMeta: {
    fontSize: 10,
    color: '#5B7A86',
    textAlign: 'right',
    marginTop: 4,
  },

    commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E2EDF1',
    marginTop: 12,
    paddingTop: 8,
  },
  comment: {
    backgroundColor: '#F4FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentText: {
    fontStyle: 'italic',
    color: '#08313B',
  },
  commentMeta: {
    fontSize: 10,
    color: '#5B7A86',
  },
  
  // NEW styles for comment voting
  commentVoteContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  commentVoteText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B6A75',
  },
});