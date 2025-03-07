import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native'; 
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { uploadDocument } from '../services/cargas';  

const DocumentosScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    requestCameraPermission();
    requestGalleryPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const cameraPermission = Platform.OS === 'ios'
        ? await request(PERMISSIONS.IOS.CAMERA)
        : await request(PERMISSIONS.ANDROID.CAMERA);

      if (cameraPermission === RESULTS.GRANTED) {
        console.log('Permissão da câmera concedida');
      } else {
        console.warn('Permissão da câmera negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const galleryPermission = Platform.OS === 'ios'
        ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        : await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

      if (galleryPermission === RESULTS.GRANTED) {
        console.log('Permissão da galeria concedida');
      } else {
        console.warn('Permissão da galeria negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhoto = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 0.5 });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0].uri || null);
    }
  };

  const chooseFromLibrary = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5 });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleUploadDocument = async () => {
    if (!image) {
      Alert.alert('Erro', 'Nenhuma imagem selecionada.');
      return;
    }

    setUploading(true);
    try {
      await uploadDocument(image);  
      Alert.alert('Sucesso', 'Documento enviado com sucesso!');
      setImage(null);  
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o documento. Tente novamente mais tarde.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Documentos</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <Button title="Tirar Foto" onPress={takePhoto} />
      <Button title="Escolher da Galeria" onPress={chooseFromLibrary} />
      <Button title="Enviar Documento" onPress={handleUploadDocument} disabled={uploading} />

      {uploading && <ActivityIndicator size="large" color="#007AFF" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default DocumentosScreen;