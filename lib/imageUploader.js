import axios from 'axios';

const imageUploader = async (uri, userId) => {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const file = {
    uri,
    type: `image/${fileType}`,
    name: `image${userId}.${fileType}`,
  };
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'hermes');
  return axios.post('https://api.cloudinary.com/v1_1/adinoyisadiq/image/upload', data);
};

export default imageUploader;
