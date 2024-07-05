import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});


interface UserAssignment {
  id: string;
  userId: string;
  userAssignmentId: string;
  status: boolean;
}

interface CreateUserAssignmentParams {
  userId: string;
  userAssignmentId: string;
}

export const createUserAssignment = async ({ userId, userAssignmentId }: CreateUserAssignmentParams) => {
  try {
    const response = await api.post('/user-assignment', {
      userId,
      userAssignmentId,
      status: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user assignment:', error);
    throw error;
  }
};


export const getUserAssignments = async (userId: string): Promise<UserAssignment[]> => {
  try {
    const response = await api.get(`/user-assignment/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user assignments:', error);
    throw error;
  }
};

interface UpdateAnswerParams {
  answerId: string;
  answer: number | null;
  justificative: string;
  avaliationId: string | null;
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

interface GetAnswerParams {
  questionId: string;
  avaliationId: string | null;
  evaluatedId: string;
}


export const getAnswersByEvaluatedId = async ({ questionId, avaliationId, evaluatedId }: GetAnswerParams) => {
  try {
    const response = await api.get(`/answers/evaluated/${evaluatedId}`, { params: { questionId, avaliationId, evaluatedId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};

export const getAnswersByAvaliationId = async ( avaliationId: string ) => {
  try {
    const response = await api.get(`/answers/avaliation/${avaliationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
}

interface CreateAnswerParams {
  answer: number;
  justificative: string;
  avaliationId: string | null;
  questionId: string;
  evaluatorId: string;
  evaluatedId: string;
  }
  
  export const createAnswer = async ({ answer, justificative, avaliationId, questionId, evaluatorId, evaluatedId }: CreateAnswerParams) => {
    try {
      const response = await api.post('/answers', {
        answers: [{
        evaluatorId,
        evaluatedId,
        questionId,
        avaliationId,
        answer,
        justificative
  }]
  });
  return response.data;
  } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
  }
  };

export const deleteAnswer = async (answerId: string) => {
  try {
      const response = await api.delete(`/answers/${answerId}`)
      return response. data
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
}


export const createAvaliation = async (evaluatorId: string, evaluatedId: string, userAssignmentId: string) => {
  
  try {
    const user = await fetchUserById(evaluatorId)
    const avaliationType = user.manager
    ? 'avaliationbymanager'
    : evaluatorId === evaluatedId
    ? 'autoavaliation'
    : null

    if (!avaliationType) throw new Error ('Invalid avaliation type')

    const media = 0;

    console.log(
      'user:', evaluatorId, 
      'evaluated:', evaluatedId, 
      'avaliationType:', avaliationType,
      'userAssignmentId:', userAssignmentId,
      'media', media
    )

    // const response = await api.post(`/avaliation/${evaluatorId}/${evaluatedId}`, { 
      // avaliationType, 
      // userAssignmentId,
      // media 
    // })
    // return response.data

  } catch (error) {
    console.error('Error creating avaliation: ', error);
    throw error;
  }
}

export const getAvaliation = async (evaluatorId: string, evaluatedId: string) => {
  try {
    const response = await api.get(`/avaliation/findByUserAssignmentIdAndAvaliationType/${evaluatorId}/${evaluatedId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching avaliation:', error);
    throw error;
  }
};

export const calculateAvaliationMedia = async (avaliationId: string) => {
  try {
    const response = await api.get(`/answers/avaliation/${avaliationId}`);
    const answers = response.data;

    if (answers.length === 0) return 0;

    const total = answers.reduce((sum: number, answer: any) => sum + answer.answer, 0);
    const media = total / answers.length;

    return media;
  } catch (error) {
    console.error('Error calculating media:', error);
    throw error;
  }
};

export const updateAvaliationMedia = async (avaliationId: string, media: number) => {
  try {
    await api.patch(`/avaliation/${avaliationId}`, { media });
  } catch (error) {
    console.error('Error updating avaliation media:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user: ', error)
    throw error
  }
}

export const fetchUserAssignmentByUserAndAssignment = async (userId: string, assignmentId: string) => {
  try {
    const response = await api.get(`/user-assignment/userAssignment/${userId}/${assignmentId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user assignment: ', error)
    throw error
  }
}