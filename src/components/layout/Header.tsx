
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { navItems } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`site-header floating-header ${scrolled ? "is-scrolled" : ""
                    }`}
            >
                {/* BRAND */}
                <Link
                    href="#top"
                    className="wordmark"
                    aria-label="Elysea Aesthetics home"
                >
                    <span>ELYSEA</span>
                    <small>AESTHETICS</small>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <nav className="desktop-nav" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* ACTIONS */}
                <div className="header-actions">

                    <Link href="#contact" className="header-book">
                        <span>Book a consultation</span>

                        <span className="header-book-icon">
                            <ArrowUpRight size={15} strokeWidth={1.5} />
                        </span>
                    </Link>

                    <button
                        className="icon-button menu-trigger"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={menuOpen}
                        aria-haspopup="dialog"
                    >
                        <Menu size={21} strokeWidth={1.4} />
                    </button>

                </div>
            </header>

            <MobileMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
}
