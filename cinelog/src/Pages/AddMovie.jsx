import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useLocalStorage';
import { GENRES, DEFAULT_TAGS, MEDIA_TYPES } from '../Interfaces/constants';
import { INITIAL_MOVIE_FORM } from '../Interfaces/MovieModel';
import TagBadge from '../Components/TagBadge';

function AddMovie() {
    const navigate = useNavigate();
    const { addMovie } = useMovies();
    const coverInputRef = useRef(null);

    const [formData, setFormData] = useState({ ...INITIAL_MOVIE_FORM });

    const [newTag, setNewTag] = useState('');
    const [sceneImage, setSceneImage] = useState('');
    const [sceneComment, setSceneComment] = useState('');
    const sceneInputRef = useRef(null);

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, coverImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
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

    const addScene = () => {
        if (sceneImage || sceneComment) {
            setFormData({
                ...formData,
                scenes: [
                    ...formData.scenes,
                    { id: crypto.randomUUID(), image: sceneImage, comment: sceneComment },
                ],
            });
            setSceneImage('');
            setSceneComment('');
        }
    };

    const removeScene = (id) => {
        setFormData({
            ...formData,
            scenes: formData.scenes.filter(scene => scene.id !== id),
        });
    };

    const toggleGenre = (genre) => {
        if (formData.genres.includes(genre)) {
            setFormData({ ...formData, genres: formData.genres.filter(g => g !== genre) });
        } else {
            setFormData({ ...formData, genres: [...formData.genres, genre] });
        }
    };

    const toggleTag = (tag) => {
        if (formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
        } else {
            setFormData({ ...formData, tags: [...formData.tags, tag] });
        }
    };

    const addCustomTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData({ ...formData, tags: [...formData.tags, newTag] });
            setNewTag('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            alert('Lütfen bir başlık girin');
            return;
        }
        addMovie(formData);
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pb-8"
        >
            {/* Header */}
            <header className="page-header form-page-container">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="w-10 h-10 md:w-11 md:h-11 rounded-xl glass flex items-center justify-center hover:bg-[var(--color-purple-main)]/30 transition-all text-lg flex-shrink-0"
                    >
                        ←
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Yeni Ekle</h1>
                        <p className="text-[var(--color-text-muted)] text-xs sm:text-sm mt-0.5">Arşivine yeni bir içerik ekle</p>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="form-page-container">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

                    {/* Card 1: Basic Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card-section"
                    >
                        <div className="section-title">
                            <span className="section-title-icon">📝</span>
                            Temel Bilgiler
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Cover Image - Left side */}
                            <div className="lg:col-span-2 order-2 lg:order-1">
                                <div
                                    onClick={() => coverInputRef.current?.click()}
                                    className="upload-zone aspect-[2/3] rounded-2xl flex flex-col items-center justify-center group"
                                >
                                    {formData.coverImage ? (
                                        <>
                                            <img
                                                src={formData.coverImage}
                                                alt="Cover"
                                                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                                <span className="text-base md:text-lg font-medium">Değiştir</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="relative z-10 flex flex-col items-center justify-center text-[var(--color-text-muted)] py-8">
                                            <span className="text-4xl md:text-5xl mb-3 opacity-60">📷</span>
                                            <span className="text-sm md:text-base font-medium">Kapak Fotoğrafı</span>
                                            <span className="text-xs mt-2 opacity-60">Önerilen oran: 2:3</span>
                                        </div>
                                    )}
                                    <input
                                        ref={coverInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Form Fields - Right side */}
                            <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">
                                {/* Title */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[var(--color-purple-light)] !mb-2 font-medium">
                                        Başlık *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Film veya dizi adı"
                                        className="input-field text-base md:text-lg !mb-4"
                                    />
                                </div>

                                {/* Media Type */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[var(--color-purple-light)] !mb-2 font-medium">
                                        Tür
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 !mb-4">
                                        {MEDIA_TYPES.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, mediaType: type })}
                                                className={`px-4 py-3 rounded-xl border-2 transition-all text-sm md:text-base font-medium ${formData.mediaType === type
                                                    ? 'bg-[var(--color-purple-main)]/20 border-[var(--color-purple-main)] text-[var(--color-purple-light)]'
                                                    : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-purple-main)]/50'
                                                    }`}
                                            >
                                                {type === 'Dizi' ? '📺' : '🎬'} {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* General Review */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[var(--color-purple-light)] !mb-2 font-medium">
                                        Genel Değerlendirme
                                    </label>
                                    <textarea
                                        value={formData.generalReview}
                                        onChange={(e) => setFormData({ ...formData, generalReview: e.target.value })}
                                        placeholder="Bu içerik hakkında ne düşünüyorsun?"
                                        rows={3}
                                        className="input-field resize-none text-sm md:text-base"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Rating */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-section"
                    >
                        <div className="section-title">
                            <span className="section-title-icon">⭐</span>
                            Puan
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl md:text-6xl font-bold gradient-text">{formData.rating}</span>
                                <span className="text-[var(--color-text-muted)] text-lg">/10</span>
                            </div>
                            <div className="flex-1 w-full">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="0.5"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                    className="w-full accent-[var(--color-purple-main)] h-2 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2 px-1">
                                    <span>1</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Categories & Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card-section"
                    >
                        <div className="section-title">
                            <span className="section-title-icon">🏷️</span>
                            Kategoriler & Etiketler
                        </div>

                        {/* Genres */}
                        <div className="!mb-4">
                            <label className="block text-xs uppercase tracking-widest text-[var(--color-purple-light)] !mb-2 font-semibold pb-2 border-b border-[var(--color-border)]">
                                📂 Kategoriler
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => (
                                    <button
                                        key={genre}
                                        type="button"
                                        onClick={() => toggleGenre(genre)}
                                        className={`!px-4 !py-2 md:px-5 md:py-2.5 mb-2 rounded-full text-xs md:text-sm transition-all font-medium ${formData.genres.includes(genre)
                                            ? 'bg-[var(--color-purple-main)] text-white'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-purple-main)]'
                                            }`}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="!mb-4">
                            <label className="block text-xs uppercase tracking-widest text-[var(--color-purple-light)] !mb-2 font-semibold pb-2 border-b border-[var(--color-border)]">
                                🏷️ Etiketler
                            </label>
                            <div className="flex flex-wrap gap-2 !mb-4">
                                {DEFAULT_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`tag-badge cursor-pointer text-xs md:text-sm ${formData.tags.includes(tag)
                                            ? '!bg-[var(--color-purple-main)]/30 !border-[var(--color-purple-main)]'
                                            : ''
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Tag */}
                            <div className="flex gap-2 max-w-md !mt-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Özel etiket ekle..."
                                    className="input-field text-sm flex-1"
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                                />
                                <button
                                    type="button"
                                    onClick={addCustomTag}
                                    className="px-4 glass rounded-xl hover:bg-[var(--color-purple-main)]/30 transition-colors flex-shrink-0 text-lg"
                                >
                                    +
                                </button>
                            </div>

                            {/* Selected Tags */}
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 !mt-2">
                                    {formData.tags.map((tag) => (
                                        <TagBadge key={tag} tag={tag} removable onRemove={() => toggleTag(tag)} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Card 4: Scenes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-section"
                    >
                        <div className="section-title">
                            <span className="section-title-icon">🎬</span>
                            Etkileyici Sahneler
                        </div>

                        {/* Add Scene */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                                    className="input-field flex-1 resize-none min-h-[100px] text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={addScene}
                                    disabled={!sceneImage && !sceneComment}
                                    className="py-2.5 rounded-xl glass hover:bg-[var(--color-purple-main)]/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    + Sahne Ekle
                                </button>
                            </div>
                        </div>

                        {/* Added Scenes */}
                        {formData.scenes.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {formData.scenes.map((scene, index) => (
                                    <div key={scene.id} className="relative group">
                                        <div className="rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                                            {scene.image && (
                                                <img src={scene.image} alt={`Scene ${index + 1}`} className="w-full h-20 md:h-24 object-cover" />
                                            )}
                                            <p className="p-2 text-xs text-[var(--color-text-secondary)] line-clamp-2">
                                                {scene.comment || 'Yorum yok'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeScene(scene.id)}
                                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Submit Buttons */}
                    <div className="form-actions">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/">
                                <button type="button" className="min-w-[160px] !py-3 px-8 rounded-full glass hover:bg-[var(--color-bg-hover)] transition-colors text-sm font-medium">
                                    İptal
                                </button>
                            </Link>
                            <button type="submit" className="btn-primary min-w-[160px] !py-3 px-8 text-sm">
                                <span>Kaydet</span>
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </motion.div>
    );
}

export default AddMovie;
