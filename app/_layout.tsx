import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Personnalisation de la barre du haut (Header)
        headerStyle: {
          backgroundColor: '#005f73',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Enlève le titre par défaut pour un look plus moderne
        headerShadowVisible: false, 
      }}
    >
      {/* On définit nos pages ici */}
      <Stack.Screen name="(tabs)/index" options={{ title: 'Accueil' }} />
      <Stack.Screen name="(tabs)/signalement" options={{ title: 'Signaler un incident' }} />
      <Stack.Screen name="(tabs)/cellule" options={{ title: 'La Cellule' }} />
      <Stack.Screen name="(tabs)/numeros" options={{ title: 'Numéros Utiles' }} />
      <Stack.Screen name="(tabs)/contact" options={{ title: 'Contact' }} />
      <Stack.Screen name="admin/login" options={{ title: 'Connexion Intervenant' }} />
    </Stack>
  );
}