const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, whatsapp, filiere, niveau, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !whatsapp || !filiere || !niveau || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const { data: existingMember, error: checkError } = await supabase
      .from('members')
      .select('id')
      .eq('email', email)
      .single();

    if (existingMember) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert new member
    const { data, error } = await supabase
      .from('members')
      .insert([
        {
          full_name: fullName,
          email: email,
          whatsapp: whatsapp,
          filiere: filiere,
          niveau: niveau,
          role: role
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({
      success: true,
      message: 'Member registered successfully',
      memberId: data[0].id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
