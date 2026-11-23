"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CalendarPlus,
    Check,
    CheckCheck,
    Clock,
    Loader2,
    MapPin,
    Sparkles,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkle } from "@/components/primitives";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { BOOKING_TIMES, CLINIC, TREATMENTS, to12h } from "@/lib/data";
import { cn } from "@/lib/utils";

type BookingContextValue = { openBooking: (treatmentId?: string) => void };
const BookingContext = createContext<BookingContextValue>({
    openBooking: () => { },
});
export const useBooking = () => useContext(BookingContext);

const STEP_LABELS = ["Treatment", "Date & time", "Your details", "Confirmed"];

type DayOption = { date: Date; key: string };

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [preset, setPreset] = useState<string | undefined>(undefined);
    const openBooking = useCallback((id?: string) => {
        setPreset(id);
        setOpen(true);
    }, []);
    return (
        <BookingContext.Provider value={{ openBooking }}>
            {children}
            <BookingDialog open={open} onOpenChange={setOpen} preset={preset} />
        </BookingContext.Provider>
    );
}

function BookingDialog({
    open,
    onOpenChange,
    preset,
}: {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    preset?: string;
}) {
    const { stop, start } = useSmoothScroll();
    const reduced = useReducedMotion();
    const [step, setStep] = useState(0);
    const [treatment, setTreatment] = useState("consultation");
    const [dayKey, setDayKey] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [reference, setReference] = useState("");

    useEffect(() => {
        if (open) stop();
        else start();
    }, [open, stop, start]);

    useEffect(() => {
        if (open) {
            setStep(0);
            setTreatment(preset ?? "consultation");
            setDayKey(null);
            setTime(null);
            setForm({ name: "", email: "", phone: "", notes: "" });
            setErrors({});
            setSubmitting(false);
            setReference("");
        }
    }, [open, preset]);

    const days = useMemo<DayOption[]>(() => {
        const out: DayOption[] = [];
        const cursor = new Date();
        cursor.setDate(cursor.getDate() + 1);
        while (out.length < 12) {
            if (cursor.getDay() !== 0) {
                const key = `${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}`;
                out.push({ date: new Date(cursor), key });
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        return out;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const selectedDay = days.find((d) => d.key === dayKey) ?? null;
    const options = [
        { id: "consultation", name: "Signature Consultation", meta: "45 min · Complimentary" },
        ...TREATMENTS.map((t) => ({
            id: t.id,
            name: t.name,
            meta: `${t.duration} · from $${t.price}`,
        })),
    ];
    const treatmentName =
        options.find((o) => o.id === treatment)?.name ?? "Signature Consultation";
    const isBooked = (di: number, ti: number) => (di * 7 + ti * 3) % 5 === 0;
    const firstName = form.name.trim().split(" ")[0] || "lovely";

    const submit = () => {
        const errs: typeof errors = {};
        if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
        if (!/^\S+@\S+\.\S+$/.test(form.email))
            errs.email = "That email doesn't look quite right.";
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        setSubmitting(true);
        window.setTimeout(() => {
            const ref = `ELY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            setReference(ref);
            try {
                const prev = JSON.parse(localStorage.getItem("elysea-bookings") ?? "[]");
                localStorage.setItem(
                    "elysea-bookings",
                    JSON.stringify([
                        ...prev,
                        { ref, treatment, dayKey, time, ...form, createdAt: Date.now() },
                    ])
                );
            } catch { }
            setSubmitting(false);
            setStep(3);
        }, 900);
    };

    const downloadIcs = () => {
        if (!selectedDay || !time) return;
        const [h, m] = time.split(":").map(Number);
        const dt = new Date(selectedDay.date);
        dt.setHours(h, m, 0, 0);
        const end = new Date(dt.getTime() + 60 * 60 * 1000);
        const fmt = (d: Date) =>
            d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        const esc = (s: string) => s.replace(/,/g, "\\,");
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Elysea Aesthetics//Booking//EN",
            "BEGIN:VEVENT",
            `UID:${reference}@elysea.clinic`,
            `DTSTAMP:${fmt(new Date())}`,
            `DTSTART:${fmt(dt)}`,
            `DTEND:${fmt(end)}`,
            `SUMMARY:${esc(`Elysea Aesthetics — ${treatmentName}`)}`,
            `LOCATION:${esc(`${CLINIC.address1}, ${CLINIC.address2}`)}`,
            `DESCRIPTION:${esc(`Reference ${reference}. Arrive 10 minutes early; clean skin preferred.`)}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");
        const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "elysea-appointment.ics";
        a.click();
        URL.revokeObjectURL(url);
    };

    const slide = reduced ? 0 : 24;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl gap-0 overflow-hidden p-0 sm:rounded-[1.75rem]">
                <div
                    className="max-h-[86vh] overflow-y-auto p-6 sm:p-8"
                    data-lenis-prevent
                >
                    <div className="pr-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-copper">
                            Book your visit
                        </span>
                        <DialogTitle className="mt-2 text-3xl">
                            Reserve your <em className="italic text-rose">glow.</em>
                        </DialogTitle>
                        <DialogDescription className="mt-1.5">
                            Complimentary consultation · Every treatment starts here.
                        </DialogDescription>
                    </div>

                    <div className="mt-5 flex gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1 flex-1 rounded-full transition-colors duration-500",
                                    i <= step ? "bg-gradient-to-r from-copper to-rose" : "bg-sand"
                                )}
                            />
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-[0.18em]">
                        <span className="text-copper">
                            Step {Math.min(step + 1, 4)} · {STEP_LABELS[step]}
                        </span>
                        <span className="text-plum/40">Elysea Aesthetics</span>
                    </div>

                    <div className="mt-6 min-h-[300px]">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: slide }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -slide }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {step === 0 && (
                                    <div
                                        className="grid max-h-[320px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2"
                                        data-lenis-prevent
                                    >
                                        {options.map((o, i) => {
                                            const active = treatment === o.id;
                                            return (
                                                <button
                                                    key={o.id}
                                                    type="button"
                                                    onClick={() => setTreatment(o.id)}
                                                    className={cn(
                                                        "flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all",
                                                        i === 0 && "sm:col-span-2",
                                                        active
                                                            ? "border-copper bg-blush/50 shadow-sm"
                                                            : "border-sand bg-porcelain/50 hover:border-copper/50"
                                                    )}
                                                >
                                                    <span>
                                                        <span className="block text-sm font-semibold text-plum">
                                                            {o.name}
                                                        </span>
                                                        <span className="mt-0.5 block text-xs text-plum/55">
                                                            {o.meta}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all",
                                                            active
                                                                ? "border-copper bg-copper text-cream"
                                                                : "border-sand text-transparent"
                                                        )}
                                                    >
                                                        <Check className="h-3.5 w-3.5" />
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {step === 1 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                                            Choose a day
                                        </p>
                                        <div
                                            className="mt-3 flex gap-2 overflow-x-auto pb-2"
                                            data-lenis-prevent
                                        >
                                            {days.map((d) => {
                                                const active = dayKey === d.key;
                                                return (
                                                    <button
                                                        key={d.key}
                                                        type="button"
                                                        onClick={() => {
                                                            setDayKey(d.key);
                                                            setTime(null);
                                                        }}
                                                        className={cn(
                                                            "min-w-[72px] rounded-xl border p-2.5 text-center transition-all",
                                                            active
                                                                ? "border-plum bg-plum text-cream shadow-md"
                                                                : "border-sand bg-porcelain/50 text-plum hover:border-copper/50"
                                                        )}
                                                    >
                                                        <span className={cn("block text-[10px] font-bold uppercase tracking-wider", active ? "text-gild" : "text-copper")}>
                                                            {d.date.toLocaleDateString("en-US", { weekday: "short" })}
                                                        </span>
                                                        <span className="block font-display text-xl font-medium">
                                                            {d.date.getDate()}
                                                        </span>
                                                        <span className={cn("block text-[10px]", active ? "text-cream/60" : "text-plum/50")}>
                                                            {d.date.toLocaleDateString("en-US", { month: "short" })}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-plum/50">
                                            Available times
                                        </p>
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            {BOOKING_TIMES.map((t, ti) => {
                                                const di = days.findIndex((d) => d.key === dayKey);
                                                const booked = di >= 0 && isBooked(di, ti);
                                                const active = time === t;
                                                return (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        disabled={!dayKey || booked}
                                                        onClick={() => setTime(t)}
                                                        className={cn(
                                                            "rounded-lg border py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed",
                                                            booked
                                                                ? "border-sand bg-porcelain/40 text-plum/30 line-through"
                                                                : active
                                                                    ? "border-copper bg-copper text-cream shadow-md"
                                                                    : "border-sand bg-porcelain/50 text-plum hover:border-copper/60 disabled:opacity-40"
                                                        )}
                                                    >
                                                        {to12h(t)}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="mt-3 text-[11px] text-plum/45">
                                            Pacific Time · Clinic closed Sundays · Struck-through slots are taken.
                                        </p>
                                    </div>
                                )}

                                {step === 2 && (
                                    <form
                                        id="booking-details"
                                        noValidate
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            submit();
                                        }}
                                        className="grid gap-4"
                                    >
                                        <div>
                                            <label htmlFor="bk-name" className="text-xs font-bold uppercase tracking-[0.14em] text-plum/60">
                                                Full name *
                                            </label>
                                            <Input
                                                id="bk-name"
                                                className={cn("mt-1.5", errors.name && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20")}
                                                placeholder="Ava Laurent"
                                                value={form.name}
                                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                                autoComplete="name"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs font-semibold text-destructive">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="bk-email" className="text-xs font-bold uppercase tracking-[0.14em] text-plum/60">
                                                Email *
                                            </label>
                                            <Input
                                                id="bk-email"
                                                type="email"
                                                className={cn("mt-1.5", errors.email && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20")}
                                                placeholder="ava@example.com"
                                                value={form.email}
                                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                                autoComplete="email"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs font-semibold text-destructive">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="bk-phone" className="text-xs font-bold uppercase tracking-[0.14em] text-plum/60">
                                                Phone <span className="normal-case text-plum/40">(optional)</span>
                                            </label>
                                            <Input
                                                id="bk-phone"
                                                type="tel"
                                                className="mt-1.5"
                                                placeholder="+1 (___) ___-____"
                                                value={form.phone}
                                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                                autoComplete="tel"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bk-notes" className="text-xs font-bold uppercase tracking-[0.14em] text-plum/60">
                                                Anything we should know?
                                            </label>
                                            <Textarea
                                                id="bk-notes"
                                                className="mt-1.5"
                                                placeholder="Allergies, goals, questions…"
                                                value={form.notes}
                                                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                                            />
                                        </div>
                                    </form>
                                )}

                                {step === 3 && (
                                    <div className="text-center">
                                        <div className="relative mx-auto h-16 w-16">
                                            {[0, 1, 2, 3, 4, 5].map((i) => {
                                                const angle = (i / 6) * Math.PI * 2;
                                                return (
                                                    <motion.span
                                                        key={i}
                                                        className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5"
                                                        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                                                        animate={{
                                                            scale: [0, 1, 0],
                                                            opacity: [1, 1, 0],
                                                            x: Math.cos(angle) * 48,
                                                            y: Math.sin(angle) * 48,
                                                        }}
                                                        transition={{ duration: 0.9, delay: 0.15 + i * 0.05 }}
                                                    >
                                                        <Sparkle className="h-3 w-3 text-gild" />
                                                    </motion.span>
                                                );
                                            })}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.05 }}
                                                className="grid h-16 w-16 place-items-center rounded-full bg-sage/15 text-sage"
                                            >
                                                <CheckCheck className="h-8 w-8" />
                                            </motion.div>
                                        </div>
                                        <h3 className="mt-5 font-display text-3xl font-medium text-plum">
                                            You're booked, <em className="italic text-rose">{firstName}.</em>
                                        </h3>
                                        <p className="mt-2 text-sm text-plum/60">
                                            Confirmation sent to <span className="font-semibold text-plum">{form.email}</span>
                                        </p>
                                        <span className="mt-3 inline-block rounded-full border border-sand bg-porcelain px-3 py-1 font-mono text-xs font-semibold tracking-wider text-copper">
                                            Ref {reference}
                                        </span>
                                        <div className="mt-5 divide-y divide-sand rounded-2xl border border-sand bg-porcelain/70 text-left">
                                            {[
                                                { icon: Sparkles, label: "Treatment", value: treatmentName },
                                                {
                                                    icon: CalendarDays,
                                                    label: "Date",
                                                    value: selectedDay
                                                        ? selectedDay.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                                                        : "—",
                                                },
                                                { icon: Clock, label: "Time", value: time ? `${to12h(time)} · Pacific` : "—" },
                                                { icon: MapPin, label: "Where", value: CLINIC.address1 },
                                            ].map((row) => (
                                                <div key={row.label} className="flex items-center gap-3 px-4 py-3">
                                                    <row.icon className="h-4 w-4 shrink-0 text-copper" />
                                                    <span className="w-20 shrink-0 text-xs font-bold uppercase tracking-wider text-plum/45">
                                                        {row.label}
                                                    </span>
                                                    <span className="text-sm font-semibold text-plum">{row.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                                            <Button variant="outline" onClick={downloadIcs}>
                                                <CalendarPlus className="h-4 w-4" />
                                                Add to calendar
                                            </Button>
                                            <Button variant="accent" onClick={() => onOpenChange(false)}>
                                                Done
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {step < 3 && (
                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-sand pt-5">
                            {step > 0 ? (
                                <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            ) : (
                                <span className="flex items-center gap-1.5 text-xs text-plum/50">
                                    <Sparkles className="h-3.5 w-3.5 text-gild" />
                                    No deposit required
                                </span>
                            )}
                            {step === 0 && (
                                <Button variant="accent" onClick={() => setStep(1)}>
                                    Choose a time
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            )}
                            {step === 1 && (
                                <Button variant="accent" disabled={!dayKey || !time} onClick={() => setStep(2)}>
                                    Your details
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            )}
                            {step === 2 && (
                                <Button variant="accent" type="submit" form="booking-details" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Confirming…
                                        </>
                                    ) : (
                                        <>
                                            Confirm booking
                                            <Check className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}