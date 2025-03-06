
function CommonMainHeader({ heading }: { heading: string | undefined }) {
    return (
        <div style={{ padding: "20px 24px", background: "#FFFFFF", fontWeight: "500", fontSize: "300", color: "#29313A" }}>
            {heading}
        </div>
    )
}

export default CommonMainHeader