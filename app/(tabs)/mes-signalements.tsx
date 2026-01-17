import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import * as SecureStore from 'expo-secure-store';
import { MessageCircle } from 'lucide-react-native'; // Icône pour le footer

export default function MesSignalementsScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReports = async () => {
    const TOKEN_KEY = 'user_report_token';
    let userToken;

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
    setRefreshing(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReports();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(' ', ' à ');
  };

  const renderItem = ({ item }: { item: any }) => {
    // Statuts cohérents avec les couleurs de l'accueil
    const isProcessed = item.status !== 'Non traité';
    const statusColor = isProcessed ? '#10ac56' : '#00b4d8';
    
    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={[styles.card, { borderLeftColor: statusColor }]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.date}>
            Posté le {formatDateTime(item.created_at)}
          </Text>
          <View style={[styles.badge, { backgroundColor: isProcessed ? '#e6f4f1' : '#e0f2fe' }]}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.badgeText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.content} numberOfLines={2}>
          {item.content}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <MessageCircle size={16} color="#48a4f4" style={{ marginRight: 8 }} />
            <Text style={styles.footerLink}>Discuter avec un intervenant</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#48a4f4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes signalements</Text>
      
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#48a4f4" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu n&apos;as pas encore envoyé de signalement.</Text>
            <Text style={styles.emptySubText}>Tes futurs messages s&apos;afficheront ici en toute sécurité.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    marginHorizontal: 24, 
    marginTop: 20, 
    marginBottom: 20, 
    color: '#023e8a' // Bleu foncé de l'index
  },
  listContent: { 
    paddingHorizontal: 24, 
    paddingBottom: 40 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 20, // Arrondis plus doux comme l'index
    marginBottom: 16, 
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12 
  },
  date: { 
    color: '#94a3b8', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  badge: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6
  },
  badgeText: { 
    fontSize: 10, 
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  content: { 
    fontSize: 15, 
    lineHeight: 22,
    color: '#334155', 
    marginBottom: 15,
    fontWeight: '500'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerLink: { 
    fontSize: 13, 
    color: '#00b4d8', 
    fontWeight: '700' 
  },
  arrow: {
    fontSize: 18,
    color: '#00b4d8',
    fontWeight: 'bold'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#64748b', 
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10
  },
  emptySubText: {
    textAlign: 'center', 
    color: '#94a3b8', 
    fontSize: 14,
    lineHeight: 20
  }
});