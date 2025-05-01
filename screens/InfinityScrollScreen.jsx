import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../component/Header';

const {width, height} = Dimensions.get('window');

const CharacterListItems = ({item, gridView}) => {
  return (
    <View
      style={{
        width: gridView ? '30%' : '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        marginHorizontal: gridView ? 0 : 10,
        elevation: 3,
        justifyContent: 'center',
      }}>
      <View>
        {gridView ? (
          <View
            style={{
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item?.image}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 110,
                height: 110,
                borderRadius: 50,
                padding: 10,
              }}>
              <Image
                source={{uri: item?.image}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                }}
              />
            </View>
            <View style={{flex: 1, padding: 15, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {item?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      item?.status === 'Alive'
                        ? '#4CAF50'
                        : item?.status === 'Dead'
                        ? '#F44336'
                        : '#9E9E9E',
                    marginRight: 6,
                  }}
                />
                <Text style={{color: '#666', fontSize: 14}}>
                  {item?.status} - {item?.species}
                </Text>
              </View>
              <Text style={{color: '#666', fontSize: 14, marginTop: 5}}>
                {item?.location?.name}
              </Text>
            </View>
          </View>
        )}
        {/* {gridView && (
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {item?.name}
          </Text>
        )} */}
      </View>
    </View>
  );
};

export default function InfinityScrollScreen() {
  const [gridView, setGridView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(
    'https://rickandmortyapi.com/api/character',
  );

  const fetchDataNextPage = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(nextPage);
      const responseData = await response.json();

      const existingIds = new Set(data.map(item => item.id));

      const newItems = responseData.results.filter(
        item => !existingIds.has(item.id),
      );

      setData(prev => [...prev, ...newItems]);
      setNextPage(responseData.info.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initialFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(nextPage);
      const responseData = await response.json();
      setData(responseData.results);
      setNextPage(responseData.info.next);
    } catch (error) {
      console.error('Error in initial fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Infinity Scroll" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#8E7DBE',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            padding: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Rick and Morty
            {/* {data?.length} */}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', marginRight: 8}}>List</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81d4fa'}}
              thumbColor={gridView ? '#1976d2' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setGridView(!gridView)}
              value={gridView}
            />
            <Text style={{color: 'white', marginLeft: 8}}>Grid</Text>
          </View>
        </View>
        <View style={{flex: 1, marginBottom: 40}}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <CharacterListItems item={item} gridView={gridView} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={gridView ? 3 : 1}
            key={gridView ? 'grid' : 'list'}
            columnWrapperStyle={
              gridView
                ? {
                    justifyContent: 'space-around',
                    paddingHorizontal: 10,
                  }
                : undefined
            }
            onEndReached={fetchDataNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              <View>
                {loading && (
                  <View style={{padding: 40}}>
                    <ActivityIndicator size="large" color="#fff" />
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
