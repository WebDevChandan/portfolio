import '../../styles/loader/server-spin-loader.scss';

export default function ServerSpinLoader({ defaultPosition }: { defaultPosition?: string }) {
    return (
        <div className="server-spin-loader" style={defaultPosition ? { position: defaultPosition as React.CSSProperties['position'] } : undefined}>
            <div></div>
        </div>
    )
}
