import { motion } from 'framer-motion';

function SceneGallery({ scenes, onDeleteScene }) {
    if (!scenes || scenes.length === 0) {
        return (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
                <span className="text-5xl block mb-4 opacity-50">🎬</span>
                <p className="text-lg">Henüz sahne eklenmemiş</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenes.map((scene, index) => (
                <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="scene-card group"
                >
                    {/* Scene Image */}
                    <div className="relative overflow-hidden">
                        {scene.image ? (
                            <img
                                src={scene.image}
                                alt={`Sahne ${index + 1}`}
                            />
                        ) : (
                            <div className="w-full h-[280px] bg-gradient-to-br from-[var(--color-bg-hover)] to-[var(--color-bg-secondary)] flex items-center justify-center">
                                <span className="text-5xl opacity-30">🎞️</span>
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />

                        {/* Delete Button */}
                        {onDeleteScene && (
                            <button
                                onClick={() => onDeleteScene(scene.id)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-red-500/80"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Scene Comment */}
                    <div className="p-6">
                        <p className="text-[var(--color-text-secondary)] leading-relaxed italic text-lg">
                            "{scene.comment || 'Yorum eklenmemiş'}"
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default SceneGallery;
