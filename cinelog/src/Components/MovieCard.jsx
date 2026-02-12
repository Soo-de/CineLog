import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RatingDisplay from './RatingDisplay';
import TagBadge from './TagBadge';

function MovieCard({ movie }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="card-hover"
        >
            <Link to={`/movie/${movie.id}`} className="block">
                <div className="relative rounded-xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)] group">
                    {/* Cover Image */}
                    <div className="relative h-72 overflow-hidden">
                        {movie.coverImage ? (
                            <img
                                src={movie.coverImage}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-[var(--color-bg-hover)] flex items-center justify-center">
                                <span className="text-6xl">🎬</span>
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 glass rounded-lg px-3 py-1.5">
                            <span className="text-lg font-bold gradient-text">{movie.rating}</span>
                            <span className="text-[var(--color-text-muted)] text-sm">/10</span>
                        </div>

                        {/* Media Type Badge */}
                        <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5">
                            <span className="text-sm text-[var(--color-purple-light)]">
                                {movie.mediaType === 'Dizi' ? '📺' : '🎬'} {movie.mediaType}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
                            {movie.title}
                        </h3>

                        {/* Rating Bar */}
                        <RatingDisplay rating={movie.rating} showNumber={false} />

                        {/* Genres */}
                        <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                            {movie.genres?.slice(0, 2).map((genre) => (
                                <span
                                    key={genre}
                                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Tags */}
                        {movie.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {movie.tags.slice(0, 2).map((tag) => (
                                    <TagBadge key={tag} tag={tag} small />
                                ))}
                            </div>
                        )}

                        {/* Review Preview */}
                        {movie.generalReview && (
                            <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 italic">
                                "{movie.generalReview}"
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default MovieCard;
