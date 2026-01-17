import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* StatusBar style="light" pour que l'heure/batterie soient en BLANC.
        backgroundColor="black" pour que le fond de la barre soit NOIR.
        translucent={false} empêche l'app de glisser derrière la barre.
      */}
      <StatusBar style="light" backgroundColor= "black" translucent={false} />
      
      <View style={styles.container}>
        {/* On ne met pas de SafeAreaView ici pour que le fond noir de la StatusBar 
            soit collé au haut de l'écran sans espace blanc intermédiaire */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#023e8a', // Bleu profond pour les autres pages
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 18,
            },
            headerShadowVisible: false,
            // Empêche le contenu de passer sous la barre de navigation Android en bas
            contentStyle: { backgroundColor: '#f8fdff' }, 
          }}
        >
          {/* Accueil : Pas de header */}
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} /> 
          <Stack.Screen name="(tabs)/signalement" options={{ title: 'Signaler un incident' }} />
          <Stack.Screen name="(tabs)/mes-signalements" options={{ title: 'Mes Signalements' }} />
          <Stack.Screen name="(tabs)/cellule" options={{ title: 'La Cellule' }} />
          <Stack.Screen name="(tabs)/numeros" options={{ title: 'Numéros Utiles' }} />
          <Stack.Screen name="(tabs)/contact" options={{ title: 'Contact' }} />
          <Stack.Screen name="admin/login" options={{ title: 'Connexion Intervenant' }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdff',
  },
});