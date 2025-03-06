import { useEffect, useRef } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setOpenTypeModal: (open: boolean) => void;
    openTypeModal: boolean;
    handleCheckboxChange: (type: "single" | "album" | "ep") => void;
    selectedType: {
        single: boolean;
        album: boolean;
        ep: boolean;
    };
}

const listOfType: Array<"single" | "album" | "ep"> = ["single", "album", "ep"];


const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, setOpenTypeModal, openTypeModal, handleCheckboxChange, selectedType }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                console.log("Closing modal");
                setOpenTypeModal(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 14px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    width: "310px",
                    height: "34px",
                    padding: "5px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        padding: "8px 12px",
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "400",
                    }}
                    className="custom-input"
                />
                <FiSearch
                    style={{
                        marginRight: "10px",
                        color: "gray",
                        fontSize: "18px",
                    }}
                />
            </div>

            <div style={{ position: "relative", display: "inline-block" }}>
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        background: "#E1E4E9",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "500",
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontSize: "12px",
                        height: "32px",
                        width: "auto",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenTypeModal(!openTypeModal);
                    }}
                >
                    Type
                    {Object.values(selectedType).filter(Boolean).length > 0 && (
                        <span>({Object.values(selectedType).filter(Boolean).length})</span>
                    )}
                    <FiChevronDown style={{ fontSize: "14px" }} />
                </button>

                {openTypeModal && (
                    <div
                        ref={modalRef}
                        style={{
                            position: "absolute",
                            top: "40px",
                            left: "0",
                            background: "#ffffff",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            padding: "8px",
                            zIndex: 9999,
                            minWidth: "205px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        {listOfType.map((type, index) => (
                            <div key={index}
                                onClick={() => { handleCheckboxChange(type), setOpenTypeModal(false) }}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "8px",
                                    width: "100%",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    alignItems: "center"
                                }}
                            >
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedType[type]}
                                        onChange={() => handleCheckboxChange(type)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <p style={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        color: "#29313A",
                                        textTransform: "capitalize",
                                        margin: 0
                                    }}>
                                        {type}
                                    </p>
                                </label>
                            </div>
                        ))}

                    </div>
                )}
            </div>

            {searchTerm.length > 1 && <button
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    background: "#E1E4E9",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "500",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                    height: "32px",
                    width: "auto",
                }}
                onClick={() => setSearchTerm("")}
            >
                Clear Search
                <RxCross2 size={18} color="#ff0000" />
            </button>}
        </div>
    );
};

export default SearchBar;
