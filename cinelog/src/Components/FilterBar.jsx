import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GENRES, DEFAULT_TAGS, MEDIA_TYPES } from '../Interfaces/constants';

function FilterBar({ onFilterChange, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedMediaType, setSelectedMediaType] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value);
    };

    const handleFilterChange = (type, value) => {
        if (type === 'genre') {
            setSelectedGenre(value);
        } else if (type === 'tag') {
            setSelectedTag(value);
        } else if (type === 'mediaType') {
            setSelectedMediaType(value);
        }

        onFilterChange?.({
            genre: type === 'genre' ? value : selectedGenre,
            tag: type === 'tag' ? value : selectedTag,
            mediaType: type === 'mediaType' ? value : selectedMediaType,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedTag('');
        setSelectedMediaType('');
        onSearch?.('');
        onFilterChange?.({ genre: '', tag: '', mediaType: '' });
    };

    const hasActiveFilters = searchTerm || selectedGenre || selectedTag || selectedMediaType;

    return (
        <div className="mb-8">
            {/* Search Bar */}
            <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Film veya dizi ara..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="input-field pl-10"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                        🔍
                    </span>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`px-4 py-2 rounded-lg border transition-all ${isExpanded
                        ? 'bg-[var(--color-purple-main)] border-[var(--color-purple-main)]'
                        : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-purple-main)]'
                        }`}
                >
                    <span className="mr-2">⚙️</span>
                    Filtreler
                </button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="glass rounded-xl p-4 space-y-4">
                            {/* Media Type */}
                            <div>
                                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
                                    Tür
                                </label>
                                <div className="flex gap-2">
                                    {MEDIA_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleFilterChange('mediaType', selectedMediaType === type ? '' : type)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${selectedMediaType === type
                                                ? 'bg-[var(--color-purple-main)] border-[var(--color-purple-main)]'
                                                : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-purple-main)]'
                                                }`}
                                        >
                                            {type === 'Dizi' ? '📺' : '🎬'} {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Genre Filter */}
                            <div>
                                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
                                    Kategori
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {GENRES.map((genre) => (
                                        <button
                                            key={genre}
                                            onClick={() => handleFilterChange('genre', selectedGenre === genre ? '' : genre)}
                                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${selectedGenre === genre
                                                ? 'bg-[var(--color-purple-main)] text-white'
                                                : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-purple-dark)] hover:text-white'
                                                }`}
                                        >
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tag Filter */}
                            <div>
                                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
                                    Etiket
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {DEFAULT_TAGS.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => handleFilterChange('tag', selectedTag === tag ? '' : tag)}
                                            className={`tag-badge cursor-pointer transition-all ${selectedTag === tag
                                                ? 'bg-[var(--color-purple-main)] border-[var(--color-purple-main)]'
                                                : 'hover:bg-[var(--color-purple-dark)]'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-[var(--color-purple-light)] hover:underline"
                                >
                                    🗑️ Filtreleri Temizle
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default FilterBar;
