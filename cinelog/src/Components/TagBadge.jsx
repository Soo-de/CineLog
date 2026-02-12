function TagBadge({ tag, small = false, removable = false, onRemove }) {
    return (
        <span
            className={`tag-badge ${small ? 'text-xs !py-1 !px-3' : ''} ${removable ? 'pr-2' : ''
                }`}
        >
            {tag}
            {removable && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove?.(tag);
                    }}
                    className="ml-2 w-4 h-4 rounded-full bg-[var(--color-bg-hover)] flex items-center justify-center text-xs hover:bg-red-500/50 transition-colors"
                >
                    ×
                </button>
            )}
        </span>
    );
}

export default TagBadge;
