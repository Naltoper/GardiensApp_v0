import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import * as SecureStore from 'expo-secure-store';

export default function MesSignalementsScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const TOKEN_KEY = 'user_report_token';
    let userToken;

    // Récupération du token selon la plateforme
    if (Platform.OS === 'web') {
      userToken = localStorage.getItem(TOKEN_KEY);
    } else {
      userToken = await SecureStore.getItemAsync(TOKEN_KEY);
    }

    if (!userToken) {
      setReports([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_token', userToken)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReports(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
        <View style={[styles.badge, { backgroundColor: item.status === 'Non traité' ? '#ffb703' : '#2a9d8f' }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
      <Text style={styles.footerText}>Clique pour voir la discussion →</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#e63946" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes signalements</Text>
      {reports.length === 0 ? (
        <Text style={styles.emptyText}>Tu n&apos;as pas encore envoyé de signalement.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1d3557' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  date: { color: '#666', fontSize: 14 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  content: { fontSize: 16, color: '#333', marginBottom: 10 },
  footerText: { fontSize: 12, color: '#457b9d', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});