# Design Brief

## Direction
Minimalist brutalism: stripped-down, no-nonsense Slack-style productivity interface for office teams. Zero decorative color. Pure black, white, grays only. Typography-driven hierarchy. Material 3 soft shadows and rounded corners.

## Tone
Bold, efficient, direct. No-frills. Clarity through restraint. Every pixel serves information density.

## Differentiation
Unusually monochromatic for collaboration software. No brand colors or gradient accents. Speed and clarity through visual minimalism.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Background | 0.99 0 0 | 0.11 0 0 | Page backgrounds, main surfaces |
| Foreground | 0.15 0 0 | 0.97 0 0 | Primary text, high contrast |
| Card | 1.0 0 0 | 0.15 0 0 | Card containers, elevated sections |
| Muted | 0.85 0 0 | 0.28 0 0 | Secondary text, disabled states |
| Border | 0.9 0 0 | 0.25 0 0 | Dividers, input borders |
| Sidebar | 0.98 0 0 | 0.13 0 0 | Left sidebar background |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Delete/warning actions |

## Typography
Display: **General Sans** (geometric, bold, 600–700 weight for headers). Body: **DM Sans** (compact, clean, 400–500 weight). Mono: **Geist Mono** (technical details, code blocks).
Type scale: 12/14/16/18/20/24/32/40px. Line height: 1.4–1.6 for body, 1.2 for headers.

## Structural Zones

| Zone | Background | Border | Shadow | Notes |
|------|-----------|--------|--------|-------|
| Header | card | border-b | none | Top navigation, group title |
| Sidebar | sidebar | sidebar-border | none | Left channel list, vertical divider |
| Main content | background | none | none | Chat area, tasks |
| Footer (mobile) | card | border-t | material-elevated | Bottom navigation tabs |
| Card components | card | border | material | Task cards, user bubbles |

## Spacing & Rhythm
Base unit: 4px. Margins: 8, 12, 16, 24, 32px. Padding: 8, 12, 16, 20px. Border radius: none, 6px (sm), 10px (md), 24px (lg).
Density: Tight horizontal density (compact channel list, collapsed messages). Loose vertical rhythm for scanability.

## Component Patterns
Sidebar: Tree structure, hover highlight, active state (bg-primary). Buttons: Secondary (outline, bg-muted), primary (bg-primary, text-primary-foreground). Inputs: bg-input, border-border, focus:ring. Tabs: Underline style, no background fill. Messages: Sender name + avatar, timestamp, content.

## Motion
Framer Motion: fade-in 300ms, slide-in-left/right 300ms, hover scale 1.02. Easing: cubic-bezier(0.4, 0, 0.2, 1) throughout. Page transitions: light fade or slide.

## Responsive
Mobile-first. Breakpoints: sm 640px, md 768px, lg 1024px. Sidebar → drawer + bottom nav on mobile. Main content stacks vertically. Bottom nav: 56px height, 4 tabs (Home, Groups, Chat, Profile) with icons.

## Constraints
No color accents; destructive only. No blur, glow, or glassmorphism. No full-page gradients. Shadows: 0.05–0.15 opacity only. Max content width: 1400px.

## Signature Detail
Geometric sans-serif headlines paired with minimal tertiary gray for secondary text. Sharp text hierarchy through weight and size, not color. Clean card edges with soft drop shadows create depth without noise.
