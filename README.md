# React Seamless Slider

A seamless infinite scrolling slider component for React with TypeScript support. Features smooth, continuous scrolling without any visible jumps or blinks. Perfect for displaying logos, testimonials, or any content that needs to scroll infinitely.

## Features

- ✨ **Seamless infinite scroll** - No visible jumps or resets
- 🎨 **Flexible content** - Support for logos, text, or both
- ⚡ **Performance optimized** - CSS animations with image preloading
- 📱 **Responsive** - Works on all screen sizes
- 🔷 **TypeScript support** - Full type definitions included
- 🎛️ **Customizable** - Duration, gap, pause on hover, and more
- 🌙 **Dark mode ready** - Built-in dark mode support
- 🚀 **SSR compatible** - Works with Next.js and other SSR frameworks

## Installation

```bash
npm install react-seamless-slider
```

or

```bash
yarn add react-seamless-slider
```

or

```bash
pnpm add react-seamless-slider
```

## Usage

### Basic Example

```tsx
import { InfiniteSlider } from "react-seamless-slider";
import "react-seamless-slider/InfiniteSlider.css";

function App() {
  const items = [
    { logo: "/logo1.svg", text: "Company 1" },
    { logo: "/logo2.svg", text: "Company 2" },
    { logo: "/logo3.svg", text: "Company 3" },
  ];

  return <InfiniteSlider items={items} />;
}
```

### With Text Only

```tsx
import { InfiniteSlider } from "react-seamless-slider";
import "react-seamless-slider/InfiniteSlider.css";

function App() {
  const items = [
    { text: "Feature 1" },
    { text: "Feature 2" },
    { text: "Feature 3" },
  ];

  return <InfiniteSlider items={items} gap="2rem" />;
}
```

### With Logos Only

```tsx
import { InfiniteSlider } from "react-seamless-slider";
import "react-seamless-slider/InfiniteSlider.css";

function App() {
  const items = [
    { logo: "/logo1.svg", alt: "Logo 1" },
    { logo: "/logo2.svg", alt: "Logo 2" },
    { logo: "/logo3.svg", alt: "Logo 3" },
  ];

  return <InfiniteSlider items={items} duration={20} />;
}
```

### Advanced Example

```tsx
import { InfiniteSlider, SliderItem } from "react-seamless-slider";
import "react-seamless-slider/InfiniteSlider.css";

function App() {
  const items: SliderItem[] = [
    {
      id: "1",
      logo: "/logo1.svg",
      text: "Company 1",
      alt: "Company 1 Logo",
      invertDark: true,
    },
    {
      id: "2",
      logo: "/logo2.svg",
      text: "Company 2",
      alt: "Company 2 Logo",
    },
  ];

  return (
    <InfiniteSlider
      items={items}
      duration={30}
      gap="3rem"
      pauseOnHover={true}
      direction="ltr"
      showGradients={true}
      speed={1}
      onItemClick={(item, index) => {
        console.log("Clicked:", item, index);
      }}
      className="my-custom-slider"
      itemClassName="my-custom-item"
    />
  );
}
```

### Next.js Example

```tsx
"use client";

import { InfiniteSlider } from "react-seamless-slider";
import "react-seamless-slider/InfiniteSlider.css";

export default function HomePage() {
  const items = [
    { logo: "/logo1.svg", text: "Partner 1" },
    { logo: "/logo2.svg", text: "Partner 2" },
  ];

  return <InfiniteSlider items={items} />;
}
```

## Props

### InfiniteSliderProps

| Prop            | Type                                        | Default      | Description                                           |
| --------------- | ------------------------------------------- | ------------ | ----------------------------------------------------- |
| `items`         | `SliderItem[]`                              | **required** | Array of items to display in the slider               |
| `duration`      | `number`                                    | `30`         | Animation duration in seconds                         |
| `gap`           | `number \| string`                          | `"3rem"`     | Gap between items in pixels or CSS value              |
| `pauseOnHover`  | `boolean`                                   | `true`       | Whether to pause animation on hover                   |
| `direction`     | `"ltr" \| "rtl"`                            | `"ltr"`      | Text direction                                        |
| `className`     | `string`                                    | `""`         | Custom className for the container                    |
| `itemClassName` | `string`                                    | `""`         | Custom className for individual items                 |
| `showGradients` | `boolean`                                   | `true`       | Whether to show fade gradients on edges               |
| `speed`         | `number`                                    | `1`          | Speed multiplier for animation                        |
| `onItemClick`   | `(item: SliderItem, index: number) => void` | `undefined`  | Callback when an item is clicked                      |
| `baseWidth`     | `number`                                    | `5000`       | Base width for duration calculation                   |
| `lazyLoad`      | `boolean`                                   | `true`       | Whether to use intersection observer for lazy loading |
| `rootMargin`    | `string`                                    | `"50px"`     | Root margin for intersection observer                 |

### SliderItem

| Property     | Type      | Required | Description                                |
| ------------ | --------- | -------- | ------------------------------------------ |
| `id`         | `string`  | No       | Unique identifier for the item             |
| `logo`       | `string`  | No\*     | Image URL/path for the logo                |
| `text`       | `string`  | No\*     | Text content to display                    |
| `alt`        | `string`  | No       | Alt text for the logo image                |
| `invertDark` | `boolean` | No       | Whether to invert logo colors in dark mode |
| `className`  | `string`  | No       | Custom className for the item              |

\* At least one of `logo` or `text` must be provided.

## Styling

The component includes default styles that you can import:

```tsx
import "react-seamless-slider/InfiniteSlider.css";
```

You can customize the appearance by overriding CSS variables or using custom classes:

```css
.infinite-slider-container {
  /* Your custom styles */
}

.infinite-slider-item {
  /* Your custom styles */
}
```

## SSR Compatibility

This package is fully compatible with Server-Side Rendering (SSR) frameworks like Next.js. It uses React's `useId()` hook to generate SSR-safe unique IDs, ensuring no hydration mismatches.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues, please file them on the [GitHub issues page](https://github.com/yunusemreuveyik/react-seamless-slider/issues).

## Repository

[GitHub Repository](https://github.com/yunusemreuveyik/react-seamless-slider)
