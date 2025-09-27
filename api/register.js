import { createClient } from '@supabase/supabase-js';

// إنشاء عميل Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // السماح بـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // التعامل مع OPTIONS request
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

    // التحقق من البيانات المطلوبة
    if (!full_name || !email || !whatsapp || !filiere || !niveau || !role) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }

    // إدراج العضو الجديد
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
      
      // التحقق من خطأ البريد المكرر
      if (error.code === '23505') {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني مسجل مسبقاً'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'خطأ في قاعدة البيانات'
      });
    }

    // إرسال رد النجاح
    res.status(200).json({
      success: true,
      message: 'تم التسجيل بنجاح! مرحباً بك في BDE',
      member: data[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
}
