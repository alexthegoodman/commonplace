// colors from https://coolors.co
const impressions = [
  {
    title: "Honor",
    list: [
      { content: "My favorite today", color: "#db533b" },
      { content: "Accessible", color: "#e8eef1" },
      { content: "Balanced", color: "#29ad97" },
      { content: "Bold", color: "#43b0f1" },
      { content: "Brainy", color: "#ff6361" },
      { content: "Brave", color: "#057dcd" },
      { content: "Pulls me in", color: "#1e3d58" },
      { content: "Brawny", color: "#d74a49" },
      { content: "Catchy", color: "#aae8ed" },
      { content: "Classy", color: "#5b8c5a" },
      { content: "Clean", color: "#cfd186" },
      { content: "Delicate", color: "#e3655b" },
      { content: "Love the vibe", color: "#f2e0d5" },
      { content: "Delightful", color: "#003f5c" },
      { content: "Fresh", color: "#526a40" },
      { content: "Gigantic", color: "#ffa600" },
      { content: "Graceful", color: "#d9a7b0" },
      { content: "Idealistic", color: "#a7cbd9" },
      { content: "Joyous", color: "#68a0a6" },
      { content: "Lavish", color: "#4100d4" },
      { content: "Lean", color: "#94bf73" },
      { content: "Light", color: "#58508d" },
      { content: "Lush", color: "#a66f6f" },
      { content: "Masterful", color: "#75cc56" },
      { content: "Meaty", color: "#918ef4" },
      { content: "Pleasant", color: "#596157" },
      { content: "Powerful", color: "#cc02c9" },
      { content: "Profound", color: "#5b8c5a" },
      { content: "Slim", color: "#b5ea8c" },
      { content: "Smooth", color: "#fc5050" },
      { content: "Soft", color: "#cfd186" },
      { content: "Substantial", color: "#e3655b" },
      { content: "Upbeat", color: "#b0a1ba" },
      { content: "Warm", color: "#bc5090" },
    ],
  },
  {
    title: "Creative",
    list: [
      { content: "Great use of color", color: "#809bce" },
      { content: "Atmospheric", color: "#e12729" },
      { content: "Chic", color: "#caff8a" },
      { content: "Danceable", color: "#a5b5bf" },
      { content: "Dazzling", color: "#f37324" },
      { content: "Different", color: "#95b8d1" },
      { content: "I love your style", color: "#abc8c7" },
      { content: "Distinct", color: "#826aed" },
      { content: "Earthy", color: "#b8e0d4" },
      { content: "Electric", color: "#efa721" },
      { content: "Elegant", color: "#b8e2c8" },
      { content: "Exotic", color: "#3bf4fb" },
      { content: "Good combo", color: "#eac4d5" },
      { content: "Futuristic", color: "#bff0d4" },
      { content: "Ghostly", color: "#eae0d5" },
      { content: "Hypnotic", color: "#f8cc1b" },
      { content: "Imaginative", color: "#f1ddbf" },
      { content: "Jazzy", color: "#c6ac8f" },
      { content: "Cool mood", color: "#c879ff" },
      { content: "Magical", color: "#e1ce7a" },
      { content: "Majestic", color: "#d3d306" },
      { content: "Original", color: "#ebcfb2" },
      { content: "Panoramic", color: "#525e75" },
      { content: "Retro", color: "#dafc7b" },
      { content: "Great perspective", color: "#c5baaf" },
      { content: "Rustic", color: "#78938a" },
      { content: "Spicy", color: "#72b043" },
      { content: "Spooky", color: "#5e503f" },
      { content: "Theatrical", color: "#ffb7ff" },
      { content: "Tropical", color: "#92ba92" },
      { content: "Watery", color: "#007f4e" },
    ],
  },
  {
    title: "Intellect",
    list: [
      { content: "Reminds me of home", color: "#c4a29e" },
      { content: "Brief", color: "#eba6a9" },
      { content: "Careful", color: "#ff595e" },
      { content: "Clear", color: "#82204a" },
      { content: "Deep", color: "#ffc6ac" },
      { content: "Dynamic", color: "#ffca3a" },
      { content: "Gives me an idea", color: "#9a98b5" },
      { content: "Focused", color: "#b8c4bb" },
      { content: "Functional", color: "#663f46" },
      { content: "Helpful", color: "#c9d6ea" },
      { content: "Holistic", color: "#558c8c" },
      { content: "Intelligent", color: "#8ac926" },
      { content: "Smart approach", color: "#c49991" },
      { content: "Intricate", color: "#f40076" },
      { content: "Knowledgeable", color: "#279af1" },
      { content: "Memorable", color: "#1982c4" },
      { content: "Modern", color: "#802392" },
      { content: "Necessary", color: "#e8db7d" },
      { content: "Nifty", color: "#6a4c93" },
      { content: "Rare", color: "#60656f" },
      { content: "Scientific", color: "#0e7c7b" },
      { content: "Sharp", color: "#17bebb" },
      { content: "Simple", color: "#eff7ff" },
      { content: "Sophisticated", color: "#995fa3" },
    ],
  },
  {
    title: "Action",
    list: [
      { content: "People would buy this", color: "#a5f8d3" },
      { content: "Adaptable", color: "#00202e" },
      { content: "Adventurous", color: "#d4f4dd" },
      { content: "Arduous", color: "#d62246" },
      { content: "Calm", color: "#a0b9c6" },
      { content: "Fast", color: "#003f5c" },
      { content: "Great form", color: "#4b1d3f" },
      { content: "Handy", color: "#414770" },
      { content: "Healthy", color: "#5b85aa" },
      { content: "Invincible", color: "#2c4875" },
      { content: "Lively", color: "#db5aba" },
      { content: "Mighty", color: "#a14ebf" },
      { content: "Natural", color: "#8a508f" },
      { content: "Optimal", color: "#7a9b76" },
      { content: "Productive", color: "#5fb0b7" },
      { content: "Ready", color: "#5a2328" },
      { content: "Refreshing", color: "#6c91bf" },
      { content: "Robust", color: "#ff6361" },
      { content: "Steady", color: "#8a7e72" },
      { content: "Sturdy", color: "#f46036" },
      { content: "Sunny", color: "#ff8531" },
      { content: "Tested", color: "#5bc8af" },
      { content: "Tidy", color: "#c455a8" },
      { content: "Tough", color: "#73a6ad" },
      { content: "Towering", color: "#ffa600" },
      { content: "Tranquil", color: "#4effef" },
      { content: "Useful", color: "#ffd380" },
    ],
  },
  {
    title: "Social",
    list: [
      { content: "My friends would like this", color: "#f92a82" },
      { content: "Adorable", color: "#ed7b84" },
      { content: "Alluring", color: "#d9042b" },
      { content: "Bittersweet", color: "#f39237" },
      { content: "Bizarre", color: "#d63230" },
      { content: "Comical", color: "#f5dbcb" },
      { content: "You should share this", color: "#c1b098" },
      { content: "Confident", color: "#e9d2f4" },
      { content: "Cultured", color: "#730220" },
      { content: "Discreet", color: "#9b9b93" },
      { content: "Encouraging", color: "#39393a" },
      { content: "Familiar", color: "#d6d5b3" },
      { content: "Funny", color: "#63b0cd" },
      { content: "Harmonious", color: "#03658c" },
      { content: "Heartwarming", color: "#9b1d20" },
      { content: "Heavenly", color: "#3d2b3d" },
      { content: "Hilarious", color: "#7eb77f" },
      { content: "Homely", color: "#635d5c" },
      { content: "Mature", color: "#f29f05" },
      { content: "Mysterious", color: "#1c77c3" },
      { content: "Neighborly", color: "#cbefb6" },
      { content: "Nostalgic", color: "#d0ffce" },
      { content: "Open", color: "#ff0000" },
      { content: "Peaceful", color: "#f27b50" },
      { content: "Quiet", color: "#ffeaae" },
      { content: "Romantic", color: "#ffc100" },
      { content: "Rousing", color: "#39a9db" },
      { content: "Sentimental", color: "#306bac" },
      { content: "Sincere", color: "#ff8200" },
      { content: "Tasteful", color: "#6f9ceb" },
      { content: "Tender", color: "#98b9f2" },
      { content: "Thoughtful", color: "#40bcd8" },
    ],
  },
];

export default impressions;
