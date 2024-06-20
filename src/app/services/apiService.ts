import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});

interface UpdateAnswerParams {
  answerId: string;
  answer: number;
  justificative: string;
  avaliationId: string;
  questionId: string;
}

export const fetchQuestions = async () => {
  try {
    const response = await api.get('/question');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const updateAnswer = async ({ answerId, answer, justificative, avaliationId, questionId }: UpdateAnswerParams) => {
  try {
    const response = await api.patch(`/answers/${answerId}`, { questionId, avaliationId, answer, justificative });
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};