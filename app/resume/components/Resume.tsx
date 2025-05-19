import PDFViewer from "./PDFViewer";

export default async function Resume({ resumeFile }: { resumeFile: string }) {
    const { status } = await fetch(`${resumeFile}`);

    return (
        <>
            {
                status === 200 && <PDFViewer resumeFile={`${resumeFile}`} />
                ||
                <h2
                    style={{
                        color: "var(--text-black-600)"
                    }}
                >Opps! Resume Not Found 🥲</h2>
            }
        </>
    )
}
