const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Empty members array - ready for production
let members = [];

// API Routes
app.post('/api/register', (req, res) => {
  try {
    const { full_name, email, whatsapp, filiere, niveau, role } = req.body;

    // Validation
    if (!full_name || !email || !whatsapp || !filiere || !niveau || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check for duplicate email
    const existingMember = members.find(member => member.email === email.toLowerCase());
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new member
    const newMember = {
      id: members.length + 1,
      full_name: full_name.trim(),
      email: email.toLowerCase().trim(),
      whatsapp: whatsapp.trim(),
      filiere,
      niveau,
      role,
      created_at: new Date().toISOString()
    };

    members.push(newMember);

    res.status(200).json({
      success: true,
      message: 'Registration successful! Welcome to BDE',
      member: newMember
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

app.get('/api/members', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      members: members.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    });
  } catch (error) {
    console.error('Members error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading members'
    });
  }
});

app.delete('/api/members', (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Member ID required'
      });
    }

    const memberIndex = members.findIndex(member => member.id === parseInt(id));
    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    members.splice(memberIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting member'
    });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      total: members.length,
      byFiliere: {},
      byNiveau: {},
      byRole: {},
      recent: 0
    };

    // Calculate recent registrations (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    members.forEach(member => {
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
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating statistics'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BDE Registration System running at http://localhost:${PORT}`);
  console.log(`📝 Registration: http://localhost:${PORT}/index.html`);
  console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`🔑 Admin Password: BDE2024`);
});
