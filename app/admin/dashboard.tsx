import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function DashboardScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  // Fonction pour formater la date et l'heure
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('fr-FR');
    const time = date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return `${day} à ${time}`;
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.typeText}>{item.is_anonyme ? "👤 Anonyme" : `📢 ${item.author_name}`}</Text>
        <Text style={styles.dateText}>{formatDateTime(item.created_at)}</Text>
      </View>
      
      <Text style={styles.reportText}>{item.content}</Text>
      
      {/* Bouton pour ouvrir la discussion */}
      <TouchableOpacity 
        style={styles.replyBtn} 
        onPress={() => router.push(`/admin/chat/${item.id}`)}
      >
        <Text style={styles.replyBtnText}>💬 Répondre à l&apos;élève</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={[styles.badge, { backgroundColor: item.status === 'Non traité' ? '#e63946' : '#2a9d8f' }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
        <Text style={styles.tokenText}>ID: {item.user_token.split('_')[1]}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signalements reçus</Text>
      
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#1d3557" />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text style={styles.empty}>Aucun signalement pour le moment.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1d3557' },
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 2 } 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  typeText: { fontWeight: 'bold', color: '#457b9d', fontSize: 14 },
  dateText: { color: '#888', fontSize: 11, fontWeight: '500' },
  reportText: { color: '#333', marginBottom: 15, lineHeight: 20, fontSize: 15 },
  
  // Nouveau style pour le bouton répondre
  replyBtn: {
    backgroundColor: '#f0f4f8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#457b9d',
  },
  replyBtnText: {
    color: '#457b9d',
    fontWeight: 'bold',
    fontSize: 14,
  },

  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  tokenText: { fontSize: 10, color: '#bbb', fontStyle: 'italic' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});