export default async function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
    return (
            <embed
                src={pdfUrl}
                type="application/pdf"
                width="800"
                height="600"
            />
    )
}
