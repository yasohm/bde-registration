import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { full_name, email, whatsapp, filiere, niveau, role } = req.body;

    // Validate required fields
    if (!full_name || !email || !whatsapp || !filiere || !niveau || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Insert new member
    const { data, error } = await supabase
      .from('members')
      .insert([{
        full_name: full_name.trim(),
        email: email.toLowerCase().trim(),
        whatsapp: whatsapp.trim(),
        filiere,
        niveau,
        role
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      // Check for duplicate email error
      if (error.code === '23505') {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Database error'
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Registration successful! Welcome to BDE',
      member: data[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}
