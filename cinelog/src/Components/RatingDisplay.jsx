function RatingDisplay({ rating, showNumber = true, size = 'md' }) {
    const percentage = (rating / 10) * 100;

    const barHeights = {
        sm: 'h-1',
        md: 'h-1',
        lg: 'h-1.5',
    };

    const textSizes = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    return (
        <div className="flex items-center justify-center gap-4 w-full">
            {showNumber && (
                <div className="flex items-baseline">
                    <span className={`${textSizes[size]} font-bold gradient-text`}>{rating}</span>
                    <span className="text-[var(--color-text-muted)] text-sm ml-1">/10</span>
                </div>
            )}
            <div className={`flex-1 rating-bar ${barHeights[size]}`}>
                <div
                    className="rating-bar-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default RatingDisplay;
