import Resizer from 'react-image-file-resizer'

export const resizeFile = (file, height, widht, quality, rotation) => new Promise(resolve => {
    Resizer.imageFileResizer(file, widht, height, 'JPEG', quality, rotation, uri => {
        resolve(uri);
    }, "blob", widht, height)
});