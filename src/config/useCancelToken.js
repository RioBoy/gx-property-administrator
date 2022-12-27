import axios from 'axios';

const keyCancel = {};
const CancelToken = axios.CancelToken;

export const useCancelToken = (parentName) => {
  if (keyCancel[parentName]) {
    keyCancel[parentName]();
  }

  return {
    cancelToken: new CancelToken(function executor(c) {
      keyCancel[parentName] = c;
    }),
  };
};
