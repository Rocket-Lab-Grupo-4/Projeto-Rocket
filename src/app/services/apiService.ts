import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});


interface UserAssignment {
  id: string;
  userId: string;
  assignmentId: string;
  status: boolean;
}

interface CreateUserAssignmentParams {
  userId: string;
  assignmentId: string;
}

export const createUserAssignment = async ({ userId, assignmentId }: CreateUserAssignmentParams) => {
  try {
    const response = await api.post('/user-assignment', {
      userId,
      assignmentId,
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
}


export const getAnswers = async ({ questionId, avaliationId }: GetAnswerParams) => {
  try {
    const response = await api.get(`/answers`, { params: { questionId, avaliationId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};

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


export const createAvaliation = async (evaluatorId: string, evaluatedId: string, assignmentId: string) => {
  
  try {
    const user = await fetchUserById(evaluatorId)
    const avaliationType = user.manager
    ? 'avaliationByManager'
    : evaluatorId === evaluatedId
    ? 'autoavaliation'
    : null

    if (!avaliationType) throw new Error ('Invalid avaliation type')

    const userAssignments: UserAssignment[] = await getUserAssignments(evaluatorId);
    let userAssignment = userAssignments.find((ua: UserAssignment) => ua.assignmentId === assignmentId);

    if (!userAssignment) {
      userAssignment = await createUserAssignment({ userId: evaluatorId, assignmentId });
    }

    if (!userAssignment) {
      throw new Error('Failed to create or find user assignment');
    }

    const media = 0;


    const response = await api.post(`/avaliation/${evaluatorId}/${evaluatedId}`, { avaliationType, userAssignmentId: userAssignment.id, media })
    return response.data

  } catch (error) {
    console.error('Error creating avaliation: ', error);
    throw error;
  }
}

export const getAvaliation = async (evaluatorId: string, evaluatedId: string) => {
  try {
    const response = await api.get('/avaliation', { params: { evaluatorId, evaluatedId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching avaliation:', error);
    throw error;
  }
};

export const calculateAvaliationMedia = async (avaliationId: string) => {
  try {
    const response = await api.get('/answers', { params: { avaliationId } });
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