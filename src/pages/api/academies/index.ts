import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

type Academy = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  logo_url: string;
  created_at: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Extract query parameters
      const { city, country, search, limit = 10, offset = 0 } = req.query;
      
      // Build query
      let query = supabase
        .from('academies')
        .select('*');
      
      // Apply filters if provided
      if (city) {
        query = query.eq('city', city);
      }
      
      if (country) {
        query = query.eq('country', country);
      }
      
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }
      
      // Apply pagination
      query = query
        .range(Number(offset), Number(offset) + Number(limit) - 1)
        .order('name', { ascending: true });
      
      // Execute query
      const { data, error, count } = await query;
      
      if (error) {
        throw error;
      }
      
      return res.status(200).json({
        academies: data,
        total: count,
        limit: Number(limit),
        offset: Number(offset),
      });
    } catch (error) {
      console.error('Error fetching academies:', error);
      return res.status(500).json({ error: 'Failed to fetch academies' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}