"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useId } from "react";
import "./InfiniteSlider.css";
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
export function InfiniteSlider({ items, duration = 30, gap = "3rem", pauseOnHover = true, direction = "ltr", className = "", itemClassName = "", showGradients = true, speed = 1, onItemClick, baseWidth = 5000, lazyLoad = true, rootMargin = "50px", }) {
    // Use React's useId() for SSR-safe unique IDs instead of Math.random()
    const sliderId = useId();
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const containerRef = useRef(null);
    // Validate items - ensure at least one of logo or text exists
    useEffect(() => {
        const invalidItems = items.filter((item) => !item.logo && !item.text);
        if (invalidItems.length > 0) {
            console.error(`InfiniteSlider: ${invalidItems.length} item(s) are missing both logo and text. At least one is required.`, invalidItems);
            throw new Error("InfiniteSlider: All items must have either a logo or text property.");
        }
    }, [items]);
    // Lazy load when component is visible
    useEffect(() => {
        if (!lazyLoad) {
            setIsVisible(true);
            setShouldLoad(true);
            return;
        }
        // Only run on client side
        if (typeof window === "undefined")
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setTimeout(() => setShouldLoad(true), 100);
                    observer.disconnect();
                }
            });
        }, { rootMargin });
        const element = document.getElementById(sliderId);
        if (element) {
            observer.observe(element);
        }
        return () => observer.disconnect();
    }, [lazyLoad, rootMargin, sliderId]);
    // Preload all images before starting animation
    useEffect(() => {
        if (!shouldLoad)
            return;
        // Only run on client side
        if (typeof window === "undefined")
            return;
        const imageUrls = Array.from(new Set(items.map((item) => item.logo).filter(Boolean)));
        if (imageUrls.length === 0) {
            setImagesLoaded(true);
            return;
        }
        let loadedCount = 0;
        const totalImages = imageUrls.length;
        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                setImagesLoaded(true);
            }
        };
        // Preload all images
        imageUrls.forEach((url) => {
            const img = document.createElement("img");
            img.onload = checkAllLoaded;
            img.onerror = checkAllLoaded; // Count errors too so we don't wait forever
            img.src = url;
        });
    }, [shouldLoad, items]);
    // Setup CSS animation with calculated width
    useEffect(() => {
        if (!containerRef.current || !shouldLoad || !imagesLoaded)
            return;
        // Only run on client side
        if (typeof window === "undefined")
            return;
        const container = containerRef.current;
        const setupAnimation = () => {
            const itemsElements = Array.from(container.children);
            if (itemsElements.length === 0) {
                setTimeout(setupAnimation, 50);
                return;
            }
            // Wait a bit more to ensure DOM is fully rendered with images
            setTimeout(() => {
                calculateAndSetWidth();
            }, 100);
        };
        const calculateAndSetWidth = () => {
            const itemsElements = Array.from(container.children);
            if (itemsElements.length === 0)
                return;
            const itemsPerSet = items.length;
            let halfTotalWidth = 0;
            // Best method: Measure from first item to where second set starts
            if (itemsElements.length >= itemsPerSet * 2) {
                const firstItem = itemsElements[0];
                const firstItemOfSecondSet = itemsElements[itemsPerSet];
                const firstItemLeft = firstItem.offsetLeft;
                const secondSetStart = firstItemOfSecondSet.offsetLeft;
                halfTotalWidth = secondSetStart - firstItemLeft;
            }
            else if (itemsElements.length >= itemsPerSet) {
                // Fallback: measure from first to last item of first set, then add gap
                const firstItem = itemsElements[0];
                const lastItemOfFirstSet = itemsElements[itemsPerSet - 1];
                const firstItemLeft = firstItem.offsetLeft;
                const lastItemRight = lastItemOfFirstSet.offsetLeft + lastItemOfFirstSet.offsetWidth;
                // Get gap from computed style or use provided gap
                const computedStyle = window.getComputedStyle(container);
                const gapValue = computedStyle.gap;
                const gapPx = gapValue
                    ? parseFloat(gapValue)
                    : typeof gap === "number"
                        ? gap
                        : 48;
                halfTotalWidth = lastItemRight - firstItemLeft + gapPx;
            }
            // Final fallback: manual calculation
            if (halfTotalWidth === 0 || !halfTotalWidth || halfTotalWidth < 100) {
                const computedStyle = window.getComputedStyle(container);
                const gapValue = computedStyle.gap;
                const gapPx = gapValue
                    ? parseFloat(gapValue)
                    : typeof gap === "number"
                        ? gap
                        : 48;
                halfTotalWidth = 0;
                for (let i = 0; i < itemsPerSet && i < itemsElements.length; i++) {
                    halfTotalWidth += itemsElements[i].offsetWidth;
                }
                halfTotalWidth += gapPx * (itemsPerSet - 1);
            }
            // Only proceed if we have a valid width
            if (halfTotalWidth > 0) {
                // Round to avoid sub-pixel issues
                halfTotalWidth = Math.round(halfTotalWidth);
                // Set CSS custom property for the animation
                container.style.setProperty("--total-width", `${halfTotalWidth}px`);
                // Calculate animation duration
                const scrollDuration = (halfTotalWidth / baseWidth) * duration * speed;
                container.style.setProperty("--scroll-duration", `${scrollDuration}s`);
                // Enable animation
                requestAnimationFrame(() => {
                    container.classList.add("infinite-slider-ready");
                });
            }
        };
        // Start setup after images are loaded
        setupAnimation();
        const handleResize = () => {
            // Remove ready class to recalculate
            container.classList.remove("infinite-slider-ready");
            setTimeout(setupAnimation, 100);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [shouldLoad, imagesLoaded, items, duration, gap, baseWidth, speed]);
    // Convert gap to CSS value
    const gapValue = typeof gap === "number" ? `${gap}px` : gap;
    return (_jsx("div", { id: sliderId, className: `infinite-slider-container ${className}`, style: { direction }, children: _jsxs("div", { className: "infinite-slider-wrapper", children: [showGradients && (_jsxs(_Fragment, { children: [_jsx("div", { className: "infinite-slider-gradient infinite-slider-gradient-left", style: { direction } }), _jsx("div", { className: "infinite-slider-gradient infinite-slider-gradient-right", style: { direction } })] })), _jsx("div", { className: "infinite-slider-track-container", children: _jsx("div", { ref: containerRef, className: `infinite-slider-track ${pauseOnHover ? "infinite-slider-pause-on-hover" : ""}`, style: { gap: gapValue }, children: Array.from({ length: 2 }).map((_, copyIndex) => items.map((item, i) => {
                            const itemKey = item.id || `${i}-${copyIndex}`;
                            const hasLogo = !!item.logo;
                            const hasText = !!item.text;
                            return (_jsxs("div", { className: `infinite-slider-item ${itemClassName} ${item.className || ""}`, onClick: () => onItemClick?.(item, i), style: { cursor: onItemClick ? "pointer" : "default" }, children: [shouldLoad && hasLogo && (_jsx("img", { src: item.logo, alt: item.alt || item.text || "", className: `infinite-slider-logo ${item.invertDark ? "infinite-slider-invert-dark" : ""}`, loading: "eager" })), !shouldLoad && hasLogo && (_jsx("div", { className: `infinite-slider-logo-placeholder ${item.invertDark ? "infinite-slider-invert-dark" : ""}`, "aria-hidden": "true" })), hasText && (_jsx("span", { className: "infinite-slider-text", children: item.text }))] }, itemKey));
                        })) }) })] }) }));
}
export default InfiniteSlider;
