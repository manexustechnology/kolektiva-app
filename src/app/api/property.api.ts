import {
  PROPERTY_LOCATIONS_ROUTE,
  PROPERTY_SET_AFTERMAKET_ROUTE,
  PROPERTY_SET_SETTLEMENT_ROUTE,
} from '@/constants/api-routes';
import queryString from 'query-string';
import axios, { AxiosResponse } from 'axios';
import { ResponseData } from '@/types/response';
import {
  PropertyLocationFilter,
  PropertyLocationResponse,
} from '@/types/location';

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

export const findPropertyLocations = async (
  params: PropertyLocationFilter,
): Promise<ResponseData<PropertyLocationResponse[]>> => {
  try {
    const queryParams = queryString.stringify(params as any);
    const response = await axios.get(
      `${PROPERTY_LOCATIONS_ROUTE}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve property locations');
  }
};
