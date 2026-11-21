"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
	useGSAP(
		() => {
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			if (reduced) return;

			// General section reveals
			gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
				gsap.fromTo(
					element,
					{ y: 34, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						ease: "power3.out",
						scrollTrigger: {
							trigger: element,
							start: "top 88%",
							once: true,
						},
					},
				);
			});

			// Parallax images
			gsap.utils.toArray<HTMLElement>(".image-parallax").forEach((element) => {
				gsap.fromTo(
					element,
					{ yPercent: -5 },
					{
						yPercent: 5,
						ease: "none",
						scrollTrigger: {
							trigger: element,
							start: "top bottom",
							end: "bottom top",
							scrub: 1.1,
						},
					},
				);
			});

			// Hero image scaling
			gsap.to(".hero-v2-image, .hero-image", {
				scale: 1.07,
				ease: "none",
				scrollTrigger: {
					trigger: ".hero-section",
					start: "top top",
					end: "bottom top",
					scrub: 1,
				},
			});

			ScrollTrigger.refresh();
		},
		{ scope },
	);
}
