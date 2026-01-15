import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import * as SecureStore from 'expo-secure-store';

export default function ContactScreen() {
  const [report, setReport] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('user_report_token');
    } else {
      return await SecureStore.getItemAsync('user_report_token');
    }
  };

  const loadConversation = useCallback(async () => {
    setLoading(true);
    try {
      const savedToken = await getToken();
      
      if (savedToken) {
        const { data: reportData } = await supabase
          .from('reports')
          .select('*')
          .eq('user_token', savedToken)
          .maybeSingle(); // maybeSingle évite une erreur si rien n'est trouvé

        if (reportData) {
          setReport(reportData);
          const { data: msgData } = await supabase
            .from('messages')
            .select('*')
            .eq('report_id', reportData.id)
            .order('created_at', { ascending: true });
          
          if (msgData) setMessages(msgData);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !report) return;

    const { error } = await supabase
      .from('messages')
      .insert([{ 
        report_id: report.id, 
        content: newMessage, 
        sender_role: 'user' 
      }]);

    if (!error) {
      setNewMessage('');
      loadConversation();
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#e63946" /></View>;

  if (!report) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{fontSize: 50}}>📬</Text>
        <Text style={styles.emptyTitle}>Aucune discussion</Text>
        <Text style={styles.emptyText}>Envoie un signalement pour pouvoir discuter avec la cellule.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discussion avec les Gardiens</Text>
        <Text style={styles.statusText}>Statut : {report.status}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.sender_role === 'user' ? styles.userMsg : styles.adminMsg]}>
            <Text style={item.sender_role === 'user' ? styles.userText : styles.adminText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={newMessage} 
          onChangeText={setNewMessage} 
          placeholder="Répondre..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center', backgroundColor: '#f9f9f9' },
  headerTitle: { fontWeight: 'bold', fontSize: 16 },
  statusText: { fontSize: 12, color: '#2a9d8f', fontWeight: 'bold', marginTop: 4 },
  msgBubble: { padding: 12, borderRadius: 15, marginVertical: 5, maxWidth: '80%' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#e63946' },
  adminMsg: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  userText: { color: '#fff' },
  adminText: { color: '#333' },
  inputContainer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, marginRight: 10, height: 40 },
  sendBtn: { backgroundColor: '#e63946', borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 10 }
});