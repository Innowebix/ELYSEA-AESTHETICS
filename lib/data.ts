import {
	Droplets,
	Flower2,
	Gem,
	Leaf,
	ScanFace,
	Sparkles,
	Sun,
	Syringe,
	Waves,
	Zap,
	type LucideIcon,
} from "lucide-react";

export const CLINIC = {
	name: "Elysea Aesthetics",
	address1: "FF-52, SHARNAM SKY, beside Jhulelal Hospital, Zadeshwar Chowkdi",
	address2: "Ganesh Shrishti, Zadeshwar, Bharuch, Gujarat 392011",
	phone: "+91 81411 15873",
	phoneHref: "tel:+918141115873",
	email: "hello@elysea.clinic",
	instagram: "https://www.instagram.com/",
	facebook: "https://www.facebook.com/",
	youtube: "https://www.youtube.com/",
	mapsUrl: "https://maps.app.goo.gl/b64q4EErcJeBsH5z5",
};

export const NAV_LINKS = [
	{ label: "Story", href: "#story" },
	{ label: "Treatments", href: "#treatments" },
	{ label: "The Method", href: "#philosophy" },
	{ label: "Results", href: "#results" },
	{ label: "Journal", href: "#journal" },
	{ label: "FAQ", href: "#faq" },
	{ label: "Visit", href: "#visit" },
];

export type Category = "Facials" | "Injectables" | "Laser & Light";
export const FILTERS = ["All", "Facials", "Injectables", "Laser & Light"] as const;
export type Filter = (typeof FILTERS)[number];

export type Treatment = {
	id: string;
	name: string;
	category: Category;
	desc: string;
	duration: string;
	price: number;
	icon: LucideIcon;
	flag?: string;
};

export const TREATMENTS: Treatment[] = [
	{
		id: "glass-skin",
		name: "Glass-Skin Signature Ritual",
		category: "Facials",
		desc: "Our flagship seven-step protocol: enzyme cleanse, gentle peel, oxygen infusion, peptide mask and cryo-glass finish.",
		duration: "90 min",
		price: 260,
		icon: Sparkles,
		flag: "Most loved",
	},
	{
		id: "hydraglow",
		name: "HydraGlow Deep Facial",
		category: "Facials",
		desc: "Vortex extraction and hyaluronic saturation for skin that drinks. Zero downtime, immediate red-carpet luminosity.",
		duration: "60 min",
		price: 180,
		icon: Droplets,
	},
	{
		id: "peptide-peel",
		name: "Rose Quartz Peptide Peel",
		category: "Facials",
		desc: "A PHA-acid resurfacing veil buffered with rose stem cells and peptides. Refines texture without the sting.",
		duration: "45 min",
		price: 140,
		icon: Flower2,
	},
	{
		id: "anti-wrinkle",
		name: "Anti-Wrinkle Refinement",
		category: "Injectables",
		desc: "Micro-dosed neuromodulator mapped to your expression patterns. Softens lines, keeps every smile yours.",
		duration: "30 min",
		price: 290,
		icon: Syringe,
	},
	{
		id: "contour",
		name: "Dermal Volume & Contour",
		category: "Injectables",
		desc: "Hyaluronic sculpting of cheeks, chin and jawline in staged, conservative layers. Structure, not volume.",
		duration: "45 min",
		price: 420,
		icon: Gem,
	},
	{
		id: "bio-glow",
		name: "Bio-Remodelling Glow",
		category: "Injectables",
		desc: "Injectable hyaluronic bio-remodelling that hydrates from within and wakes up collagen across the whole face.",
		duration: "30 min",
		price: 350,
		icon: Waves,
		flag: "New",
	},
	{
		id: "fractional",
		name: "Fractional Laser Resurfacing",
		category: "Laser & Light",
		desc: "Columned laser renewal for scars, pores and sun history. Physician-calibrated depth, comfort-first protocol.",
		duration: "60 min",
		price: 380,
		icon: Zap,
	},
	{
		id: "ipl",
		name: "IPL Photo-Rejuvenation",
		category: "Laser & Light",
		desc: "Broad-spectrum light that quietly erases redness, rosacea flush and pigment scatter over a three-session arc.",
		duration: "45 min",
		price: 240,
		icon: Sun,
	},
	{
		id: "led",
		name: "LED Collagen Therapy",
		category: "Laser & Light",
		desc: "Clinical red and near-infrared light to calm, repair and rebuild. The perfect finisher after any protocol.",
		duration: "30 min",
		price: 90,
		icon: Leaf,
	},
];

export const METHOD_STEPS = [
	{
		n: "01",
		title: "Skin Mapping",
		desc: "A 45-minute consultation with cross-polarised imaging across hydration, pigment, redness and collagen. We show you your skin in data, not guesses.",
		meta: ["45 min", "VISIA imaging"],
		icon: ScanFace,
	},
	{
		n: "02",
		title: "The Prescription",
		desc: "Your physician drafts a staged protocol — what we'll do in clinic, what you'll do at home, and what we'll deliberately leave alone. No upsells, ever.",
		meta: ["Physician-led", "Fixed quote"],
		icon: Gem,
	},
	{
		n: "03",
		title: "The Treatment",
		desc: "Medical-grade technology in a spa-calm room: heated beds, weighted blankets, a playlist you choose. Precision where it matters, softness everywhere else.",
		meta: ["Comfort-first", "30–90 min"],
		icon: Sparkles,
	},
	{
		n: "04",
		title: "The Glow Plan",
		desc: "You leave with a two-week aftercare ritual and a follow-up already booked. We measure again at week eight — and let the numbers talk.",
		meta: ["Follow-up included", "Week-8 review"],
		icon: Leaf,
	},
];

export const TEAM = [
	{
		name: "Dr. Amara Chen",
		role: "Medical Director · MD, FAAD",
		initials: "AC",
		gradient: "from-rose to-copper",
	},
	{
		name: "Dr. Leila Moreau",
		role: "Aesthetic Physician · MD",
		initials: "LM",
		gradient: "from-copper to-gild",
	},
	{
		name: "Sofia Reyes",
		role: "Laser Specialist · RN",
		initials: "SR",
		gradient: "from-mineral to-sage",
	},
	{
		name: "Maya Lindqvist",
		role: "Lead Aesthetician",
		initials: "ML",
		gradient: "from-plum to-rose",
	},
];

export const METRICS = [
	{ label: "Hydration", value: 48, gradient: "from-mineral to-sage" },
	{ label: "Texture refinement", value: 62, gradient: "from-copper to-gild" },
	{ label: "Tone evenness", value: 71, gradient: "from-rose to-copper" },
];

export const TESTIMONIALS = [
	{
		quote: "I came in for one facial and stayed for the philosophy. My skin has never been photographed this well — and I'm wearing less makeup than ever.",
		name: "Naomi R.",
		treatment: "Glass-Skin Ritual",
		since: "Client since 2023",
		initials: "NR",
		gradient: "from-rose to-copper",
	},
	{
		quote: "Dr. Chen talked me out of two treatments I asked for and into the one I actually needed. That's when I knew this place was different.",
		name: "Priya S.",
		treatment: "Skin Mapping + Peel",
		since: "Client since 2024",
		initials: "PS",
		gradient: "from-copper to-gild",
	},
	{
		quote: "The before-and-after photos at week eight made me emotional. Rosacea I'd lived with for a decade, finally quiet.",
		name: "Elena M.",
		treatment: "IPL Photo-Rejuvenation",
		since: "Client since 2022",
		initials: "EM",
		gradient: "from-mineral to-sage",
	},
	{
		quote: "It feels like a members' club that happens to have lasers. I book my Glow Plan the way I book a holiday.",
		name: "Jordan T.",
		treatment: "HydraGlow + LED",
		since: "Client since 2025",
		initials: "JT",
		gradient: "from-plum to-rose",
	},
];

export const FAQS = [
	{
		q: "Does my first visit cost anything?",
		a: "No. Every journey starts with a complimentary 45-minute consultation, including cross-polarised skin imaging and a written protocol with fixed pricing. There is never an obligation to book a treatment on the day.",
	},
	{
		q: "Will injectables look natural?",
		a: "That is the entire point of our approach. We dose conservatively, stage treatments two to four weeks apart, and review at every step. The goal is 'you, well-rested' — never a frozen or altered expression. If less is better, we will tell you.",
	},
	{
		q: "How much downtime should I plan?",
		a: "It depends on the protocol: LED and HydraGlow have none, our peptide peel may flake lightly for two to three days, and fractional resurfacing carries three to five days of social downtime. Your written plan states exactly what to expect before you commit.",
	},
	{
		q: "Who actually performs the treatments?",
		a: "All injectables and laser procedures are performed by board-certified physicians or registered nurses under medical direction. Facials and aftercare are led by our senior aestheticians. Every practitioner has a minimum of ten years of clinical experience.",
	},
	{
		q: "How do I prepare for my appointment?",
		a: "Pause retinoids and exfoliating acids five days before, wear SPF daily, arrive with clean skin if possible, and hydrate well the day prior. Avoid alcohol for 24 hours before injectables. We send a full prep note with your confirmation.",
	},
	{
		q: "What is your cancellation policy?",
		a: "Reschedule or cancel free of charge up to 24 hours before your visit — no deposit is ever taken. Cancellations inside 24 hours carry a $50 fee, credited toward your next booking if you rebook within a month.",
	},
];

export type Article = {
	id: string;
	issue: string;
	title: string;
	category: string;
	read: string;
	date: string;
	author: string;
	role: string;
	initials: string;
	gradient: string;
	cover: "blush" | "mineral" | "plum";
	motif: "rings" | "drop" | "sun";
	excerpt: string;
	body: string[];
	quote: string;
	tips: string[];
};

export const ARTICLES: Article[] = [
	{
		id: "barrier",
		issue: "Nº 04",
		title: "The barrier is the brand.",
		category: "Skin Science",
		read: "6 min read",
		date: "Nov 12, 2026",
		author: "Dr. Amara Chen",
		role: "Medical Director",
		initials: "AC",
		gradient: "from-rose to-copper",
		cover: "blush",
		motif: "rings",
		excerpt: "Ninety percent of the 'sensitive skin' we see is a barrier that's been loved too hard. Here's how we rebuild it.",
		body: [
			"Your skin barrier is a brick wall: corneocyte bricks held together by a mortar of ceramides, cholesterol and fatty acids. When it's intact, water stays in, irritants stay out, and light reflects evenly off the surface — which is what we actually perceive as glow.",
			"Most of the redness, stinging and 'sudden sensitivity' we see in clinic isn't a skin type. It's a barrier that has been exfoliated, retinised and actived into exhaustion. The wall thins, transepidermal water loss climbs, and every product suddenly burns.",
			"Rebuilding is unglamorous and fast: strip the routine back to a gentle cleanse, a ceramide-dominant moisturiser and SPF for fourteen days. In clinic, we accelerate it with LED and occlusive peptide masks. Almost no one needs a new serum. Almost everyone needs a rest.",
		],
		quote: "Glow is not added to the skin. It is what skin does when nothing is in its way.",
		tips: [
			"One active at a time — never stack acids with retinoids on the same night.",
			"If a product stings on damp skin, the barrier is talking. Listen.",
			"Fourteen days of boredom beats six months of repair.",
		],
	},
	{
		id: "retinol",
		issue: "Nº 03",
		title: "Retinol, without the rebellion.",
		category: "Protocols",
		read: "5 min read",
		date: "Oct 28, 2026",
		author: "Dr. Leila Moreau",
		role: "Aesthetic Physician",
		initials: "LM",
		gradient: "from-copper to-gild",
		cover: "mineral",
		motif: "drop",
		excerpt: "The gold-standard molecule doesn't need a purge to work. A slower ladder gets you the same collagen, quietly.",
		body: [
			"Retinoids remain the most studied anti-aging molecule in dermatology: they normalise cell turnover, thicken the dermis and fade pigment. The problem was never efficacy — it was the culture of 'push through the peel' that came with them.",
			"We prescribe a ladder instead. Start at 0.2% retinol, one night a week, buffered between two layers of moisturiser — the sandwich method. Add a night every two weeks only if skin stays quiet. Most clients reach three nights a week at 0.5% in four months, with zero drama.",
			"The collagen response at twelve months is statistically identical to the aggressive route. The difference is that no one spent October hiding from their own reflection. Consistency beats intensity, every single time.",
		],
		quote: "The best retinoid routine is the one your skin never notices you started.",
		tips: [
			"Pea-sized for the whole face. More product is not more results.",
			"Apply to dry skin — damp skin doubles penetration and irritation.",
			"SPF is non-negotiable; retinoids reveal newer, more sun-responsive skin.",
		],
	},
	{
		id: "spf",
		issue: "Nº 02",
		title: "SPF is the anti-aging treatment.",
		category: "Daily Ritual",
		read: "4 min read",
		date: "Oct 09, 2026",
		author: "Maya Lindqvist",
		role: "Lead Aesthetician",
		initials: "ML",
		gradient: "from-plum to-rose",
		cover: "plum",
		motif: "sun",
		excerpt: "We can laser away a decade of sun. We cannot laser away tomorrow's. The most powerful protocol fits in your pocket.",
		body: [
			"Up to eighty percent of visible facial aging — pigment, laxity, fine lines — traces back to ultraviolet exposure. UVA passes through cloud cover and window glass all day long, which means the drive to work counts as exposure even when the beach doesn't happen.",
			"In clinic we can reverse a remarkable amount of that history with IPL and fractional laser. But every unprotected day quietly re-deposits it. Clients who wear SPF 50 daily hold their laser results two to three times longer than those who don't. That is the entire economics of glow.",
			"Choose a texture you genuinely enjoy — a fluid, a tinted mineral, a cushion compact — and apply two finger-lengths every morning, reapplying at lunch if you sit by a window. Tinted formulas with iron oxides also block visible light, the wavelength that drives stubborn melasma.",
		],
		quote: "Sunscreen is not the boring step. It is the treatment everything else protects.",
		tips: [
			"Two finger-lengths for face and neck — most people apply a quarter of the tested dose.",
			"Tinted mineral SPF for melasma-prone skin: iron oxides block visible light.",
			"Keep a second tube in your bag. The best SPF is the one within reach.",
		],
	},
];

export const HOURS = [
	{ label: "Monday", jsDay: 1, time: "9:00 — 19:00" },
	{ label: "Tuesday", jsDay: 2, time: "9:00 — 19:00" },
	{ label: "Wednesday", jsDay: 3, time: "9:00 — 19:00" },
	{ label: "Thursday", jsDay: 4, time: "9:00 — 20:00" },
	{ label: "Friday", jsDay: 5, time: "9:00 — 19:00" },
	{ label: "Saturday", jsDay: 6, time: "10:00 — 17:00" },
	{ label: "Sunday", jsDay: 0, time: "Closed", closed: true },
];

export const BOOKING_TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export function to12h(t: string) {
	const [h, m] = t.split(":").map(Number);
	return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
