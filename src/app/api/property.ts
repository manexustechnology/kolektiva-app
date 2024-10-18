import {
  PROPERTY_SET_AFTERMAKET_ROUTE,
  PROPERTY_SET_SETTLEMENT_ROUTE,
} from '@/constants/api-routes';
import axios from 'axios';

export const setPropertyToAftermarket = async (
  propertyId: string,
): Promise<any> => {
  try {
    const response = await axios.patch(
      `${PROPERTY_SET_AFTERMAKET_ROUTE}/${propertyId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to set property to aftermarket phase');
  }
};

export const setPropertyToSettlement = async (
  propertyId: string,
): Promise<any> => {
  try {
    const response = await axios.patch(
      `${PROPERTY_SET_SETTLEMENT_ROUTE}/${propertyId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to set property to aftermarket phase');
  }
};
