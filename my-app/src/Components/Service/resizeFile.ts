import Resizer from 'react-image-file-resizer'

export const resizeFile = (file, height, widht, quality) => new Promise(resolve => {
    Resizer.imageFileResizer(file, widht, height, 'JPEG', quality, 0, uri => {
        resolve(uri);
    }, "base64", widht, height)
});