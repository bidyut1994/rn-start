import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import Header from '../component/Header';

const EpisodeDetailsCard = ({episodeId, onClose}) => {
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeId}`,
        );
        if (!response.ok) throw new Error('Failed to fetch episode data');
        const data = await response.json();
        setEpisode(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (episodeId) {
      fetchEpisodeDetails();
    }
  }, [episodeId]);

  if (loading) {
    return (
      <View style={styles.episodeDetailsLoading}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading episode details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.episodeDetailsError}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!episode) return null;

  return (
    <View style={styles.episodeDetailsContainer}>
      <View style={{position: 'absolute', right: 0, top: -20}}>
        <Icon
          name="close"
          size={24}
          color="white"
          onPress={onClose}
          style={{textAlign: 'right'}}
        />
      </View>
      <View style={styles.episodeDetailsHeader}>
        <Text style={styles.episodeDetailsTitle}>{episode.name}</Text>
        <Text style={styles.episodeDetailsCode}>{episode.episode}</Text>
      </View>

      <View style={styles.episodeDetailsInfo}>
        <View style={styles.episodeInfoItem}>
          <Text style={styles.episodeInfoLabel}>Air Date</Text>
          <Text style={styles.episodeInfoValue}>{episode.air_date}</Text>
        </View>

        <View style={styles.episodeInfoItem}>
          <Text style={styles.episodeInfoLabel}>Characters</Text>
          <Text style={styles.episodeInfoValue}>
            {episode.characters?.length || 0} characters appear
          </Text>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const EpisodeItem = ({episodeNumber, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(episodeNumber)}>
      <View style={styles.episodeCard}>
        <Text style={styles.episodeNumber}>#{episodeNumber}</Text>
        <Text style={styles.episodeLabel}>Episode</Text>
      </View>
    </TouchableOpacity>
  );
};

const EpisodesSection = ({episodes, onEpisodePress}) => {
  if (!episodes || episodes.length === 0) return null;

  return (
    <View style={styles.infoSection}>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>Episodes</Text>
        <Text style={styles.episodeCount}>{episodes.length} total</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}>
        {episodes.map(ep => {
          const episodeNumber = ep.split('/').pop();
          return (
            <EpisodeItem
              key={ep}
              episodeNumber={episodeNumber}
              onPress={onEpisodePress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function InfinityScrollScreenPage2({route, navigation}) {
  const character = route.params?.character;

  // Bottom Sheet references and state
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isBottomSheetReady, setIsBottomSheetReady] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Bottom Sheet functions
  const handleEpisodePress = useCallback(
    episodeId => {
      setSelectedEpisode(episodeId);
      // Only try to open if the sheet is ready
      if (isBottomSheetReady) {
        setIsBottomSheetVisible(true);
        setTimeout(() => {
          bottomSheetRef.current?.snapToIndex(0);
        }, 100);
      }
    },
    [isBottomSheetReady],
  );

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  }, []);

  // Handle sheet changes
  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      setIsBottomSheetVisible(false);
    } else {
      setIsBottomSheetVisible(true);
    }
  }, []);

  // Mark bottom sheet as ready after component mounts
  useEffect(() => {
    setIsBottomSheetReady(true);
  }, []);

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

  const episodeCount = character.episode?.length || 0;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
            <EpisodesSection
              episodes={character.episode}
              onEpisodePress={handleEpisodePress}
            />
          )}

          <View style={[styles.infoSection, {marginBottom: 250}]}>
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

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}>
          <BottomSheetView style={styles.bottomSheetContent}>
            {isBottomSheetVisible && selectedEpisode ? (
              <EpisodeDetailsCard
                episodeId={selectedEpisode}
                onClose={handleCloseBottomSheet}
              />
            ) : (
              <View style={styles.bottomSheetLoading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading episode data...</Text>
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  episodeCount: {
    fontSize: 14,
    color: '#666',
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

  bottomSheetBackground: {
    backgroundColor: '#7886C7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetIndicator: {
    width: 50,
    backgroundColor: '#2196F3',
    height: 5,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 24,
  },
  episodeDetailsContainer: {
    flex: 1,
  },
  episodeDetailsHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  episodeDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  episodeDetailsCode: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  episodeDetailsInfo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  episodeInfoItem: {
    marginBottom: 12,
  },
  episodeInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  episodeInfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  episodeDetailsLoading: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: 'white',
  },
  episodeDetailsError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bottomSheetLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
