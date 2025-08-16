// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    await initializePopup();
    setupEventListeners();
});

// Initialize popup state
async function initializePopup() {
    const result = await chrome.storage.sync.get(['setupComplete', 'apiKey', 'currentStyle']);
    
    if (!result.setupComplete) {
        showSetupScreen();
    } else if (!result.apiKey) {
        showApiSetup();
    } else {
        showMainInterface();
        if (result.currentStyle) {
            updateSelectedStyle(result.currentStyle);
        }
    }
}

// Show different screens
function showSetupScreen() {
    document.getElementById('setupScreen').classList.remove('hidden');
    document.getElementById('mainInterface').classList.add('hidden');
}

function showApiSetup() {
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('apiSetup').classList.remove('hidden');
    document.getElementById('mainControls').classList.add('hidden');
}

function showMainInterface() {
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('apiSetup').classList.add('hidden');
    document.getElementById('mainControls').classList.remove('hidden');
}

// Event listeners
function setupEventListeners() {
    // Setup completion
    document.getElementById('completeSetup').addEventListener('click', async () => {
        const selectedStyle = document.getElementById('defaultStyleSelect').value;
        await chrome.storage.sync.set({
            setupComplete: true,
            currentStyle: selectedStyle
        });
        
        const result = await chrome.storage.sync.get(['apiKey']);
        if (!result.apiKey) {
            showApiSetup();
        } else {
            showMainInterface();
            updateSelectedStyle(selectedStyle);
        }
    });

    // API key setup
    document.getElementById('saveApiKey').addEventListener('click', async () => {
        const apiKey = document.getElementById('apiKeyInput').value.trim();
        if (apiKey) {
            await chrome.storage.sync.set({ apiKey });
            showMainInterface();
        }
    });

    // Style selection
    document.getElementById('styleSelect').addEventListener('change', async (e) => {
        const style = e.target.value;
        await chrome.storage.sync.set({ currentStyle: style });
        updateSelectedStyle(style);
    });

    // Quick style buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const style = e.target.dataset.style;
            await chrome.storage.sync.set({ currentStyle: style });
            updateSelectedStyle(style);
            document.getElementById('styleSelect').value = style;
        });
    });

    // Custom style modal
    document.getElementById('customStyleBtn').addEventListener('click', () => {
        document.getElementById('customModal').classList.remove('hidden');
    });

    document.getElementById('cancelCustom').addEventListener('click', () => {
        document.getElementById('customModal').classList.add('hidden');
    });

    document.getElementById('applyCustom').addEventListener('click', async () => {
        const customText = document.getElementById('customStyleInput').value.trim();
        if (customText) {
            await chrome.storage.sync.set({ 
                currentStyle: 'custom',
                customStyleText: customText 
            });
            updateSelectedStyle('custom');
            document.getElementById('customModal').classList.add('hidden');
            document.getElementById('styleSelect').value = 'custom';
        }
    });

    // Main actions
    document.getElementById('rewriteBtn').addEventListener('click', rewritePage);
    document.getElementById('revertBtn').addEventListener('click', revertPage);

    // Toggle
    document.getElementById('enableToggle').addEventListener('change', async (e) => {
        await chrome.storage.sync.set({ enabled: e.target.checked });
        updateStatus(e.target.checked ? 'Ready to rewrite' : 'Disabled');
    });
}

// Update selected style in UI
function updateSelectedStyle(style) {
    // Update quick buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === style);
    });
    
    // Update dropdown
    document.getElementById('styleSelect').value = style;
    
    // Update status
    const styleName = getStyleDisplayName(style);
    updateStatus(`Style: ${styleName}`);
}

// Get display name for style
function getStyleDisplayName(style) {
    const names = {
        shakespeare: 'Shakespeare',
        seuss: 'Dr. Seuss',
        hemingway: 'Hemingway',
        trump: 'Donald Trump',
        obama: 'Barack Obama',
        churchill: 'Winston Churchill',
        gordon: 'Gordon Ramsay',
        yoda: 'Yoda',
        snoop: 'Snoop Dogg',
        attenborough: 'David Attenborough',
        sherlock: 'Sherlock Holmes',
        eminem: 'Eminem',
        robbins: 'Tony Robbins',
        eli5: 'ELI5',
        academic: 'Academic Paper',
        crush: "Your Crush's Texts",
        custom: 'Custom Style'
    };
    return names[style] || style;
}

// Update status text
function updateStatus(text) {
    document.getElementById('statusText').textContent = text;
}

// Show progress
function showProgress(text = 'Processing...') {
    document.getElementById('progress').classList.remove('hidden');
    document.getElementById('progressText').textContent = text;
}

// Hide progress
function hideProgress() {
    document.getElementById('progress').classList.add('hidden');
}

// Rewrite page
async function rewritePage() {
    const result = await chrome.storage.sync.get(['currentStyle', 'apiKey', 'customStyleText']);
    
    if (!result.apiKey) {
        updateStatus('API key required');
        showApiSetup();
        return;
    }

    showProgress('Rewriting page...');
    updateStatus('Processing...');

    try {
        // Get active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Send message to content script
        await chrome.tabs.sendMessage(tab.id, {
            action: 'rewrite',
            style: result.currentStyle,
            apiKey: result.apiKey,
            customStyleText: result.customStyleText
        });

        hideProgress();
        updateStatus('Page rewritten!');
        
        // Auto-hide after 2 seconds
        setTimeout(() => {
            updateStatus(`Style: ${getStyleDisplayName(result.currentStyle)}`);
        }, 2000);

    } catch (error) {
        console.error('Rewrite failed:', error);
        hideProgress();
        updateStatus('Rewrite failed');
    }
}

// Revert page
async function revertPage() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await chrome.tabs.sendMessage(tab.id, {
            action: 'revert'
        });

        updateStatus('Showing original text');
        
        // Auto-hide after 2 seconds
        setTimeout(async () => {
            const result = await chrome.storage.sync.get(['currentStyle']);
            updateStatus(`Style: ${getStyleDisplayName(result.currentStyle)}`);
        }, 2000);

    } catch (error) {
        console.error('Revert failed:', error);
        updateStatus('Revert failed');
    }
}