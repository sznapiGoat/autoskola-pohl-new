"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/lib/cn";

const NAV_LINKS = [
  { href: "/sluzby",  label: "Služby" },
  { href: "/cenik",   label: "Ceník" },
  { href: "/skoleni", label: "Školení" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigační menu"
            className="fixed inset-y-0 right-0 z-50 w-72 bg-surface flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-[62px] border-b border-border shrink-0">
              <span className="font-bold text-[1.05rem] tracking-tight text-ink">
                Autoškola POHL
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="text-ink-3 hover:text-ink transition-colors duration-200 -mr-1 p-1"
                aria-label="Zavřít menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Mobilní navigace">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "text-[1.0625rem] font-medium text-ink-2 hover:text-accent",
                    "py-3 border-b border-border transition-colors duration-200"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-8">
              <a
                href="tel:+420602441636"
                className="flex items-center justify-center bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-6 py-4 hover:bg-accent transition-colors duration-200"
              >
                +420 602 441 636
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
