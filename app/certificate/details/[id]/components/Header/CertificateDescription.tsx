export default function CertificateDescription({ description }: { description: string }) {
    return (
        <div className="description">
            <h3>Description</h3>
            <p>
                {description}
            </p>
        </div>
    )
}
