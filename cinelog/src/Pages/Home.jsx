import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMovies } from '../hooks/useLocalStorage';
import RatingDisplay from '../components/RatingDisplay';
import TagBadge from '../components/TagBadge';

// Gallery Movie Item - Full screen exhibition style
function GalleryItem({ movie, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className="gallery-item"
        >
            <div className={`w-full max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 md:gap-12 lg:gap-20`}>
                {/* Image */}
                <motion.div
                    style={{ y }}
                    className="w-full max-w-md lg:max-w-none lg:w-1/2 px-4 md:px-0"
                >
                    <Link to={`/movie/${movie.id}`} className="block group">
                        <div className="relative aspect-[2/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                            {movie.coverImage ? (
                                <img
                                    src={movie.coverImage}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-bg-primary)] flex items-center justify-center">
                                    <span className="text-8xl opacity-30">🎬</span>
                                </div>
                            )}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Rating badge */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 glass rounded-full px-3 py-1.5 md:px-4 md:py-2">
                                <span className="text-xl md:text-2xl font-bold gradient-text">{movie.rating}</span>
                                <span className="text-[var(--color-text-muted)] text-xs md:text-sm ml-1">/10</span>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]) }}
                    className="w-full lg:w-1/2 space-y-5 md:space-y-6 text-center lg:text-left px-6 md:px-8 lg:px-0 flex flex-col items-center lg:items-start"
                >
                    {/* Media Type */}
                    <span className="inline-block text-xs md:text-sm uppercase tracking-widest text-[var(--color-purple-light)]">
                        {movie.mediaType === 'Dizi' ? '📺 Dizi' : '🎬 Film'}
                    </span>

                    {/* Title */}
                    <Link to={`/movie/${movie.id}`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight hover:text-[var(--color-purple-light)] transition-colors">
                            {movie.title}
                        </h2>
                    </Link>

                    {/* Genres */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre}
                                className="text-xs md:text-sm text-[var(--color-text-secondary)] uppercase tracking-wider"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Rating Bar */}
                    <div className="w-full max-w-xs md:max-w-sm !mt-4 md:!mt-6 mb-2 md:mb-4">
                        <RatingDisplay rating={movie.rating} size="lg" />
                    </div>

                    {/* Tags */}
                    {movie.tags?.length > 0 && (
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 !mt-2 md:!mt-4">
                            {movie.tags.slice(0, 3).map((tag) => (
                                <TagBadge key={tag} tag={tag} />
                            ))}
                        </div>
                    )}

                    {/* Review */}
                    {movie.generalReview && (
                        <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed italic max-w-md text-center lg:text-left !mt-4 md:!mt-6 pt-4 md:pt-5 border-t border-[var(--color-border)]/30 mb-2 md:mb-4">
                            "{movie.generalReview.length > 120
                                ? movie.generalReview.substring(0, 120) + '...'
                                : movie.generalReview}"
                        </p>
                    )}

                    {/* CTA */}
                    <div className="!mt-6 md:!mt-8">
                        <Link to={`/movie/${movie.id}`} className="inline-block">
                            <button className="btn-primary">
                                <span>Detayları Gör</span>
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Premium Navbar Component
function Navbar({ searchTerm, onSearchChange }) {
    const [scrolled, setScrolled] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'navbar-floating py-3'
                : 'navbar-transparent py-4 md:py-6'
                }`}
        >
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            className={`relative transition-all duration-300 ${scrolled ? 'w-9 h-9 md:w-10 md:h-10' : 'w-10 h-10 md:w-12 md:h-12'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glow ring */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple-light)] to-[var(--color-purple-dark)] rounded-xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity" />
                            {/* Rotating background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple-light)] to-[var(--color-purple-dark)] rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-500" />
                            {/* Main icon container */}
                            <div className="absolute inset-0 bg-[var(--color-bg-primary)] rounded-xl flex items-center justify-center border border-[var(--color-purple-main)]/20">
                                <span className="text-lg md:text-xl">🎬</span>
                            </div>
                        </motion.div>
                        <div className="hidden sm:block">
                            <h1 className={`font-bold gradient-text transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                                CineLog
                            </h1>
                            <p className={`text-[var(--color-text-muted)] transition-all duration-300 ${scrolled ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'}`}>
                                Film & Dizi Arşivi
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
                        {/* Search */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-purple-main)]/20 to-[var(--color-purple-dark)]/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className={`navbar-search relative rounded-full bg-[var(--color-bg-secondary)]/60 border border-[var(--color-border)] text-sm 
                  focus:outline-none focus:border-[var(--color-purple-main)] focus:bg-[var(--color-bg-secondary)] focus:ring-2 focus:ring-[var(--color-purple-main)]/20
                  transition-all duration-300 ${scrolled ? 'w-44 lg:w-52' : 'w-52 lg:w-60'}`}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-purple-light)] transition-colors text-sm">
                                🔍
                            </span>
                        </div>

                        {/* Add Button */}
                        <Link to="/add">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="navbar-add-btn"
                            >
                                <span className="icon">+</span>
                                <span>Yeni Ekle</span>
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden items-center gap-3 ml-auto">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${showMobileSearch
                                ? 'bg-[var(--color-purple-main)]/20 border-[var(--color-purple-main)]'
                                : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border)] backdrop-blur-sm'}`}
                        >
                            🔍
                        </motion.button>
                        <Link to="/add">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)]/80 border border-[var(--color-purple-main)]/40 flex items-center justify-center text-lg backdrop-blur-sm hover:bg-[var(--color-purple-main)]/20 hover:border-[var(--color-purple-main)] transition-all"
                            >
                                +
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search */}
                <AnimatePresence>
                    {showMobileSearch && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Film veya dizi ara..."
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-purple-main)] focus:ring-2 focus:ring-[var(--color-purple-main)]/20"
                                    autoFocus
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                    🔍
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}

function Home() {
    const { movies } = useMovies();
    const [searchTerm, setSearchTerm] = useState('');

    // Lazy loading state
    const [displayCount, setDisplayCount] = useState(5);
    const loadMoreRef = useRef(null);

    // Sort by rating (highest first) and filter
    const filteredMovies = useMemo(() => {
        return movies
            .filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }, [movies, searchTerm]);

    // Movies to display (lazy loaded)
    const displayedMovies = useMemo(() => {
        return filteredMovies.slice(0, displayCount);
    }, [filteredMovies, displayCount]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && displayCount < filteredMovies.length) {
                    setDisplayCount(prev => Math.min(prev + 3, filteredMovies.length));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [displayCount, filteredMovies.length]);

    // Reset display count when search changes
    useEffect(() => {
        setDisplayCount(5);
    }, [searchTerm]);

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-purple-dark)]/10 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[var(--color-purple-main)]/5 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center px-6 relative z-10"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6">
                        <span className="gradient-text">CineLog</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 md:mb-12 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
                        Kişisel film ve dizi arşivin.<br className="hidden sm:block" />
                        <span className="text-[var(--color-text-muted)]">Her anı sakla, her sahneyi hatırla.</span>
                    </p>

                    {movies.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <span className="text-xs md:text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                                {movies.length} içerik arşivde
                            </span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[var(--color-purple-light)] text-2xl cursor-pointer"
                                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            >
                                ↓
                            </motion.div>
                        </motion.div>
                    ) : (
                        <Link to="/add" className="inline-block">
                            <button className="btn-primary text-base md:text-lg">
                                <span>İlk İçeriği Ekle</span>
                            </button>
                        </Link>
                    )}
                </motion.div>
            </section>

            {/* Gallery Section */}
            {displayedMovies.length > 0 && (
                <section className="relative">
                    {displayedMovies.map((movie, index) => (
                        <div key={movie.id}>
                            <GalleryItem movie={movie} index={index} />
                            {index < displayedMovies.length - 1 && (
                                <div className="divider max-w-4xl mx-auto" />
                            )}
                        </div>
                    ))}

                    {/* Load More Trigger */}
                    {displayCount < filteredMovies.length && (
                        <div ref={loadMoreRef} className="py-20 text-center">
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[var(--color-text-muted)]"
                            >
                                Daha fazla yükleniyor...
                            </motion.div>
                        </div>
                    )}
                </section>
            )}

            {/* Empty State */}
            {movies.length > 0 && filteredMovies.length === 0 && (
                <section className="min-h-[50vh] flex items-center justify-center px-6">
                    <div className="text-center">
                        <span className="text-5xl md:text-6xl block mb-4 opacity-50">🔍</span>
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Sonuç Bulunamadı</h3>
                        <p className="text-[var(--color-text-secondary)]">
                            Arama kriterlerinize uygun içerik bulunamadı.
                        </p>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-12 md:py-16 text-center">
                <div className="divider max-w-md mx-auto mb-8 md:mb-12" />
                <p className="text-[var(--color-text-muted)] text-xs md:text-sm uppercase tracking-widest">
                    CineLog
                </p>
            </footer>
        </div>
    );
}

export default Home;
