import { assignment } from '../interfaces/assignment';
import { userAssignment } from "../interfaces/userAssignment";
import { api } from "../services/apiService";

export const useFetchAssignments = () => {
  const fecthAssignmentsByUser = async (userId: string) => {
    const response = await api.get(`/user-assignment/user/${userId}`);
    return response.data as userAssignment[];
  };

  const getAllAssignments = async (assignmentIds: string[]) => {
    const assignmentPromises = assignmentIds.map((id) =>
      api.get(`/assignment/assignment/${id}`)
    );
    const assignmentsResponses = await Promise.all(assignmentPromises);
    return assignmentsResponses.map((res) => res.data) as assignment[];
  };

  return { fecthAssignmentsByUser, getAllAssignments };
};
