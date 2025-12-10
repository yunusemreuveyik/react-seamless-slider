import "./InfiniteSlider.css";
/**
 * Slider item interface
 * At least one of logo or text must be provided
 */
export interface SliderItem {
    /** Unique identifier for the item */
    id?: string;
    /** Image URL/path for the logo */
    logo?: string;
    /** Text content to display */
    text?: string;
    /** Alt text for the logo image */
    alt?: string;
    /** Whether to invert logo colors in dark mode */
    invertDark?: boolean;
    /** Custom className for the item */
    className?: string;
}
/**
 * Props for the InfiniteSlider component
 */
export interface InfiniteSliderProps {
    /** Array of items to display in the slider */
    items: SliderItem[];
    /** Animation duration in seconds (default: 30) */
    duration?: number;
    /** Gap between items in pixels or CSS value (default: '3rem' or 48) */
    gap?: number | string;
    /** Whether to pause animation on hover (default: true) */
    pauseOnHover?: boolean;
    /** Text direction (default: 'ltr') */
    direction?: "ltr" | "rtl";
    /** Custom className for the container */
    className?: string;
    /** Custom className for individual items */
    itemClassName?: string;
    /** Whether to show fade gradients on edges (default: true) */
    showGradients?: boolean;
    /** Speed multiplier for animation (default: 1) */
    speed?: number;
    /** Callback when an item is clicked */
    onItemClick?: (item: SliderItem, index: number) => void;
    /** Base width for duration calculation (default: 5000) */
    baseWidth?: number;
    /** Whether to use intersection observer for lazy loading (default: true) */
    lazyLoad?: boolean;
    /** Root margin for intersection observer (default: '50px') */
    rootMargin?: string;
}
/**
 * InfiniteSlider - A seamless infinite scrolling slider component
 * Fixed version with SSR support using React's useId() hook
 *
 * @example
 * ```tsx
 * <InfiniteSlider
 *   items={[
 *     { logo: "/logo1.svg", text: "Item 1" },
 *     { text: "Item 2" },
 *     { logo: "/logo3.svg" }
 *   ]}
 *   duration={30}
 *   gap="3rem"
 * />
 * ```
 */
export declare function InfiniteSlider({ items, duration, gap, pauseOnHover, direction, className, itemClassName, showGradients, speed, onItemClick, baseWidth, lazyLoad, rootMargin, }: InfiniteSliderProps): import("react/jsx-runtime").JSX.Element;
export default InfiniteSlider;
//# sourceMappingURL=InfiniteSlider.d.ts.map