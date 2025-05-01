import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';

export default function InfinityScrollScreenPage2({route, navigation}) {
  const character = route.params?.character;

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Character Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Character data not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const openUrl = url => {
    if (url && url !== '' && url !== 'unknown') {
      Linking.openURL(url);
    }
  };

  // Count number of episodes
  const episodeCount = character.episode?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={character.name} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.heroSection}>
          <Image
            source={{uri: character.image}}
            style={styles.characterImage}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.characterName}>{character.name}</Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor:
                      character.status === 'Alive'
                        ? '#4CAF50'
                        : character.status === 'Dead'
                        ? '#F44336'
                        : '#9E9E9E',
                  },
                ]}
              />
              <Text style={styles.statusText}>{character.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{character.species}</Text>
            <Text style={styles.statLabel}>Species</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{character.type || 'Unknown'}</Text>
            <Text style={styles.statLabel}>Type</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{character.gender}</Text>
            <Text style={styles.statLabel}>Gender</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Origin :</Text>
              <TouchableOpacity
                onPress={() => openUrl(character.origin?.url)}
                disabled={
                  !character.origin?.url || character.origin?.url === ''
                }>
                <Text
                  style={[
                    styles.infoValue,
                    character.origin?.url && character.origin?.url !== ''
                      ? styles.link
                      : null,
                  ]}>
                  {character.origin?.name || 'Unknown'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Location :</Text>
              {/* <TouchableOpacity
                onPress={() => openUrl(character.location?.url)}
                disabled={!character.location?.url}> */}
              <Text style={[character.location?.url ? styles.link : null]}>
                {character.location?.name || 'Unknown'}
              </Text>
              {/* </TouchableOpacity> */}
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Episodes : </Text>
              <Text style={styles.infoValue}>
                {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>

        {character.episode && character.episode.length > 0 && (
          <View style={styles.infoSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.sectionHeader}>Episodes </Text>
              {/* <Text style={{fontSize: 14, color: '#666'}}>
                count : {character.episode?.length}
              </Text> */}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}>
              {character.episode.map((ep, index) => {
                const episodeNumber = ep.split('/').pop();
                return (
                  <View key={ep} style={styles.episodeCard}>
                    <Text style={styles.episodeNumber}>#{episodeNumber}</Text>
                    <Text style={styles.episodeLabel}>Episode</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>Additional Info</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.infoValue}>
                {new Date(character.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Character ID</Text>
              <Text style={styles.infoValue}>#{character.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    backgroundColor: '#8E7DBE',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  characterImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: 'white',
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: -20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    maxWidth: 200,
  },
  link: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  horizontalScrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  episodeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  episodeNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E7DBE',
    marginBottom: 5,
  },
  episodeLabel: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    height: 40,
  },
});
