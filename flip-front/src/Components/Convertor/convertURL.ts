export const convertURL = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const imageUrl = URL.createObjectURL(blob);

    resolve(imageUrl);
  });
};
