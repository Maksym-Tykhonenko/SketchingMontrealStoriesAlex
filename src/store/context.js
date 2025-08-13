import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(60);
  const [savedDrawings, setSavedDrawings] = useState([]);

  const saveDrawing = async data => {
    try {
      const storedDrawings = await AsyncStorage.getItem('drawings');
      let drawings = storedDrawings !== null ? JSON.parse(storedDrawings) : [];

      const updatedDrawings = [...drawings, data];

      await AsyncStorage.setItem('drawings', JSON.stringify(updatedDrawings));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchDrawings = async () => {
    try {
      const savedData = await AsyncStorage.getItem('drawings');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedDrawings(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeDrawing = async selectedDrawingId => {
    const jsonValue = await AsyncStorage.getItem('drawings');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedDrawingId);

    setSavedDrawings(filtered);

    await AsyncStorage.setItem('drawings', JSON.stringify(filtered));
  };

  const value = {
    savedDrawings,
    setSavedDrawings,
    setSelectedTime,
    selectedTime,
    saveDrawing,
    fetchDrawings,
    removeDrawing,
    removeDrawing,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
