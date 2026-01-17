import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Phone, Globe, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NumerosScreen() {
  const call = (num: string) => Linking.openURL(`tel:${num}`);

  const emergencyNumbers = [
    {
      title: "Non au Harcèlement",
      number: "3020",
      description: "Écoute, conseil et orientation pour les victimes et témoins.",
      colors: ["#48a4f4", "#00b4d8"],
    },
    {
      title: "Cyber-Harcèlement",
      number: "3018",
      description: "Le numéro court national pour les violences numériques.",
      colors: ["#76c893", "#10ac56"],
    },
    {
      title: "Enfance en Danger",
      number: "119",
      description: "Numéro national dédié à la prévention et à la protection.",
      colors: ["#023e8a", "#48cae4"],
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Numéros Utiles</Text>
      <Text style={styles.subtitle}>
        Besoin d&apos;aide immédiatement ? Ces services sont gratuits, anonymes et disponibles partout en France.
      </Text>

      {emergencyNumbers.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          activeOpacity={0.9} 
          onPress={() => call(item.number)}
          style={styles.cardContainer}
        >
          <LinearGradient
            colors={item.colors as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <View style={styles.numberBadge}>
                <Phone size={16} color="white" fill="white" />
                <Text style={styles.cardNumber}>{item.number}</Text>
              </View>
            </View>
            <View style={styles.iconCircle}>
              <Phone size={28} color={item.colors[0]} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <View style={styles.footerInfo}>
        <ShieldCheck size={18} color="#64748b" />
        <Text style={styles.footerText}>Appels gratuits et confidentiels</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  content: { 
    padding: 24,
    paddingBottom: 40
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#023e8a', 
    marginBottom: 10 
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 25
  },
  cardContainer: {
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  card: { 
    padding: 20, 
    borderRadius: 24, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  cardInfo: {
    flex: 1,
    marginRight: 10
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#fff',
    marginBottom: 4
  },
  cardDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    lineHeight: 18
  },
  numberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardNumber: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#fff',
    marginLeft: 8
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    opacity: 0.7
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600'
  }
});