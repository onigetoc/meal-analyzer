export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error('Invalid file format'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const optimizeImage = async (file) => {
  if (!file) return null;
  
  // Pour le moment, on retourne simplement le fichier
  // Vous pouvez ajouter une logique d'optimisation plus tard
  return file;
};