import axios from 'axios';

import { Comment } from '../Types';

axios.defaults.baseURL = 'http://localhost:8000';

export const getAllComments = async () => {
  return axios.request({
    method: 'get',
    url: `/data`
  });
};

export const addComment = async (allComments: { comments: Comment[] }) => {
  // Due to the original structure of the json file, I did the post method like this, otherwise if it was a real API I would have added only one

  return axios.request({
    method: 'post',
    url: `/data`,
    data: allComments
  });
};
