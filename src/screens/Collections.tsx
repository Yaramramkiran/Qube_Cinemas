import { useState } from 'react';
import CommonMainHeader from '../components/CommonMainHeader'
import Table from '../components/CommonTable';
import SearchBar from '../components/SearchBar'
import { useMusicContext } from '../hooks/context';
import useDebounce from '../hooks/debounce';
import { useNavigate } from 'react-router-dom';

function Collections() {
    const { collections } = useMusicContext();
    console.log(collections);
    const columns = collections?.length ? Object.keys(collections[0]) : [];
    const navigate = useNavigate();
    const [openTypeModal, setOpenTypeModal] = useState(false);
    const [selectedType, setSelectedType] = useState<{
        single: boolean;
        album: boolean;
        ep: boolean;
    }>({
        single: false,
        album: false,
        ep: false,
    });


    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredCollections = collections?.filter((item) => {
        const matchesSearch = debouncedSearchTerm
            ? Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
            : true;

        const isAnyTypeSelected = Object.values(selectedType).some(Boolean);
        console.log(isAnyTypeSelected);


        const matchesType = !isAnyTypeSelected ||
            Object.keys(selectedType).some(
                (key) => selectedType[key as keyof typeof selectedType] && (item.type?.toLowerCase() ?? "") === key
            );

        return matchesSearch && matchesType;
    });



    console.log(filteredCollections);

    const handleCheckboxChange = (type: "single" | "album" | "ep") => {
        setSelectedType((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };


    const navigateToCollectionDetails = (id: string) => {
        navigate(`/collections/${id}`);
    }





    return (
        <div style={{ background: "#bcb1b126", minHeight: "100vh" }}>
            {!collections ?
                <p style={{ textAlign: "center", padding: "24px", fontSize: "16px", color: "#29313A", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</p>

                :
                <div>
                    <CommonMainHeader heading='Overview' />

                    <div style={{ border: "1px solid #E6ECF0", marginTop: "25px", marginLeft: "24px", marginRight: "24px", background: "grey", backgroundColor: "white", }}>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                            setOpenTypeModal={setOpenTypeModal} openTypeModal={openTypeModal}
                            handleCheckboxChange={handleCheckboxChange} selectedType={selectedType} />
                        <Table columns={columns} data={filteredCollections} navigate={navigateToCollectionDetails} showViewDetails={true} dataFromCollectionDetails={false} />


                    </div>

                </div>
            }

        </div>
    )
}

export default Collections