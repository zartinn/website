export function Logo({ width = '52', height = '52' }: { width?: string, height?: string }) {

    return (
        <svg
            style={{ filter: `drop-shadow(2px 3px 2px var(--fg-primary-shadow))` }}
            fill="var(--fg-primary)"
            width={width}
            height={height}
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M 16 12 L 226 12 L 24 227 L 24 187 L 162 40 L 42 40 L 16 12 Z"></path>
            <path d="M 233 51 L 52 244 L 244 244 L 219 217 L 115 217 L 233 91 L 233 51 Z"></path>
        </svg>
    )
}