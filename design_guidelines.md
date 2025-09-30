# ICD-10 Excludes 1 Validation Tool - Design Guidelines

## Design Approach
**Selected System:** Material Design 3 (adapted for medical/professional context)
**Rationale:** Medical validation tools require clarity, accessibility, and data-dense layouts. Material Design provides established patterns for tables, forms, and information hierarchy while maintaining professional credibility.

**Core Principles:**
- Clinical precision over decoration
- Information accessibility and scannability
- Trust through consistency and clarity
- Efficient workflow support

---

## Color Palette

**Light Mode:**
- Primary: 210 85% 45% (Professional medical blue)
- Primary Container: 210 100% 95% (Light blue for highlights)
- Surface: 0 0% 100% (Pure white)
- Surface Variant: 210 20% 96% (Subtle gray for cards)
- Error: 0 72% 51% (Critical violation red)
- Warning: 38 92% 50% (Alert amber)
- Success: 142 71% 45% (Validation green)
- On Surface: 210 15% 20% (Dark text)
- Outline: 210 15% 75% (Borders and dividers)

**Dark Mode:**
- Primary: 210 100% 70% (Bright medical blue)
- Primary Container: 210 80% 25% (Deep blue accent)
- Surface: 210 15% 12% (Dark charcoal)
- Surface Variant: 210 15% 18% (Elevated card surface)
- Error: 0 80% 60% (Softened red)
- Warning: 38 100% 55% (Bright amber)
- Success: 142 60% 50% (Muted green)
- On Surface: 210 10% 92% (Light text)
- Outline: 210 10% 35% (Subtle borders)

---

## Typography

**Font Family:**
- Primary: 'Inter' (clean, highly readable for medical data)
- Monospace: 'JetBrains Mono' (for ICD codes display)

**Type Scale:**
- Display: 32px/40px, font-weight 600 (Page titles)
- Headline: 24px/32px, font-weight 600 (Section headers)
- Title: 20px/28px, font-weight 500 (Card titles, modal headers)
- Body Large: 16px/24px, font-weight 400 (Main content)
- Body: 14px/20px, font-weight 400 (Table cells, descriptions)
- Label: 12px/16px, font-weight 500 (Input labels, badges)
- ICD Code: 14px/20px, font-weight 500, monospace (Code display)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Page margins: p-8 to p-12
- Tight spacing (badges, chips): gap-2
- Generous spacing (between major sections): gap-12

**Grid System:**
- Main container: max-w-7xl mx-auto
- Two-column split: 1fr 2fr (filters + results)
- Table layouts: Auto-fit based on content width

---

## Component Library

### A. Upload Zone
**Visual Treatment:**
- Large dashed border (border-2 border-dashed) with primary outline color
- Height: min-h-64
- Background: subtle surface variant with hover state brightening
- Icon: Large cloud upload icon (size-16) in primary color
- Text hierarchy: Bold instruction + helper text below
- Drag state: Border color intensifies to primary, background shifts
- Success state: Green accent with checkmark icon

### B. Validation Results Table
**Structure:**
- Elevated surface (shadow-md) with rounded-xl corners
- Header row: Surface variant background, sticky positioning
- Alternating row colors for scannability (surface / surface-variant)
- Column widths: Invoice ID (15%), ICD Pair (20%), Rule (25%), Explanation (40%)
- Row hover: Subtle primary tint overlay
- Status badges: Pill-shaped with appropriate error/warning colors

**Cell Treatment:**
- ICD codes: Monospace font, badge-style with outline
- Invoice IDs: Bold, linked appearance (underline on hover)
- Explanations: Body text with comfortable line-height

### C. Filter & Search Panel
**Layout:**
- Fixed sidebar or collapsible drawer (responsive)
- Search input: Large with magnifying glass icon
- Filter chips: Rounded-full, surface-variant background, dismissible
- Dropdown filters: Material-style select with floating labels
- Apply/Clear buttons: Full-width, contrasting treatments

### D. Statistics Cards
**Placement:** Top of results area, 3-column grid
**Content:**
- Total Violations count (large number)
- Validated Claims count
- Error Rate percentage
**Styling:**
- Surface elevation with border-l-4 accent (primary/error/warning)
- Icon + number + label vertical layout
- Subtle hover lift effect

### E. Action Buttons
**Primary Actions:**
- Export to Excel: Primary filled button with download icon
- Upload File: Primary filled, prominent placement
**Secondary Actions:**
- Clear Filters: Outlined button
- Retry Validation: Outlined with refresh icon

### F. Empty States
**No Violations Found:**
- Centered large checkmark icon (success color)
- Headline: "No violations detected"
- Subtext: Encouraging message about data quality
**No File Uploaded:**
- Large upload icon (neutral color)
- Clear call-to-action text
- Sample file format reminder

### G. Loading States
- Skeleton screens for table rows (shimmer animation)
- Progress indicator for file processing (linear determinate)
- Spinning loader for validation (indeterminate circular)

---

## Navigation & Header
**Top Bar:**
- Logo/title on left: "ICD-10 Validator" with medical cross icon
- Theme toggle (sun/moon icon) on right
- Help/Documentation link (question mark icon)
- Height: h-16
- Shadow: subtle drop shadow for elevation

---

## Interaction Patterns
- Table rows: Expandable for detailed violation information
- Click ICD codes: Highlight all occurrences across results
- Hover states: Subtle elevation + color shift
- Focus states: 2px primary outline for keyboard navigation
- Transitions: 150ms ease for most interactions, 300ms for expansions

---

## Responsive Behavior
**Desktop (>1024px):**
- Side-by-side filter panel + results table
- 3-column statistics grid

**Tablet (768-1023px):**
- Collapsible filter drawer
- 2-column statistics grid
- Maintain table structure with horizontal scroll

**Mobile (<768px):**
- Stacked card layout replacing table
- Single-column statistics
- Bottom sheet for filters
- Sticky action buttons at bottom

---

## Accessibility Highlights
- WCAG AAA contrast ratios for all text
- Keyboard navigation support throughout
- ARIA labels for icon-only buttons
- Focus trap in modals
- Screen reader announcements for validation results
- Error states clearly communicated with icons + text

---

## Images
**No hero images required** - This is a utility application where immediate functionality takes precedence. All visual interest comes from data visualization, color-coded status indicators, and clean layout hierarchy.