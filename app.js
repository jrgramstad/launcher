/**
 * AJ Real Estate Group - App Launcher
 * Main application data and functionality
 */

// App data - Loaded from JSON configuration file
let apps = [];

// DOM elements
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

/**
 * Loads app configuration from JSON file
 * @returns {Promise<Array>} Array of app objects
 */
async function loadAppConfig() {
    try {
        const response = await fetch('apps-config.json');

        if (!response.ok) {
            throw new Error(`Failed to load apps configuration: ${response.status}`);
        }

        const data = await response.json();
        return data.apps;
    } catch (error) {
        console.error('Error loading app configuration:', error);
        showError('Unable to load apps. Please check that apps-config.json exists.');
        return [];
    }
}

/**
 * Shows an error message to the user
 * @param {string} message - The error message to display
 */
function showError(message) {
    appGrid.innerHTML = `
        <div style="
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: #FF3B30;
            font-size: 18px;
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
            <div>${message}</div>
        </div>
    `;
}

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
async function init() {
    // Load app configuration from JSON
    apps = await loadAppConfig();

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
 * App configuration is now stored in apps-config.json
 * Edit that file to manage your apps!
 *
 * To add a new app:
 * 1. Open apps-config.json
 * 2. Add a new object to the "apps" array with:
 *    - name: Display name of the app
 *    - icon: Emoji icon
 *    - status: 'deployed', 'in-progress', or 'planned'
 *    - url: The URL to open when clicked (use '#' as placeholder)
 *    - color: Hex color for the icon background
 *    - description: Brief description of the app
 *
 * To update an app URL:
 * 1. Open apps-config.json
 * 2. Find the app and update the 'url' property
 *
 * To change an app status:
 * 1. Open apps-config.json
 * 2. Find the app and update the 'status' property
 *
 * Example app entry in apps-config.json:
 * {
 *     "name": "My New App",
 *     "icon": "🚀",
 *     "status": "deployed",
 *     "url": "https://myapp.example.com",
 *     "color": "#FF6B6B",
 *     "description": "My awesome new app"
 * }
 */
