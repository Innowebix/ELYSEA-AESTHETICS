
export default function Marquee() {
    const words = [
        "SKIN HEALTH",
        "SUBTLE BEAUTY",
        "PERSONALISED CARE",
        "CONFIDENTLY YOU",
    ];

    return (
        <div
            className="marquee-band"
            aria-label="Skin health, subtle beauty, personalised care, confidently you"
        >
            <div className="marquee-track">
                {[0, 1].map((copy) => (
                    <div
                        className="marquee-content"
                        key={copy}
                        aria-hidden={copy === 1}
                    >
                        {words.map((word, index) => (
                            <span key={`${word}-${index}`}>
                                {word}
                                <i>✳</i>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
