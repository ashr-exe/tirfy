# 🎭 TIRFY - The Internet Rewritten For You

> Transform any webpage into your favorite personality's writing style with the power of AI

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285f4?style=for-the-badge&logo=googlechrome)](https://github.com/ashr-exe/tirfy)
[![AI Powered](https://img.shields.io/badge/AI-Powered-00d4aa?style=for-the-badge&logo=googlegemini)](https://github.com/ashr-exe/tirfy)
[![Open Source](https://img.shields.io/badge/Open-Source-ff6b6b?style=for-the-badge&logo=github)](https://github.com/ashr-exe/tirfy)

## ✨ What is TIRFY?

Ever wondered what Wikipedia would sound like if written by Shakespeare? Or how a news article would read in Donald Trump's passionate style? TIRFY makes the impossible possible by transforming any webpage's text into your chosen personality's unique writing style using Google's Gemini AI.

**🚀 One click. Any website. Infinite personalities.**

## 🎪 Featured Personalities

### 📚 **Literary Masters**
- **Shakespeare** - *"To browse or not to browse, that is the question"*
- **Dr. Seuss** - *Simple rhymes and whimsical wordplay*
- **Hemingway** - *Short. Punchy. Powerful sentences.*

### 🎤 **Political Figures**
- **Donald Trump** - *"This website is tremendous, absolutely tremendous"*
- **Barack Obama** - *"Let me be clear, this content is inspiring"*
- **Winston Churchill** - *Bold wartime rhetoric for everyday browsing*

### 🌟 **Pop Culture Icons**
- **Gordon Ramsay** - *"This paragraph is absolutely brilliant!"*
- **Yoda** - *"Read this text, you must. Wise it will make you."*
- **Snoop Dogg** - *Laid-back, smooth content fo' shizzle*
- **David Attenborough** - *Nature documentary narrator voice*
- **Sherlock Holmes** - *Elementary deductions about web content*
- **Eminem** - *Rapid-fire wordplay and internal rhymes*
- **Tony Robbins** - *Maximum motivation for any topic*

### 🛠️ **Functional Styles**
- **ELI5** - Complex topics explained like you're 5 years old
- **Academic Paper** - Scholarly, citation-ready content
- **Your Crush's Texts** - Casual, flirty, emoji-filled vibes 😘

### 🎨 **Custom Style**
Write your own style prompt and watch any webpage transform accordingly!

## 🎬 See It In Action

Transform boring content into entertainment:

```
Original: "The economy showed signs of recovery this quarter."

🎭 Shakespeare: "Verily, the realm's coffers doth show promise of restoration in this season most fair!"

🔥 Gordon Ramsay: "Right, listen up! The economy's finally getting its act together this quarter - bloody brilliant!"

🤖 Yoda: "Signs of recovery, the economy shows. This quarter, promising it is, hmm."
```

## 🚀 Quick Start

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/ashr-exe/tirfy.git
   cd tirfy
   ```

2. **Get your Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a free API key
   - Copy it (starts with "AIza...")

4. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/` (also works for other chromium based browsers like Brave, Edge)
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `tirfy` folder
   - Pin the extension to your toolbar

5. **Setup**
   - Click the TIRFY icon in your toolbar
   - Enter your Gemini API key
   - Choose your default style
   - Start transforming the web! 🎉

### Usage

1. **Visit any website** (Wikipedia, news sites, Reddit, etc.)
2. **Click the TIRFY extension icon**
3. **Choose your desired personality style**
4. **Hit "Rewrite Page"** and watch the magic happen!
5. **Click "Show Original"** to revert back anytime

## 🛠️ Technical Features

- **Smart Content Detection** - Automatically identifies and processes meaningful text while preserving page layout
- **Rate Limiting** - Respects API limits with intelligent batching
- **Error Handling** - Graceful fallbacks ensure your browsing never breaks
- **Privacy First** - All processing happens between you and Google's API
- **Instant Revert** - Switch back to original content with one click
- **Custom Styles** - Write your own transformation prompts

## 🏗️ Built With

- **Chrome Extension API** - Manifest V3 for modern Chrome compatibility
- **Google Gemini AI** - State-of-the-art language model for text transformation
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS3** - Modern, responsive design with smooth animations

## 📁 Project Structure

```
tirfy/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.css             # Styling and animations
├── popup.js              # Popup logic and API integration
├── content.js            # Page content processing
├── background.js         # Service worker
├── icons/                # Extension icons
└── README.md            # You are here!
```

## 🎯 Use Cases

### 📖 **Education**
- Transform complex academic papers into simple explanations
- Make dry textbooks engaging with fun personality rewrites
- Learn about different writing styles through comparison

### 🎪 **Entertainment**  
- Turn news articles into comedy gold with Gordon Ramsay's style
- Read social media in Shakespeare's eloquent language
- Make boring work emails sound like Tony Robbins motivation

### ♿ **Accessibility**
- Simplify complex content with ELI5 mode
- Transform formal language into casual, easy-to-understand text
- Make academic content accessible to broader audiences

### 🎨 **Content Creation**
- Study different writing styles for your own work
- Generate inspiration by seeing content in new voices
- Practice writing by analyzing AI transformations

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly** on different websites
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### 🐛 Bug Reports

Found a bug? Please open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser version and OS
- Website where the issue occurred

### 💡 Feature Requests

Have an idea? We'd love to hear it! Open an issue with:
- Clear description of the feature
- Use case examples
- Why it would benefit users

## 🔮 Roadmap

- [ ] **More Personalities** - Add celebrities, fictional characters, and historical figures
- [ ] **Batch Processing** - Process multiple tabs simultaneously  
- [ ] **Style Intensity** - Slider to control how dramatically text is transformed
- [ ] **Comparison View** - Side-by-side original vs transformed text
- [ ] **Export Options** - Save transformed content as PDF or text file
- [ ] **Smart Auto-Apply** - Automatically apply styles to specific websites
- [ ] **Firefox Support** - Port to Firefox addon platform
- [ ] **Mobile Version** - Browser extension for mobile browsers

## ⚠️ Limitations

- **API Costs** - Heavy usage may incur Gemini API charges (free tier available)
- **Rate Limits** - Google API has usage limits
- **Complex Layouts** - Some websites with complex designs may have minor layout shifts
- **Real-time Content** - Dynamic content that loads after page render won't be processed

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the powerful language model
- **Chrome Extensions Team** - For the robust extension platform
- **Open Source Community** - For inspiration and best practices
- **Beta Testers** - For helping make TIRFY awesome

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/ashr-exe/tirfy/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ashr-exe/tirfy/discussions)  
- 📧 **Email**: aekhan1301@example.com

---

<div align="center">

**Made with ❤️ for the internet**

*Transform your browsing experience today!*

[![Star this repo](https://img.shields.io/github/stars/ashr-exe/tirfy?style=social)](https://github.com/ashr-exe/tirfy)
[![Follow on GitHub](https://img.shields.io/github/followers/ashr-exe?style=social)](https://github.com/ashr-exe)

</div>
