import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet
} from 'react-native';
import {
  getFirestore, collection, query, where,
  onSnapshot, addDoc, orderBy, serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Comment from '../../components/Comment';

const db = getFirestore();

export default function BookclubDiscussionScreen({ route }) {
  const { bookClubId, bookId, chapter } = route.params;
  const [discussionId, setDiscussionId] = useState(null);
  const [comments, setComments]       = useState([]);
  const [newComment, setNewComment]   = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  // 1️⃣ Lookup or create discussion in the single discussions subcollection
  // 1️⃣ Lookup or create discussion under the specific book
useEffect(() => {
    // point at the book’s discussions subcollection
    const discRef = collection(
      db,
      'bookclubs', bookClubId,
      'books',     bookId,
      'discussions'
    );
    const q = query(
      discRef,
      where('chapter', '==', chapter)
    );
  
    const unsub = onSnapshot(q, async snap => {
      if (!snap.empty) {
        setDiscussionId(snap.docs[0].id);
      } else {
        const docRef = await addDoc(discRef, {
          chapter,
          createdBy: user.uid,
          createdAt: serverTimestamp()
        });
        setDiscussionId(docRef.id);
      }
    });
  
    return unsub;
  }, [bookClubId, bookId, chapter, user.uid]);
  

  // 2️⃣ Listen for comments on that discussion
  useEffect(() => {
    if (!discussionId) return;
    // comments under book → discussions → comments
    const commentsRef = collection(
        db,
        'bookclubs', bookClubId,
        'books',     bookId,
        'discussions', discussionId,
        'comments'
    );
    
    const q = query(commentsRef, orderBy('createdAt','asc'));
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [bookClubId, discussionId]);

  // 3️⃣ Handler to post new comment
  const handleSend = async () => {
    if (!newComment.trim() || !discussionId) return;
    const commentsRef = collection(
      db, 'bookclubs', bookClubId,
      'books', bookId,
      'discussions', discussionId,
      'comments'
    );
    await addDoc(commentsRef, {
      text: newComment,
      displayName: user.displayName || 'Anonymous',
      createdAt: serverTimestamp()
    });
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Discussion – Chapter {chapter.replace(/[^\d]/g,'')}
      </Text>

      {comments.length === 0
        ? <Text style={styles.noComments}>No comments yet.</Text>
        : <FlatList
            data={comments}
            keyExtractor={i=>i.id}
            renderItem={({item})=>(
              <Comment
                displayName={item.displayName}
                timestamp={item.createdAt}
                text={item.text}
              />
            )}
            contentContainerStyle={styles.commentList}
          />
      }

      <TextInput
        style={styles.input}
        placeholder="Write a comment…"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  header:    { fontSize:20, fontWeight:'600', marginBottom:12 },
  noComments:{ textAlign:'center', color:'gray', marginVertical:12 },
  commentList:{ paddingBottom:12 },
  input:     {
    borderWidth:1, borderColor:'#ccc', borderRadius:8,
    padding:10, marginVertical:6
  },
});
