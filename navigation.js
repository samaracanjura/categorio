// ============================================
// CATEGORIO - UNIVERSAL NAVIGATION SCRIPT
// ============================================
// Include this file in ALL pages:
// <script src="navigation.js"></script>

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

/**
 * Navigate to a specific page
 * @param {string} page - The page filename to navigate to
 */
function navigateTo(page) {
    window.location.href = page;
}

/**
 * Go back to dashboard (home)
 */
function goHome() {
    window.location.href = 'index.html';
}

/**
 * Go back (always returns to dashboard)
 */
function goBack() {
    window.location.href = 'index.html';
}

/**
 * Log out with confirmation
 */
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        // Clear any saved data
        localStorage.removeItem('categorio_user');
        localStorage.removeItem('categorio_remember');
        
        // Redirect to login
        window.location.href = 'login.html';
    }
}

/**
 * Navigate to specific pages (convenience functions)
 */
function goToLogin() {
    window.location.href = 'login.html';
}

function goToDashboard() {
    window.location.href = 'index.html';
}

function goToTransactions() {
    window.location.href = 'transactions.html';
}

function goToAddTransaction() {
    window.location.href = 'add-transaction.html';
}

function goToInsights() {
    window.location.href = 'insights.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

// ============================================
// BOTTOM NAVIGATION HANDLER
// ============================================

/**
 * Initialize bottom navigation on page load
 * Automatically highlights the current page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Map pages to nav items
    const pageMap = {
        'index.html': 0,
        'transactions.html': 1,
        'add-transaction.html': 2,
        'insights.html': 3,
        'profile.html': 4
    };
    
    // Get all nav items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set active state based on current page
    if (navItems.length > 0) {
        const activeIndex = pageMap[currentPage];
        if (activeIndex !== undefined) {
            navItems.forEach((item, index) => {
                if (index === activeIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }
    
    // Add click handlers to nav items if they don't have onclick
    navItems.forEach((item, index) => {
        if (!item.hasAttribute('onclick')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                const pages = ['index.html', 'transactions.html', 'add-transaction.html', 'insights.html', 'profile.html'];
                navigateTo(pages[index]);
            });
        }
    });
});

// ============================================
// BACK BUTTON HANDLER
// ============================================

/**
 * Initialize back buttons on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    const backButtons = document.querySelectorAll('.back-button');
    
    backButtons.forEach(button => {
        if (!button.hasAttribute('onclick')) {
            button.addEventListener('click', goBack);
        }
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

/**
 * Add keyboard shortcuts for navigation
 * Alt + H = Home
 * Alt + T = Transactions
 * Alt + A = Add Transaction
 * Alt + I = Insights
 * Alt + P = Profile
 * Esc = Go back
 */
document.addEventListener('keydown', function(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if (e.altKey) {
        switch(e.key.toLowerCase()) {
            case 'h':
                e.preventDefault();
                goToDashboard();
                break;
            case 't':
                e.preventDefault();
                goToTransactions();
                break;
            case 'a':
                e.preventDefault();
                goToAddTransaction();
                break;
            case 'i':
                e.preventDefault();
                goToInsights();
                break;
            case 'p':
                e.preventDefault();
                goToProfile();
                break;
        }
    }
    
    // Escape key goes back (except on login page)
    if (e.key === 'Escape' && !window.location.pathname.includes('login.html')) {
        const modal = document.querySelector('.modal-overlay.show');
        if (modal) {
            // Close modal if open
            if (typeof closeModal === 'function') {
                closeModal();
            }
        } else {
            // Otherwise go back
            goBack();
        }
    }
});

// ============================================
// SESSION CHECK (Optional)
// ============================================

/**
 * Check if user is logged in
 * Redirect to login if not authenticated
 */
function checkAuth() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Skip check on login page
    if (currentPage === 'login.html') {
        return;
    }
    
    // Check if user is logged in
    const user = localStorage.getItem('categorio_user');
    
    if (!user) {
        // User not logged in, redirect to login
        window.location.href = 'login.html';
    }
}

// Uncomment to enable authentication check
// checkAuth();

// ============================================
// PAGE TRANSITION ANIMATION (Optional)
// ============================================

/**
 * Add smooth page transitions
 */
function smoothNavigate(page) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🌸 Categorio Navigation Loaded', 'color: #5C6FFF; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard shortcuts:', 'color: #8B92A8; font-weight: bold;');
console.log('Alt + H = Home');
console.log('Alt + T = Transactions');
console.log('Alt + A = Add Transaction');
console.log('Alt + I = Insights');
console.log('Alt + P = Profile');
console.log('Esc = Go Back');