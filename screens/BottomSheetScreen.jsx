import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Header from '../component/Header';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const Content = ({closeBottomSheet, expandBottomSheet}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Bottom Sheet Content</Text>
      <Text style={styles.subtitle}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </Text>

      <View style={styles.buttonsRow}>
        {/* <TouchableOpacity
          style={[styles.button, styles.expandButton]}
          onPress={expandBottomSheet}>
          <Text style={styles.buttonText}>Full Screen</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={closeBottomSheet}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function BottomSheetScreen() {
  // Define snap points: 50% (default) and 100% (full screen)
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  // Track the current index
  const [snapIndex, setSnapIndex] = useState(0);

  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setSnapIndex(index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0); // Open to 50% by default
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const expandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1); // Expand to 100%
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#A6D6D6'}}>
        <Header title="Bottom Sheet" />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.mainButton} onPress={openBottomSheet}>
            <Text style={styles.buttonText}>Open Bottom Sheet</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          handleIndicatorStyle={styles.indicator}>
          <BottomSheetView style={styles.contentContainer}>
            <Content
              closeBottomSheet={closeBottomSheet}
              expandBottomSheet={expandBottomSheet}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    minWidth: 180,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    minWidth: 140,
    alignItems: 'center',
  },
  expandButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 50,
    backgroundColor: '#2196F3',
  },
});
