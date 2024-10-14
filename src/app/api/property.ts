import { PROPERTY_SET_AFTERMAKET_ROUTE } from '@/constants/api-routes';
import axios from 'axios';

interface SetAftermarketResponse {
  message: string;
}

export const setPropertyToAftermarket = async (
  propertyId: string,
): Promise<SetAftermarketResponse> => {
  try {
    const response = await axios.patch(
      `${PROPERTY_SET_AFTERMAKET_ROUTE}/${propertyId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to set property to aftermarket phase');
  }
};
