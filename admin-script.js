// BDE Admin Panel System
class BDEAdmin {
    constructor() {
        this.members = JSON.parse(localStorage.getItem('bdeMembers')) || [];
        this.adminPassword = 'BDE2024'; // Change this password as needed
        this.isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
        
        this.initializeEventListeners();
        this.checkLoginStatus();
    }

    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const exportBtn = document.getElementById('exportBtn');
        const quickAddBtn = document.getElementById('quickAddBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const searchInput = document.getElementById('searchInput');
        const parseAndAddBtn = document.getElementById('parseAndAddBtn');
        const closeQuickAddBtn = document.getElementById('closeQuickAddBtn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToExcel());
        }

        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', () => this.showQuickAdd());
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterMembers());
        }

        if (parseAndAddBtn) {
            parseAndAddBtn.addEventListener('click', () => this.parseAndAddMember());
        }

        if (closeQuickAddBtn) {
            closeQuickAddBtn.addEventListener('click', () => this.hideQuickAdd());
        }
    }

    checkLoginStatus() {
        if (this.isLoggedIn) {
            this.showAdminPanel();
        } else {
            this.showLoginForm();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        const errorDiv = document.getElementById('loginError');

        if (password === this.adminPassword) {
            this.isLoggedIn = true;
            sessionStorage.setItem('adminLoggedIn', 'true');
            this.showAdminPanel();
            this.showNotification('Welcome to Admin Panel!', 'success');
        } else {
            errorDiv.style.display = 'block';
            document.getElementById('adminPassword').value = '';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3000);
        }
    }

    showLoginForm() {
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('adminContainer').style.display = 'none';
    }

    showAdminPanel() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminContainer').style.display = 'block';
        this.loadData();
    }

    logout() {
        this.isLoggedIn = false;
        sessionStorage.removeItem('adminLoggedIn');
        this.showLoginForm();
        this.showNotification('Logged out successfully!', 'info');
    }

    loadData() {
        // Load from shared storage first
        const sharedMembers = JSON.parse(localStorage.getItem('bde_shared_members') || '[]');
        
        // Also load from regular storage
        const regularMembers = JSON.parse(localStorage.getItem('bdeMembers') || '[]');
        
        // Combine and remove duplicates
        const allMembers = [...sharedMembers, ...regularMembers];
        this.members = allMembers.filter((member, index, self) => 
            index === self.findIndex(m => m.id === member.id)
        );
        
        this.updateStats();
        this.displayMembers();
    }

    refreshData() {
        this.loadData();
        this.showNotification('Data refreshed successfully!', 'success');
    }

    updateStats() {
        // Total members
        document.getElementById('totalMembers').textContent = this.members.length;

        // Filière stats
        const filiereStats = this.members.reduce((acc, member) => {
            acc[member.filiere] = (acc[member.filiere] || 0) + 1;
            return acc;
        }, {});

        const filiereStatsDiv = document.getElementById('filiereStats');
        filiereStatsDiv.innerHTML = Object.entries(filiereStats)
            .map(([filiere, count]) => `${filiere}: ${count}`)
            .join('<br>') || 'No data';

        // Niveau stats
        const niveauStats = this.members.reduce((acc, member) => {
            acc[member.niveau] = (acc[member.niveau] || 0) + 1;
            return acc;
        }, {});

        const niveauStatsDiv = document.getElementById('niveauStats');
        niveauStatsDiv.innerHTML = Object.entries(niveauStats)
            .map(([niveau, count]) => `${niveau}: ${count}`)
            .join('<br>') || 'No data';
    }

    displayMembers() {
        const membersTable = document.getElementById('membersTable');
        
        if (this.members.length === 0) {
            membersTable.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                    <h3>📝 No members registered yet</h3>
                    <p>Members will appear here once they register on the main page.</p>
                </div>
            `;
            return;
        }

        const tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>WhatsApp</th>
                        <th>Filière</th>
                        <th>Niveau</th>
                        <th>Role</th>
                        <th>Registration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.members.map(member => `
                        <tr>
                            <td>${member.fullName}</td>
                            <td>${member.email}</td>
                            <td>${member.whatsapp}</td>
                            <td>${member.filiere}</td>
                            <td>${member.niveau}</td>
                            <td>${member.role}</td>
                            <td>${member.registrationDate}</td>
                            <td>
                                <button onclick="bdeAdmin.removeMember(${member.id})" 
                                        class="btn btn-warning">
                                    🗑️ Remove
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        membersTable.innerHTML = tableHTML;
    }

    filterMembers() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    removeMember(id) {
        if (confirm('Are you sure you want to remove this member? This action cannot be undone.')) {
            this.members = this.members.filter(member => member.id !== id);
            localStorage.setItem('bdeMembers', JSON.stringify(this.members));
            this.loadData();
            this.showNotification('Member removed successfully!', 'success');
        }
    }

    exportToExcel() {
        if (this.members.length === 0) {
            this.showNotification('No members to export!', 'error');
            return;
        }

        try {
            // Prepare data for Excel
            const excelData = [
                ['Full Name', 'Email', 'WhatsApp', 'Filière', 'Niveau', 'Role', 'Registration Date']
            ];

            this.members.forEach(member => {
                excelData.push([
                    member.fullName,
                    member.email,
                    member.whatsapp,
                    member.filiere,
                    member.niveau,
                    member.role,
                    member.registrationDate
                ]);
            });

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(excelData);

            // Set column widths
            ws['!cols'] = [
                { width: 20 }, // Full Name
                { width: 25 }, // Email
                { width: 15 }, // WhatsApp
                { width: 10 }, // Filière
                { width: 10 }, // Niveau
                { width: 15 }, // Role
                { width: 18 }  // Registration Date
            ];

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'BDE Members');

            // Generate filename with current date
            const currentDate = new Date().toISOString().split('T')[0];
            const filename = `BDE_Members_${currentDate}.xlsx`;

            // Save file
            XLSX.writeFile(wb, filename);
            this.showNotification('Excel file exported successfully!', 'success');
        } catch (error) {
            console.error('Export error:', error);
            this.showNotification('Error exporting to Excel!', 'error');
        }
    }

    showQuickAdd() {
        const quickAddSection = document.getElementById('quickAddSection');
        quickAddSection.style.display = 'block';
        quickAddSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideQuickAdd() {
        const quickAddSection = document.getElementById('quickAddSection');
        quickAddSection.style.display = 'none';
        document.getElementById('quickAddTextarea').value = '';
    }

    parseAndAddMember() {
        const textarea = document.getElementById('quickAddTextarea');
        const data = textarea.value.trim();
        
        if (!data) {
            this.showNotification('Please paste the registration data first!', 'error');
            return;
        }

        try {
            const memberData = this.parseRegistrationData(data);
            
            // Check for duplicate email
            const existingMember = this.members.find(member => 
                member.email.toLowerCase() === memberData.email.toLowerCase()
            );

            if (existingMember) {
                this.showNotification('A member with this email already exists!', 'error');
                return;
            }

            // Add to members array
            this.members.push(memberData);
            
            // Save to both storages
            localStorage.setItem('bdeMembers', JSON.stringify(this.members));
            localStorage.setItem('bde_shared_members', JSON.stringify(this.members));
            
            // Refresh display
            this.loadData();
            this.hideQuickAdd();
            this.showNotification('Member added successfully!', 'success');
            
        } catch (error) {
            this.showNotification('Error parsing data. Please check the format!', 'error');
            console.error('Parse error:', error);
        }
    }

    parseRegistrationData(data) {
        const lines = data.split('\n');
        const memberData = {
            id: Date.now(),
            registrationDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.includes('Name:')) {
                memberData.fullName = trimmedLine.split('Name:')[1].trim();
            } else if (trimmedLine.includes('Email:')) {
                memberData.email = trimmedLine.split('Email:')[1].trim();
            } else if (trimmedLine.includes('WhatsApp:')) {
                memberData.whatsapp = trimmedLine.split('WhatsApp:')[1].trim();
            } else if (trimmedLine.includes('Filière:')) {
                memberData.filiere = trimmedLine.split('Filière:')[1].trim();
            } else if (trimmedLine.includes('Niveau:')) {
                memberData.niveau = trimmedLine.split('Niveau:')[1].trim();
            } else if (trimmedLine.includes('Role:')) {
                memberData.role = trimmedLine.split('Role:')[1].trim();
            }
        });

        // Validate required fields
        if (!memberData.fullName || !memberData.email || !memberData.whatsapp || 
            !memberData.filiere || !memberData.niveau || !memberData.role) {
            throw new Error('Missing required fields');
        }

        return memberData;
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the admin panel
let bdeAdmin;
document.addEventListener('DOMContentLoaded', () => {
    bdeAdmin = new BDEAdmin();
});
