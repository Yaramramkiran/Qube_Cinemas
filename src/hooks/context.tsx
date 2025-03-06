import { createContext, useContext, useEffect, useState } from "react";

interface Collection {
    id: string;
    name: string;
    artist: string;
    type: string;
    songcount: number;
    songs: [];
    durationInSeconds: number;
    sizeInBytes: number;
    releasedOn: string;
}

interface MusicContextType {
    collections: Collection[] | null;
    selectedCollection: Collection | null;
    fetchCollectionById: (collectionId: string) => Promise<void>;
    loading: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const [collections, setCollections] = useState<Collection[] | null>(null);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch all music collection data
    const fetchMusicCollections = async () => {
        setLoading(true);
        try {
            setTimeout(async () => {
                const response = await fetch("http://localhost:5001/collections", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data: Collection[] = await response.json();
                setCollections(data);
            }, 1200);
        } catch (error) {
            console.error("Error fetching music collections:", error);
        }
    };

    // Fetch a single collection by id
    const fetchCollectionById = async (collectionId: string) => {
        setLoading(true);
        try {
            setTimeout(async () => {
                const response = await fetch(`http://localhost:5001/collections/${collectionId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data: Collection = await response.json();
                setSelectedCollection(data);
            }, 1200);
        } catch (error) {
            console.error("Error fetching collection details:", error);
        }
    };

    useEffect(() => {
        console.log("Fetching music collections...");
        fetchMusicCollections();
    }, []);


    return (
        <MusicContext.Provider value={{ collections, selectedCollection, fetchCollectionById, loading }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusicContext = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error("useMusicContext must be used within a MusicProvider");
    }
    return context;
};
