import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get total count
    const { count: total, error: totalError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Error getting total count:', totalError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Get filiere stats
    const { data: filiereData, error: filiereError } = await supabase
      .from('members')
      .select('filiere')
      .not('filiere', 'is', null);

    if (filiereError) {
      console.error('Error getting filiere stats:', filiereError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Count by filiere
    const filiereStats = filiereData.reduce((acc, member) => {
      acc[member.filiere] = (acc[member.filiere] || 0) + 1;
      return acc;
    }, {});

    // Get niveau stats
    const { data: niveauData, error: niveauError } = await supabase
      .from('members')
      .select('niveau')
      .not('niveau', 'is', null);

    if (niveauError) {
      console.error('Error getting niveau stats:', niveauError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Count by niveau
    const niveauStats = niveauData.reduce((acc, member) => {
      acc[member.niveau] = (acc[member.niveau] || 0) + 1;
      return acc;
    }, {});

    // Format stats
    const formattedFiliereStats = Object.entries(filiereStats).map(([filiere, count]) => ({
      filiere,
      count
    }));

    const formattedNiveauStats = Object.entries(niveauStats).map(([niveau, count]) => ({
      niveau,
      count
    }));

    res.status(200).json({
      success: true,
      stats: {
        total: total || 0,
        filiere: formattedFiliereStats,
        niveau: formattedNiveauStats
      }
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
