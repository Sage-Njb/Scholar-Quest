// pages/api/international-scholarships.ts
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  try {
    const { category } = req.query; // Get the category from query parameters

    let query = supabase.from('international_scholarships').select('*');

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
