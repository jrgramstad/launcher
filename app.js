/**
 * AJ Real Estate Group - App Launcher
 * Main application data and functionality
 */

// App data - Easy to update and extend
const apps = [
    {
        name: 'Credit Card Transactions',
        icon: '💳',
        status: 'deployed',
        url: '#', // Update with actual URL when available
        color: '#34C759'
    },
    {
        name: 'Accounting Software',
        icon: '📊',
        status: 'deployed',
        url: '#',
        color: '#007AFF'
    },
    {
        name: 'Auction Analysis',
        icon: '🏠',
        status: 'deployed',
        url: '#',
        color: '#AF52DE'
    },
    {
        name: 'Property Inspection',
        icon: '📋',
        status: 'in-progress',
        url: '#',
        color: '#FF9500'
    },
    {
        name: 'KPI Dashboard',
        icon: '📈',
        status: 'planned',
        url: '#',
        color: '#5AC8FA'
    },
    {
        name: 'Crew Timesheet',
        icon: '⏱️',
        status: 'planned',
        url: '#',
        color: '#8E8E93'
    },
    {
        name: 'Maintenance Requests',
        icon: '🔧',
        status: 'planned',
        url: '#',
        color: '#FF3B30'
    },
    {
        name: 'Vendor Performance',
        icon: '📊',
        status: 'planned',
        url: '#',
        color: '#5856D6'
    },
    {
        name: 'Eviction Tracking',
        icon: '🚪',
        status: 'planned',
        url: '#',
        color: '#FFD60A'
    }
];

// DOM elements
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

/**
 * Creates an app card element
 * @param {Object} app - The app object
 * @returns {HTMLElement} The app card element
 */
function createAppCard(app) {
    // Create main card link
    const card = document.createElement('a');
    card.className = 'app-card';
    card.href = app.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Open ${app.name} - Status: ${app.status}`);

    // Prevent default if URL is placeholder
    if (app.url === '#') {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`${app.name} - URL not configured yet`);
        });
    }

    // Create icon container
    const iconContainer = document.createElement('div');
    iconContainer.className = 'app-icon-container';

    // Create icon
    const icon = document.createElement('div');
    icon.className = 'app-icon';
    icon.style.backgroundColor = app.color;
    icon.textContent = app.icon;
    icon.setAttribute('aria-hidden', 'true');

    // Create status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.className = `status-indicator status-${app.status}`;
    statusIndicator.setAttribute('aria-label', `Status: ${app.status}`);

    // Create app name
    const name = document.createElement('div');
    name.className = 'app-name';
    name.textContent = app.name;

    // Assemble the card
    iconContainer.appendChild(icon);
    iconContainer.appendChild(statusIndicator);
    card.appendChild(iconContainer);
    card.appendChild(name);

    return card;
}

/**
 * Renders all apps to the grid
 * @param {Array} appsToRender - Array of app objects to render
 */
function renderApps(appsToRender) {
    // Clear existing apps
    appGrid.innerHTML = '';

    if (appsToRender.length === 0) {
        // Show no results message
        noResults.style.display = 'block';
        appGrid.style.display = 'none';
    } else {
        // Hide no results message
        noResults.style.display = 'none';
        appGrid.style.display = 'grid';

        // Create and append app cards
        appsToRender.forEach(app => {
            const appCard = createAppCard(app);
            appGrid.appendChild(appCard);
        });
    }
}

/**
 * Filters apps based on search query
 * @param {string} query - The search query
 */
function filterApps(query) {
    const searchTerm = query.toLowerCase().trim();

    if (searchTerm === '') {
        // Show all apps if search is empty
        renderApps(apps);
    } else {
        // Filter apps by name
        const filteredApps = apps.filter(app =>
            app.name.toLowerCase().includes(searchTerm)
        );
        renderApps(filteredApps);
    }
}

/**
 * Handles search input events
 */
function handleSearch() {
    const query = searchInput.value;
    filterApps(query);
}

/**
 * Initializes the application
 */
function init() {
    // Render all apps initially
    renderApps(apps);

    // Set up search event listener
    searchInput.addEventListener('input', handleSearch);

    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Focus search on CMD/Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        // Clear search on Escape
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterApps('');
            searchInput.blur();
        }
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * INSTRUCTIONS FOR UPDATING:
 *
 * To add a new app:
 * 1. Add a new object to the apps array above with:
 *    - name: Display name of the app
 *    - icon: Emoji icon (or you can use an image path later)
 *    - status: 'deployed', 'in-progress', or 'planned'
 *    - url: The URL to open when clicked (use '#' as placeholder)
 *    - color: Hex color for the icon background
 *
 * To update an app URL:
 * 1. Find the app in the apps array
 * 2. Update the 'url' property with the actual URL
 *
 * To change an app status:
 * 1. Find the app in the apps array
 * 2. Update the 'status' property to 'deployed', 'in-progress', or 'planned'
 *
 * Example:
 * {
 *     name: 'My New App',
 *     icon: '🚀',
 *     status: 'deployed',
 *     url: 'https://myapp.example.com',
 *     color: '#FF6B6B'
 * }
 */
