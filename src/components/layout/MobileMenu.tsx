
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { navItems } from "@/data/navigation";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="menu-overlay"
                    initial={{ clipPath: "inset(0 0 100% 0 round 0 0 44% 44%)" }}
                    animate={{ clipPath: "inset(0 0 0% 0 round 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0 round 0 0 44% 44%)" }}
                    transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
                    aria-modal="true"
                    role="dialog"
                    aria-label="Main navigation"
                >
                    <div className="menu-overlay-top">
                        <Link
                            href="#top"
                            className="wordmark wordmark-dark"
                            onClick={onClose}
                        >
                            <span>ELYSEA</span>
                            <small>AESTHETICS</small>
                        </Link>

                        <button
                            className="icon-button icon-button-dark"
                            onClick={onClose}
                            aria-label="Close menu"
                        >
                            <X size={21} strokeWidth={1.4} />
                        </button>
                    </div>

                    <nav className="menu-overlay-links" aria-label="Mobile navigation">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.16 + index * 0.08,
                                    duration: 0.55,
                                }}
                            >
                                <Link href={item.href} onClick={onClose}>
                                    <span className="menu-index">
                                        0{index + 1}
                                    </span>

                                    <span>{item.label}</span>

                                    <ArrowUpRight size={20} strokeWidth={1.25} />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="menu-overlay-bottom">
                        <span>SKIN · SCIENCE · SELF</span>
                        <span>BY APPOINTMENT</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
