# PyramidPlay Music Player

A modern, responsive music player web application built with HTML5, CSS3, and JavaScript.

## Features

- Beautiful, modern UI with a dark theme
- Responsive grid layout for music items
- Interactive music player controls
- Progress bar with seek functionality
- Volume control
- Play/Pause, Previous, and Next track controls
- Album artwork display
- Search functionality (UI only, needs backend implementation)

## Setup

1. Create a `music` folder in the root directory and add your MP3 files
2. Create an `images` folder and add album artwork images
3. Update the HTML file with your music files and album artwork:
   - Add music items in the `music-grid` div
   - Update the `data-src` attribute with your MP3 file paths
   - Update the `img` src attributes with your album artwork paths

## File Structure

```
PyramidPlay/
├── index.html
├── styles.css
├── script.js
├── music/
│   ├── sample1.mp3
│   └── sample2.mp3
└── images/
    ├── album1.jpg
    └── album2.jpg
```

## Usage

1. Open `index.html` in a modern web browser
2. Click on any music item to start playing
3. Use the player controls at the bottom to:
   - Play/Pause
   - Skip to previous/next track
   - Adjust volume
   - Seek through the track using the progress bar

## Browser Support

The player works best in modern browsers that support HTML5 audio:
- Chrome
- Firefox
- Safari
- Edge

## Customization

You can customize the appearance by modifying the `styles.css` file:
- Change colors in the CSS variables
- Adjust layout and spacing
- Modify animations and transitions

## License

This project is open source and available under the MIT License. 