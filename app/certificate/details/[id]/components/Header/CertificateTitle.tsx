export default function CertificateTitle({ name , authority}:{name: string, authority?: string}) {
    return (
        <div className="cp-title cp-title">
            <h2>{name}</h2>
            <p>
                Certificate Authority - &nbsp;
                <span className="cp-project-category cp-project-category">
                    {authority}
                </span>
            </p>
        </div>
    )
}
