import { CompetitionsResponseSchema } from '../zod/competitionsResponseSchema';
import { tmpApiAxios } from '../clients/tmpApiAxios';
import { Competition } from '../types/competition';

const BASE_URL = 'https://api.football-data.org/v4';

export async function getCompetitionsEndpoint(
  client: 'fetch' | 'axios' = 'fetch',
  API_KEY: string,
  axiosOptions?: any
): Promise<Competition[]> {
  const url = '/competitions';
  if (client === 'axios') {
    const data = await tmpApiAxios.request({
      url,
      method: 'get',
      ...(axiosOptions || {}),
    });
    const parsed = CompetitionsResponseSchema.parse(data);
    return parsed.competitions as Competition[];
  } else {
    const res = await fetch(BASE_URL + url, { headers: { 'X-Auth-Token': API_KEY } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const parsed = CompetitionsResponseSchema.parse(data);
    return parsed.competitions as Competition[];
  }
} 