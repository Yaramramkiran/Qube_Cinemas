import React from "react";
import { FaEye } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import { formatDuration } from "../utils/formatTime";
import { formatSize } from "../utils/formatSize";

interface TableProps {
    columns: string[];
    data: [] | undefined | null;
    navigate?: (id: string) => void | undefined;
    showViewDetails?: boolean;
    dataFromCollectionDetails: boolean;
}


const columnMappings: Record<string, string> = {
    name: "Collection Name",
    durationInSeconds: "Duration",
    sizeInBytes: "Size",
};

const Table: React.FC<TableProps> = ({ columns, data, navigate, showViewDetails, dataFromCollectionDetails }) => {

    console.log(data);
    console.log(columns);
    const getProcessedColumns = (columns: string[], dataFromCollectionDetails: boolean) => {
        let updatedColumns = columns.filter((col) => !["id", "artist", "songs"].includes(col));

        if (dataFromCollectionDetails) {
            updatedColumns = updatedColumns.filter(col => col !== "performers");
            updatedColumns.splice(1, 0, "performers");
        }

        return updatedColumns;
    };

    const tableHeaders = getProcessedColumns(columns, dataFromCollectionDetails).map((col, index) => (
        <th
            key={index}
            style={{
                padding: "14px 8px",
                textAlign: "left",
                color: "#29313A",
                fontWeight: "500",
                fontSize: "14px",
                textTransform: "capitalize",
            }}
        >
            {columnMappings[col] || col.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </th>
    ));

    return (
        <div style={{ overflowX: "auto", background: "white", height: "80vh" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", }}>
                <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
                    <tr style={{ borderBottom: "1px solid #C2CAD3" }}>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} style={{ backgroundColor: "#ffffff" }}>
                                {columns
                                    .filter((col) => !["id", "artist", "songs"].includes(col))
                                    .sort((a, b) => (a === "performers" ? -1 : b === "performers" ? 1 : 0))
                                    .map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            style={{
                                                padding: "16px 12px",
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                color: "#29313A",
                                                borderBottom: "1px solid #E1E4E9",
                                            }}
                                        >
                                            {col === "name" ? (
                                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                                    <p style={{ margin: 0, fontWeight: "400", fontSize: "12px", color: "#29313A" }}>
                                                        {row["name"]}
                                                    </p>
                                                    <p style={{ margin: 0, color: "#677A90", fontWeight: "400", fontSize: "12px" }}>
                                                        {row["artist"]}
                                                    </p>
                                                </div>
                                            ) : col === "releasedOn" ? (
                                                formatDate(row[col])
                                            ) : col === "durationInSeconds" ? (
                                                formatDuration(row[col])
                                            ) : col === "sizeInBytes" ? (
                                                formatSize(row[col])
                                            ) : (
                                                row[col] || "-"
                                            )}

                                            {col === "performers"}
                                        </td>
                                    ))}

                                {showViewDetails && (
                                    <td
                                        style={{
                                            padding: "16px 12px",
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: "#29313A",
                                            borderBottom: "1px solid #E1E4E9",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                marginTop: "8px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => navigate(row["id"])}
                                        >
                                            <FaEye style={{ color: "#025992" }} />
                                            <p style={{ margin: 0, fontSize: "12px", color: "#025992", fontWeight: "500" }}>
                                                View Details
                                            </p>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px" }}>
                                No data available
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Table;
