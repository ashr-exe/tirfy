// Background service worker for TIRFY

// Handle extension installation
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
        console.log('TIRFY extension installed');
        
        // Set default values
        await chrome.storage.sync.set({
            setupComplete: false,
            currentStyle: 'shakespeare',
            enabled: true
        });
    }
});

// Handle messages between popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Relay messages if needed
    if (message.action === 'relay') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, message.data);
            }
        });
    }
});

// Handle tab updates (optional: auto-apply styles)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        // Check if user has auto-rewrite enabled (future feature)
        const result = await chrome.storage.sync.get(['autoRewrite', 'enabled']);
        
        if (result.autoRewrite && result.enabled) {
            // Auto-apply current style (future feature)
            console.log('Auto-rewrite enabled for:', tab.url);
        }
    }
});

// Context menu (future enhancement)
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'tirfy-rewrite',
        title: 'Rewrite with TIRFY',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'tirfy-rewrite' && info.selectionText) {
        // Send selected text to be rewritten (future feature)
        console.log('Context menu rewrite:', info.selectionText);
    }
});

console.log('TIRFY background script loaded');