export const STORY_LINKS = [
	{ label: "Story", href: "#story" },
	{ label: "Treatments", href: "#treatments" },
	{ label: "The Method", href: "#philosophy" },
	{ label: "Our Clinic", href: "#results" },
	// { label: "Journal", href: "#journal" },
	{ label: "Visit", href: "#visit" },
];

export type SceneMotif = "window" | "night" | "listening" | "mirror";

export type Scene = {
	id: string;
	chapter: string;
	stamp: string;
	line1: string;
	line2: string;
	body: string;
	whisper: string;
	motif: SceneMotif;
	tone: string;
	accent: string;
};

export const SCENES: Scene[] = [
	{
		id: "morning",
		chapter: "Chapter I",
		stamp: "07:12 · bathroom light",
		line1: "You catch the light —",
		line2: "and look away.",
		body: "It isn't vanity. It's a small flinch you've learned to hide. The mirror became a place you check, not a place you meet yourself.",
		whisper: "We know that flinch. We've watched a thousand people walk in carrying it.",
		motif: "window",
		tone: "from-blush via-porcelain to-petal/60",
		accent: "#B4643C",
	},
	{
		id: "weight",
		chapter: "Chapter II",
		stamp: "23:40 · the long day",
		line1: "Skin keeps the diary",
		line2: "you never wrote.",
		body: "Deadlines. Grief. A year of not sleeping. Cortisol draws its own map across a face — and no serum has ever argued successfully with a life.",
		whisper: "So we don't start with the surface. We start with the year you've had.",
		motif: "night",
		tone: "from-plum via-ink to-plum",
		accent: "#C4526A",
	},
	{
		id: "listening",
		chapter: "Chapter III",
		stamp: "the first hour · no forms yet",
		line1: "We look at your skin",
		line2: "second. We listen first.",
		body: "Tea, a warm room, and forty-five minutes where nobody sells you anything. Then imaging — your skin in honest data, shown to you, not talked about over your head.",
		whisper: "Being understood is the first treatment. Everything after it works better.",
		motif: "listening",
		tone: "from-mineral/25 via-blush to-gild/25",
		accent: "#4E7D8C",
	},
	{
		id: "mirror",
		chapter: "Chapter IV",
		stamp: "week eight · ordinary morning",
		line1: "And then one morning,",
		line2: "you don't look away.",
		body: "No reveal, no new face. Just your own, resting. The light lands and you stay a second longer than you used to. That second is the whole point.",
		whisper: "That's what we mean by glow. It was never about being looked at.",
		motif: "mirror",
		tone: "from-gild/30 via-blush to-porcelain",
		accent: "#C9973F",
	},
];
