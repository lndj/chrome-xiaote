import { ImagePreview } from 'vant';

export function formatContent(value) {
  return value.replace(/(\r\n|\n|\r)/gm, '<br />');
}

export function imagePreview(images) {
  const imageList = [];
  images.forEach(img => imageList.push(img.url));
  window.imagePreviewInstance = ImagePreview({
    images: imageList,
    closeable: true,
  });
}

export function firstImageUrl(images) {
  if (!images || images.length === 0) {
    return '';
  }
  const imgInfo = images[0];
  return imgInfo.url;
}
