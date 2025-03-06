import { useParams } from 'react-router-dom'
import { useMusicContext } from '../hooks/context';
import { useEffect } from 'react';
import CommonMainHeader from '../components/CommonMainHeader';
import Table from '../components/CommonTable';
import MetadataDisplay from '../components/ArtistDataDisplay';
import { HiChevronRight } from 'react-icons/hi';

function CollectionDetails() {
    const { id } = useParams()
    const { fetchCollectionById, selectedCollection } = useMusicContext();
    const columns = selectedCollection?.songs ? Object.keys(selectedCollection?.songs[0]) : [];


    useEffect(() => {
        if (id) {
            fetchCollectionById(id);
        }
    }, [id]);



    return (
        <div style={{ background: "#bcb1b126", minHeight: "100vh" }}>
            {!selectedCollection ? (
                <p style={{ textAlign: "center", padding: "24px", fontSize: "16px", color: "#29313A", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</p>
            ) : (
                <>
                    <p style={{ padding: "8px 24px", background: "transparent", fontWeight: "400", fontSize: "12px", color: "#29313A", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ fontWeight: "500", fontSize: "12px", color: "#677A90" }}>Overview</span>
                        <HiChevronRight style={{ color: "#677A90", fontSize: "16px" }} />
                        {selectedCollection?.name}
                    </p>

                    {selectedCollection?.name && <CommonMainHeader heading={selectedCollection?.name} />}

                    <div style={{ margin: "25px 24px 0 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <MetadataDisplay data={selectedCollection} />
                        <Table columns={columns} data={selectedCollection?.songs} dataFromCollectionDetails={true} />
                    </div>
                </>
            )}
        </div>

    )
}

export default CollectionDetails