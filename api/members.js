import { createClient } from '@supabase/supabase-js';

// إنشاء عميل Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // السماح بـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // التعامل مع OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // الحصول على جميع الأعضاء
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({
          success: false,
          message: 'خطأ في جلب البيانات'
        });
      }

      return res.status(200).json({
        success: true,
        members: data
      });

    } else if (req.method === 'DELETE') {
      // حذف عضو
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'معرف العضو مطلوب'
        });
      }

      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        return res.status(500).json({
          success: false,
          message: 'خطأ في حذف العضو'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'تم حذف العضو بنجاح'
      });

    } else {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
}
