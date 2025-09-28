import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Get all members for statistics calculation
    const { data, error } = await supabase
      .from('members')
      .select('filiere, niveau, role, created_at');

    if (error) {
      console.error('Stats error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching statistics'
      });
    }

    // Calculate statistics
    const stats = {
      total: data.length,
      byFiliere: {},
      byNiveau: {},
      byRole: {},
      recent: 0
    };

    // Calculate recent registrations (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    data.forEach(member => {
      // By filiere
      stats.byFiliere[member.filiere] = (stats.byFiliere[member.filiere] || 0) + 1;
      
      // By niveau
      stats.byNiveau[member.niveau] = (stats.byNiveau[member.niveau] || 0) + 1;
      
      // By role
      stats.byRole[member.role] = (stats.byRole[member.role] || 0) + 1;
      
      // Recent registrations
      const memberDate = new Date(member.created_at);
      if (memberDate >= weekAgo) {
        stats.recent++;
      }
    });

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Stats calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating statistics'
    });
  }
}
