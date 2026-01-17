import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, MessageSquare, Info, Phone, Mail, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importation pour les dégradés

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  // Couleurs mixées : Départ Bleu (Mer) -> Arrivée Vert (Calanque)
  const menuButtons = [
    { 
        title: "Fiche de Signalement", 
        route: "/(tabs)/signalement", 
        // Dégradé distinct : Orange chaleureux vers Turquoise (Accueillant et Solaire)
        colors: ["#fb8500", "#2a9d8f"], 
        icon: <ShieldAlert color="white" size={32} />, 
        fullWidth: true,
        isPriority: true
    },
    { 
        title: "Mes signalements", 
        route: "/(tabs)/mes-signalements", 
        colors: ["#0096c7", "#52b69a"], // Bleu Lagon -> Vert Menthe
        icon: <MessageSquare color="white" size={24} /> 
    },
    { 
        title: "La Cellule", 
        route: "/(tabs)/cellule", 
        colors: ["#00b4d8", "#76c893"], // Bleu Turquoise -> Vert d'Eau
        icon: <Info color="white" size={24} /> 
    },
    { 
        title: "Numéros Utiles", 
        route: "/(tabs)/numeros", 
        colors: ["#48cae4", "#99d98c"], // Bleu Ciel -> Vert Clair
        icon: <Phone color="white" size={24} /> 
    },
    { 
        title: "Nous Contacter", 
        route: "/(tabs)/contact", 
        colors: ["#90e0ef", "#b5e48c"], // Eau Cristalline -> Vert Tendre
        icon: <Mail color="white" size={24} /> 
    },
    { 
        title: "Espace Intervenants", 
        route: "/admin/login", 
        colors: ["#f1f5f9", "#e2e8f0"], // Gris roche calcaire (neutre)
        icon: <Lock color="#64748b" size={20} />, 
        small: true 
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* En-tête avec votre logo en rond */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.headerTitle}>Les Gardiens des Calanques</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>
            Un espace sécurisé et bienveillant pour briser le silence. Votre anonymat est notre priorité.
          </Text>
        </View>
        
        {/* Grille de navigation avec Gradients */}
        <View style={styles.grid}>
          {menuButtons.map((btn, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                btn.fullWidth ? styles.fullWidthContainer : styles.halfWidthContainer,
                btn.small && styles.smallContainer
              ]}
              activeOpacity={0.9}
              onPress={() => router.push(btn.route as any)}
            >
              <LinearGradient
                colors={btn.colors as [string, string, ...string[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradientButton, btn.small && styles.smallGradient]}
              >
                <View style={styles.iconContainer}>{btn.icon}</View>
                <Text style={[
                    styles.buttonText, 
                    btn.small && styles.smallButtonText
                ]}>
                  {btn.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <View style={styles.securityBadge}>
            <Lock size={14} color="#0077b6" />
            <Text style={styles.footerNote}>Connexion chiffrée & Anonymat garanti</Text>
          </View>
          <Text style={styles.lyceeNote}>Lycée des Calanques • Marseille</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fdff', // Un blanc bleuté très frais
  },
  container: { 
    flexGrow: 1, 
    padding: 24, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 3,
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#023e8a', 
    textAlign: 'center',
    letterSpacing: 0.5
  },
  divider: {
    width: 50,
    height: 4,
    backgroundColor: '#76c893', // Touche de vert calanque
    borderRadius: 2,
    marginVertical: 12,
  },
  subtitle: { 
    fontSize: 14, 
    color: '#52718e', 
    textAlign: 'center', 
    lineHeight: 20,
    paddingHorizontal: 15
  },
  grid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12
  },
  fullWidthContainer: {
    width: '100%',
    marginBottom: 8,
  },
  halfWidthContainer: {
    width: '48%',
    height: 110,
  },
  smallContainer: {
    width: '100%',
    height: 55,
    marginTop: 10,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  smallGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  iconContainer: {
    marginBottom: 5,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '700', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  smallButtonText: {
    color: '#6c757d',
    marginLeft: 10,
    marginBottom: 5, // Aligné avec l'icône
    textShadowRadius: 0
  },
  footer: {
    marginTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#caf0f8',
  },
  footerNote: {
    fontSize: 12,
    color: '#0077b6',
    fontWeight: '600',
    marginLeft: 8
  },
  lyceeNote: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '500'
  }
});