import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminChat() {
  const { id } = useLocalSearchParams(); 
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Utilisation de useCallback pour mémoriser la fonction et corriger l'erreur ESLint
  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('report_id', id)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Erreur lors du chargement des messages:', error);
    } else if (data) {
      setMessages(data);
    }
  }, [id]); // La fonction est liée à l'ID du signalement

  useEffect(() => {
    fetchMessages();

    // Optionnel : Système de "Realtime" pour voir les messages arriver en direct
    const subscription = supabase
      .channel(`chat-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `report_id=eq.${id}` }, 
      (payload) => {
        setMessages((current) => [...current, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id, fetchMessages]); // fetchMessages est maintenant une dépendance stable

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('messages')
      .insert([{ 
        report_id: id, 
        content: newMessage, 
        sender_role: 'admin' 
      }]);
    
    if (error) {
      console.error('Erreur envoi:', error);
    } else {
      setNewMessage('');
      // Pas besoin de fetchMessages() ici si le Realtime (ci-dessus) est actif
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discussion Anonyme</Text>
        <Text style={styles.headerSubtitle}>ID Signalement : {id.toString().slice(0, 8)}...</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[
            styles.msgBubble, 
            item.sender_role === 'admin' ? styles.adminMsg : styles.userMsg
          ]}>
            <Text style={[
              styles.msgText, 
              item.sender_role === 'admin' ? styles.adminText : styles.userText
            ]}>
              {item.content}
            </Text>
            <Text style={styles.timeText}>
              {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={newMessage} 
          onChangeText={setNewMessage} 
          placeholder="Écrire une réponse..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendBtn, !newMessage.trim() && styles.disabledBtn]} 
          onPress={sendMessage}
          disabled={!newMessage.trim() || loading}
        >
          <Text style={styles.sendBtnText}>{loading ? "..." : "Envoyer"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 16, color: '#1d3557' },
  headerSubtitle: { fontSize: 11, color: '#888' },
  listContent: { padding: 15 },
  msgBubble: { padding: 12, borderRadius: 18, marginVertical: 5, maxWidth: '85%', elevation: 1 },
  adminMsg: { alignSelf: 'flex-end', backgroundColor: '#1d3557', borderBottomRightRadius: 2 },
  userMsg: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#eee' },
  msgText: { fontSize: 15, lineHeight: 20 },
  adminText: { color: '#fff' },
  userText: { color: '#333' },
  timeText: { fontSize: 9, marginTop: 4, alignSelf: 'flex-end', opacity: 0.7, color: 'inherit' },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#f0f2f5', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8, marginRight: 10, fontSize: 15, maxHeight: 100 },
  sendBtn: { backgroundColor: '#1d3557', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, justifyContent: 'center' },
  disabledBtn: { backgroundColor: '#ccc' },
  sendBtnText: { color: '#fff', fontWeight: 'bold' }
});