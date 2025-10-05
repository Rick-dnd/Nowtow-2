# Nowtown Platform - Essential Assets for Rebuild

This folder contains all critical images, logos, and visual assets needed for the Nowtown platform rebuild.

## 📁 Folder Contents

### Logo Files
- `nowtown-logo.png` - Main platform logo (use in header/footer)
- `Logo-Dashboard.png` - Dashboard logo variant
- `default-avatar.jpg` - Default user avatar fallback

### Hero Images
- `hero1.jpg` - Homepage hero background option 1
- `hero2.jpg` - Homepage hero background option 2
- `hero3.jpg` - Homepage hero background option 3

### Category Images (`categories/` folder)

#### Event Categories
- `Kunst-event.jpg` - Kunst & Kreatives events
- `Musik-und-Performance.jpg` - Musik & Performance events
- `Sport-und-Fitness.jpg` - Sport & Fitness events
- `Familie.jpg` - Familie & Kinder events
- `workshop.jpg` - Workshop events
- `spontane-treffen.jpg` - Spontane Treffen events
- `Nightlife.jpg` - Party & Nightlife events

#### Space Categories
- `Tonstudio.jpg` - Tonstudio spaces
- `Fotostudio.jpg` - Fotostudio spaces
- `Werkstatt.jpg` - Werkstätten spaces
- `Kunstraeume.jpg` - Kunst & Töpferstudio spaces
- `Sonstige.jpg` - Popup & Retail spaces
- `Yoga-und-Tanzraeume.jpg` - Sporträume spaces
- `Gaming-und-Podcast.jpg` - Gaming & Podcast spaces

## 🎨 Usage Guidelines

### Logo Usage
```tsx
// Header Logo
<Image
  src="/nowtown-logo.png"
  alt="Nowtown"
  width={120}
  height={40}
  priority
/>

// Dashboard Logo
<Image
  src="/Logo-Dashboard.png"
  alt="Nowtown Dashboard"
  width={80}
  height={80}
/>
```

### Hero Images
- Use as background for hero section
- Apply overlay gradient for text readability
- Optimize with next/image for better performance

### Category Images
- Display in category cards on homepage
- Use with hover effects (scale, brightness)
- Add subtle overlay for text contrast
- Ensure alt text describes the category

## 📐 Image Specifications

### Recommended Sizes
- **Logo**: 400x400px minimum (transparent PNG)
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Category Images**: 800x600px (4:3 aspect ratio)
- **Avatars**: 200x200px (square)

### Optimization
All images should be:
- Compressed for web (use next/image automatic optimization)
- Served in WebP/AVIF format when possible
- Include proper alt text for accessibility
- Use lazy loading for below-fold images

## 🔄 Migration Notes

When rebuilding:
1. Copy this entire `ASSETS_FOR_REBUILD` folder to new project's `public/` directory
2. Update image paths in components
3. Use Next.js Image component for all images
4. Add proper alt text for accessibility
5. Test images load correctly on all pages

## 📝 Missing Assets

If you need additional assets not included here:
- Check original project's `public/` folder
- Create placeholders using unsplash.com for development
- Replace placeholders with real images before production

## ✅ Checklist for Developers

Before using these assets:
- [ ] Copy folder to `public/` directory
- [ ] Verify all images load correctly
- [ ] Add proper alt text to all images
- [ ] Optimize images for web performance
- [ ] Test on mobile and desktop
- [ ] Ensure WCAG contrast ratios for text overlays
- [ ] Use next/image for automatic optimization
