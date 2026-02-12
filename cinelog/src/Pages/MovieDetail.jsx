import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '../hooks/useLocalStorage';
import RatingDisplay from '../Components/RatingDisplay';
import TagBadge from '../Components/TagBadge';
import SceneGallery from '../Components/SceneGallery';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getMovie, deleteMovie, addScene, deleteScene } = useMovies();
    const movie = getMovie(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddScene, setShowAddScene] = useState(false);
    const [sceneImage, setSceneImage] = useState('');
    const [sceneComment, setSceneComment] = useState('');
    const sceneInputRef = useRef(null);

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <span className="text-5xl md:text-6xl block mb-4 opacity-50">🎬</span>
                    <h2 className="text-lg md:text-xl font-semibold mb-3">İçerik Bulunamadı</h2>
                    <Link to="/" className="text-[var(--color-purple-light)] hover:underline text-sm">
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>
            </div>
        );
    }

    const handleDelete = () => {
        deleteMovie(id);
        navigate('/');
    };

    const handleSceneImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSceneImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddScene = () => {
        if (sceneImage || sceneComment) {
            addScene(id, { image: sceneImage, comment: sceneComment });
            setSceneImage('');
            setSceneComment('');
            setShowAddScene(false);
        }
    };

    const handleDeleteScene = (sceneId) => {
        deleteScene(id, sceneId);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            {/* Hero Section */}
            <div className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] overflow-hidden">
                {/* Background Image */}
                {movie.coverImage ? (
                    <div className="absolute inset-0">
                        <img
                            src={movie.coverImage}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 20%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-[var(--color-bg-primary)]/30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/80 via-transparent to-transparent" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple-dark)]/20 via-[var(--color-bg-primary)] to-[var(--color-bg-primary)]" />
                )}

                {/* Navigation */}
                <div className="absolute top-0 left-0 right-0 z-20">
                    <div className="movie-detail-main w-full py-5 md:py-6 flex items-center justify-between">
                        <Link
                            to="/"
                            className="!px-5 !py-2 rounded-full bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] hover:border-[var(--color-purple-main)]/50 hover:bg-[var(--color-bg-secondary)] transition-all text-sm font-medium text-[var(--color-text-secondary)] hover:text-white"
                        >
                            ← Geri
                        </Link>

                        <div className="flex items-center gap-3">
                            <Link
                                to={`/edit/${id}`}
                                className="!px-5 !py-2 rounded-full bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] hover:border-[var(--color-purple-main)]/50 hover:bg-[var(--color-purple-main)]/20 transition-all text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-purple-light)]"
                            >
                                Düzenle
                            </Link>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="!px-5 !py-2 rounded-full bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] hover:border-red-500/50 hover:bg-red-500/20 transition-all text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-400"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-end">
                    <div className="movie-detail-main w-full pb-8 md:pb-12 lg:pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-3xl"
                        >
                            {/* Media Type */}
                            <span className="inline-block text-xs md:text-sm uppercase tracking-widest text-[var(--color-purple-light)] mb-2 md:mb-3">
                                {movie.mediaType === 'Dizi' ? '📺 Dizi' : '🎬 Film'}
                            </span>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight">
                                {movie.title}
                            </h1>

                            {/* Genres */}
                            {movie.genres?.length > 0 && (
                                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre}
                                            className="text-xs md:text-sm text-[var(--color-text-secondary)] uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Tags */}
                            {movie.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 !mt-2 md:!mt-4">
                                    {movie.tags.map((tag) => (
                                        <TagBadge key={tag} tag={tag} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="movie-detail-main w-full py-8 md:py-12 lg:py-16 space-y-6 md:space-y-8 lg:space-y-10 !mt-8 !mb-8">

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Rating Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="info-card"
                    >
                        <h3 className="text-xs uppercase tracking-widest text-[var(--color-purple-light)] mb-4 font-medium">Puan</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-baseline">
                                <span className="text-4xl md:text-5xl font-bold gradient-text">{movie.rating || 0}</span>
                                <span className="text-[var(--color-text-muted)] text-lg ml-1">/10</span>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-10 bg-[var(--color-border)]"></div>

                            <div className="flex-1">
                                <RatingDisplay rating={movie.rating} size="md" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Added Date Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="info-card"
                    >
                        <h3 className="text-xs uppercase tracking-widest text-[var(--color-purple-light)] mb-4 font-medium">Arşive Eklenme</h3>
                        <p className="text-xl md:text-2xl font-semibold">
                            {new Date(movie.createdAt).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="info-card md:col-span-2 lg:col-span-1"
                    >
                        <h3 className="text-xs uppercase tracking-widest text-[var(--color-purple-light)] mb-4 font-medium">İstatistikler</h3>
                        <div className="flex gap-6">
                            <div>
                                <span className="text-2xl md:text-3xl font-bold gradient-text">{movie.scenes?.length || 0}</span>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">Sahne</p>
                            </div>
                            <div>
                                <span className="text-2xl md:text-3xl font-bold gradient-text">{movie.tags?.length || 0}</span>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">Etiket</p>
                            </div>
                            <div>
                                <span className="text-2xl md:text-3xl font-bold gradient-text">{movie.genres?.length || 0}</span>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">Kategori</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* General Review */}
                {movie.generalReview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-section mt-8 md:mt-10"
                    >
                        <div className="section-title">
                            <span className="section-title-icon">💭</span>
                            Değerlendirme
                        </div>
                        <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-text-secondary)] leading-relaxed italic pl-4 border-l-2 border-[var(--color-purple-main)]">
                            "{movie.generalReview}"
                        </blockquote>
                    </motion.div>
                )}

                {/* Scenes Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card-section mt-8 md:mt-10"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="section-title !mb-0">
                            <span className="section-title-icon">🎬</span>
                            Etkileyici Sahneler
                        </div>
                        <button
                            onClick={() => setShowAddScene(!showAddScene)}
                            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all self-start sm:self-auto ${showAddScene
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'glass hover:bg-[var(--color-purple-main)]/30'}`}
                        >
                            {showAddScene ? '✕ İptal' : '+ Sahne Ekle'}
                        </button>
                    </div>

                    {/* Add Scene Form */}
                    <AnimatePresence>
                        {showAddScene && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 overflow-hidden"
                            >
                                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 md:p-6 border border-[var(--color-border)]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div
                                            onClick={() => sceneInputRef.current?.click()}
                                            className="upload-zone aspect-video rounded-xl flex items-center justify-center"
                                        >
                                            {sceneImage ? (
                                                <img src={sceneImage} alt="Scene" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                                            ) : (
                                                <div className="relative z-10 text-center py-6">
                                                    <span className="text-3xl block mb-2 opacity-60">📷</span>
                                                    <span className="text-[var(--color-text-muted)] text-sm">Sahne Fotoğrafı</span>
                                                </div>
                                            )}
                                            <input
                                                ref={sceneInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleSceneImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <textarea
                                                value={sceneComment}
                                                onChange={(e) => setSceneComment(e.target.value)}
                                                placeholder="Bu sahne hakkında düşüncelerin..."
                                                className="input-field flex-1 resize-none min-h-[120px] text-sm"
                                            />
                                            <button
                                                onClick={handleAddScene}
                                                disabled={!sceneImage && !sceneComment}
                                                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed text-sm !py-2.5"
                                            >
                                                <span>Sahneyi Kaydet</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <SceneGallery scenes={movie.scenes} onDeleteScene={handleDeleteScene} />
                </motion.div>
            </main>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card-section max-w-sm w-full text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="text-4xl md:text-5xl block mb-4">⚠️</span>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Silmek istediğine emin misin?</h3>
                            <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                                "{movie.title}" arşivinden kalıcı olarak silinecek.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 py-2.5 rounded-full glass hover:bg-[var(--color-bg-hover)] transition-colors text-sm font-medium"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-sm font-medium"
                                >
                                    Sil
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default MovieDetail;
