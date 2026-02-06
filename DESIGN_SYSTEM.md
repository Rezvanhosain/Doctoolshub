# DocTools Hub - Design System

## Brand Identity

**Name**: DocTools Hub  
**Tagline**: Free, Fast, Secure PDF Tools  
**Philosophy**: Simplicity meets functionality. Professional tools for everyday document needs.

## Color Palette

### Primary Colors
- **Vibrant Teal**: `#0891b2` - Primary action, CTAs, highlights
- **Deep Slate**: `#0f172a` - Text, backgrounds, strong contrast
- **Soft Cream**: `#fafaf8` - Light backgrounds, cards

### Accent Colors
- **Success Green**: `#10b981` - Confirmations, completed states
- **Warning Amber**: `#f59e0b` - Warnings, cautions
- **Error Red**: `#ef4444` - Errors, destructive actions
- **Neutral Gray**: `#6b7280` - Secondary text, borders

### Semantic Colors
- **Background**: `#ffffff` or `#fafaf8`
- **Surface**: `#f3f4f6`
- **Border**: `#e5e7eb`
- **Text Primary**: `#0f172a`
- **Text Secondary**: `#6b7280`

## Typography System

### Font Families
- **Display/Headings**: `Geist` (bold, 700) - Modern, geometric sans-serif
- **Body/UI**: `Inter` (regular 400, medium 500, semibold 600) - Clean, highly legible

### Type Scale
- **H1 (Hero)**: 48px, weight 700, line-height 1.2
- **H2 (Section)**: 36px, weight 700, line-height 1.25
- **H3 (Subsection)**: 24px, weight 600, line-height 1.35
- **Body Large**: 18px, weight 400, line-height 1.6
- **Body Regular**: 16px, weight 400, line-height 1.6
- **Body Small**: 14px, weight 400, line-height 1.5
- **Label**: 12px, weight 600, line-height 1.4, uppercase, letter-spacing 0.5px

## Component Styles

### Buttons
- **Primary**: Teal background, white text, rounded corners (8px), padding 12px 24px
- **Secondary**: White background, teal text, teal border, rounded corners (8px)
- **Ghost**: Transparent, teal text, hover: light teal background
- **Hover State**: Slight shadow, 2px lift effect
- **Disabled**: 50% opacity, no cursor

### Cards
- **Background**: White or soft cream
- **Border**: 1px solid `#e5e7eb`
- **Radius**: 12px
- **Shadow**: `0 1px 3px rgba(0,0,0,0.1)` on hover
- **Padding**: 20px
- **Spacing between cards**: 16px

### Input Fields
- **Border**: 1px solid `#e5e7eb`
- **Radius**: 8px
- **Padding**: 12px 16px
- **Focus**: Teal border (2px), subtle shadow
- **Placeholder**: `#9ca3af`

### Tool Cards (Grid)
- **Size**: 240px × 280px (responsive)
- **Icon**: 64px, teal color
- **Title**: 16px, bold
- **Description**: 14px, gray text
- **Favorite Toggle**: Star icon, top-right corner
- **Hover**: Slight lift (2px shadow), scale 1.02

## Layout System

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Container Widths
- **Mobile**: Full width with 16px padding
- **Tablet**: 768px max-width
- **Desktop**: 1280px max-width
- **Wide**: 1536px max-width

### Grid System
- **Tool Cards**: 6 columns on desktop, 3 on tablet, 1 on mobile
- **Gutter**: 16px between cards

## Interactive Patterns

### Transitions
- **Default**: 200ms ease-in-out
- **Hover**: 150ms ease-out
- **Entrance**: 300ms ease-out

### Animations
- **Card Hover**: Scale 1.02, shadow increase
- **Button Hover**: Background color shift, slight lift
- **Fade In**: 300ms opacity transition on page load
- **Slide Up**: 300ms transform from bottom on scroll

### Drag & Drop
- **Active Zone**: Dashed teal border (2px), light teal background
- **Hover**: Solid teal border
- **Accepted**: Green checkmark, success message

## Icons
- **Source**: Lucide React (open-source)
- **Size**: 24px (standard), 32px (large), 16px (small)
- **Color**: Inherit from text color or use teal for primary actions
- **Stroke Width**: 2px

## Accessibility
- **Color Contrast**: WCAG AA minimum (4.5:1 for text)
- **Focus States**: Clear 2px outline in teal
- **Keyboard Navigation**: All interactive elements accessible via Tab
- **ARIA Labels**: Descriptive labels for screen readers
- **Motion**: Respect `prefers-reduced-motion`

## Dark Mode (Future)
- **Background**: `#0f172a`
- **Surface**: `#1e293b`
- **Text Primary**: `#f8fafc`
- **Text Secondary**: `#cbd5e1`
- **Accent**: `#06b6d4` (lighter teal)
