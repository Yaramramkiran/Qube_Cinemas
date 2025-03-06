import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatSize";

interface MetaDataProps {
    data: {
        id: string;
        name: string;
        artist: string;
        type: string;
        songcount: number;
        songs: [];
        durationInSeconds: number;
        sizeInBytes: number;
        releasedOn: string;
    };
}

const MetadataDisplay: React.FC<MetaDataProps> = ({ data }) => {
    const metaHeadings = data ? Object.entries(data) : [];

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes} minutes ${remainingSeconds} seconds`;
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", background: "white", padding: "12px 24px", borderRadius: "8px" }}>
            {metaHeadings
                ?.filter(([key]) => key !== "songs" && key !== "id" && key !== "name")
                .map(([key, value], index) => {
                    const numericValue = typeof value === "number" ? value : 0; // Ensure a number
                    const stringValue = typeof value === "string" ? value : ""; // Ensure a string

                    return (
                        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <p style={{
                                fontWeight: "500", fontSize: "12px", color: "#2D3540", textTransform: "capitalize",
                            }}>
                                {key === "durationInSeconds" ? "Total Duration" : key === "sizeInBytes" ? "Total Size" : key}
                            </p>
                            <p style={{ color: "#2D3540", fontWeight: "400", fontSize: "14px" }}>
                                {key === "durationInSeconds"
                                    ? formatDuration(numericValue)
                                    : key === "sizeInBytes"
                                        ? formatSize(numericValue)
                                        : key === "releasedOn"
                                            ? formatDate(stringValue)
                                            : value}
                            </p>
                        </div>
                    );
                })}


        </div>
    );
};

export default MetadataDisplay;
