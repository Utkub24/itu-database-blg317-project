import { handleApiError } from "./ErrorHandler";

export const handleRequest = async <T>(
  request: () => Promise<T>
): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
