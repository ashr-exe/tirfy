// Content script for TIRFY
let originalTexts = new Map();
let isRewritten = false;

// Style prompts for each personality
const STYLE_PROMPTS = {
    shakespeare: "Rewrite this text in the style of William Shakespeare. Use thou, thee, thy, flowery language, iambic pentameter when possible, and Elizabethan vocabulary. Make it dramatic and poetic. Must keep the response roughly the same length as the original text.",
    
    seuss: "Rewrite this text in the style of Dr. Seuss. Use simple rhymes, playful made-up words, repetitive patterns, and childlike wonder. Make it fun and rhythmic. Must keep the response roughly the same length as the original text.",
    
    hemingway: "Rewrite this text in Ernest Hemingway's style. Use short, declarative sentences. Be direct and understated. Use simple vocabulary and minimal adjectives. Show, don't tell. Must keep the response roughly the same length as the original text.",
    
    trump: "Rewrite this text in Donald Trump's speaking style. Use superlatives like 'tremendous', 'incredible', 'the best'. Repeat key phrases. Use simple sentences and emphasize how great things are. Add 'believe me' and 'many people say'. Must keep the response roughly the same length as the original text." ,
    
    obama: "Rewrite this text in Barack Obama's speaking style. Use measured, thoughtful language. Include phrases like 'let me be clear', 'the fact is', and 'make no mistake'. Be eloquent and inspiring. Must keep the response roughly the same length as the original text.",
    
    churchill: "Rewrite this text in Winston Churchill's style. Use dramatic, wartime rhetoric. Be bold and inspiring. Use parallel structure and powerful metaphors. Make it sound like a rallying speech. Must keep the response roughly the same length as the original text.",
    
    gordon: "Rewrite this text in Gordon Ramsay's style. Use British slang, cooking metaphors, and passionate intensity. Include phrases like 'bloody hell', 'absolutely brilliant', and be dramatically expressive about everything. Must keep the response roughly the same length as the original text.",
    
    yoda: "Rewrite this text in Yoda's speaking style. Reverse the normal sentence structure (Object-Subject-Verb). Use wisdom-filled phrases and speak in a mystical, ancient way. End sentences with 'hmm' occasionally. Must keep the response roughly the same length as the original text.",
    
    snoop: "Rewrite this text in Snoop Dogg's laid-back style. Use west coast slang, 'fo shizzle', '-izzle' endings, and casual, cool language. Make it sound smooth and relaxed. Must keep the response roughly the same length as the original text.",
    
    attenborough: "Rewrite this text in David Attenborough's nature documentary style. Use vivid, descriptive language about natural behaviors. Make everything sound fascinating and observed from nature. Must keep the response roughly the same length as the original text.",
    
    sherlock: "Rewrite this text in Sherlock Holmes' style. Use Victorian language, deductive reasoning, and intellectual observations. Include 'elementary', 'my dear Watson' style phrases. Must keep the response roughly the same length as the original text.",
    
    eminem: "Rewrite this text in Eminem's rap battle style. Use aggressive, rapid-fire language. Include internal rhymes and wordplay. Make it sound like a verbal battle. Must keep the response roughly the same length as the original text.",
    
    robbins: "Rewrite this text in Tony Robbins' motivational speaker style. Use energetic, inspiring language. Include phrases about potential, success, and taking action. Make everything sound empowering. Must keep the response roughly the same length as the original text.",
    
    eli5: "Rewrite this text to explain it like the reader is 5 years old. Use very simple words, short sentences, and fun comparisons they can understand. Make complex ideas easy and fun. Must keep the response roughly the same length as the original text.",
    
    academic: "Rewrite this text in formal academic paper style. Use complex sentence structures, scholarly vocabulary, and citations format. Make it sound like it belongs in a peer-reviewed journal. Must keep the response roughly the same length as the original text.",
    
    crush: "Rewrite this text like you're texting your crush. Use casual language, emojis, abbreviations like 'u', 'ur', 'omg'. Be flirty, excited, and use modern text speak. Add relevant emojis. Must keep the response roughly the same length as the original text."
};

// Listen for messages from popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'rewrite') {
        await rewritePage(message.style, message.apiKey, message.customStyleText);
    } else if (message.action === 'revert') {
        revertPage();
    }
});


function findTextElements() {
    const elements = [];
    const selectors = 'p, h1, h2, h3, h4, h5, h6, li, blockquote';
    
    document.querySelectorAll(selectors).forEach(element => {
        // Skip infoboxes, tables, and Wikipedia-specific elements
        if (element.closest('.infobox, .navbox, .sidebar, table, .reference, .citation, .metadata, .hatnote, .dablink')) return;
        
        // Skip navigation, ads, etc.
        if (element.closest('nav, .nav, .navigation, .ads, .advertisement, footer, header')) return;
        
        const text = element.textContent.trim();
        if (text.length > 20 && text.length < 500) { // Shorter max length
            elements.push(element);
        }
    });
    
    return elements;
}

// Rewrite page with selected style
async function rewritePage(style, apiKey, customStyleText) {
    if (isRewritten) {
        revertPage(); // Revert first if already rewritten
    }
    
    const textElements = findTextElements();
    console.log(`Found ${textElements.length} text elements to process`);
    
    // Store original texts
    originalTexts.clear();
    
    for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        const originalText = element.textContent.trim();
        
        if (originalText.length < 10) continue; // Skip very short text
        
        originalTexts.set(element, originalText);
        
        try {
            const rewrittenText = await rewriteText(originalText, style, apiKey, customStyleText);
            if (element.textContent.trim() === originalText) {
                element.textContent = rewrittenText;
            }
            //.textContent = rewrittenText;
        } catch (error) {
            console.error('Failed to rewrite text:', error);
            // Continue with other elements even if one fails
        }
        
        // Small delay to avoid overwhelming the API
        if (i % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    
    isRewritten = true;
}

// Revert page to original text
function revertPage() {
    originalTexts.forEach((originalText, element) => {
        try {
            element.textContent = originalText;
        } catch (error) {
            console.error('Failed to revert element:', error);
        }
    });
    
    isRewritten = false;
}

// Rewrite individual text using Gemini API
async function rewriteText(text, style, apiKey, customStyleText) {
    const prompt = style === 'custom' && customStyleText 
        ? `Rewrite this text in the following style: ${customStyleText}\n\nText: ${text}`
        : `${STYLE_PROMPTS[style]}\n\nText: ${text}`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error('Invalid API response format');
        }
        
    } catch (error) {
        console.error('API call failed:', error);
        return text; // Return original text if rewrite fails
    }
}

// Initialize content script
console.log('TIRFY content script loaded');