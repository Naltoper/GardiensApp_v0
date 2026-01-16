import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import * as SecureStore from 'expo-secure-store';

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

  // --- FONCTION DE FORMATAGE DATE ET HEURE ---
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(' ', ' à '); // Remplace l'espace entre date et heure par " à "
  };

  const renderItem = ({ item }: { item: any }) => {
    const isProcessed = item.status !== 'Non traité';
    
    return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={[styles.card, { borderLeftColor: isProcessed ? '#2a9d8f' : '#ffb703' }]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.date}>
            Posté le {formatDateTime(item.created_at)}
          </Text>
          <View style={[styles.badge, { backgroundColor: isProcessed ? '#e6f4f1' : '#fff3cd' }]}>
            <View style={[styles.dot, { backgroundColor: isProcessed ? '#2a9d8f' : '#ffb703' }]} />
            <Text style={[styles.badgeText, { color: isProcessed ? '#2a9d8f' : '#996500' }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.content} numberOfLines={2}>
          {item.content}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.footerLink}>Discuter avec un intervenant</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e63946" />
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#e63946" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu n&apos;as pas encore envoyé de signalement.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F2F5' 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    marginHorizontal: 20, 
    marginTop: 30, 
    marginBottom: 20, 
    color: '#1d3557' 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 16, 
    marginBottom: 16, 
    borderLeftWidth: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 4 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12 
  },
  date: { 
    color: '#8898AA', 
    fontSize: 13, 
    fontWeight: '500' 
  },
  badge: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 20 
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  badgeText: { 
    fontSize: 11, 
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  content: { 
    fontSize: 16, 
    lineHeight: 22,
    color: '#344767', 
    marginBottom: 15,
    fontWeight: '400'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5'
  },
  footerLink: { 
    fontSize: 14, 
    color: '#457b9d', 
    fontWeight: '600' 
  },
  arrow: {
    fontSize: 16,
    color: '#457b9d'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#8898AA', 
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 40
  }
});