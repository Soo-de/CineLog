import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // State'i localStorage'dan veya initialValue'dan başlat
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('LocalStorage okuma hatası:', error);
            return initialValue;
        }
    });

    // State değiştiğinde localStorage'ı güncelle
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('LocalStorage yazma hatası:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

// Film/Dizi CRUD işlemleri için özel hook
export function useMovies() {
    const [movies, setMovies] = useLocalStorage('cinelog_movies', []);

    const addMovie = (movie) => {
        const newMovie = {
            ...movie,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setMovies([newMovie, ...movies]);
        return newMovie;
    };

    const updateMovie = (id, updates) => {
        setMovies(movies.map(movie =>
            movie.id === id ? { ...movie, ...updates } : movie
        ));
    };

    const deleteMovie = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    const getMovie = (id) => {
        return movies.find(movie => movie.id === id);
    };

    // Sahne ekleme
    const addScene = (movieId, scene) => {
        const newScene = {
            ...scene,
            id: crypto.randomUUID(),
        };
        setMovies(movies.map(movie =>
            movie.id === movieId
                ? { ...movie, scenes: [...(movie.scenes || []), newScene] }
                : movie
        ));
        return newScene;
    };

    // Sahne silme
    const deleteScene = (movieId, sceneId) => {
        setMovies(movies.map(movie =>
            movie.id === movieId
                ? { ...movie, scenes: movie.scenes.filter(s => s.id !== sceneId) }
                : movie
        ));
    };

    return {
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        getMovie,
        addScene,
        deleteScene,
    };
}
