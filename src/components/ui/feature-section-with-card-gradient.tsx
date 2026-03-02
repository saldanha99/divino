import React, { useId } from "react";

export function FeaturesSectionWithCardGradient({
    children,
    className
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`py-20 lg:py-40 ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}

export function FeatureCard({
    title,
    description,
    children,
    icon,
    image,
    className
}: {
    title: string;
    description?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    image?: string;
    className?: string;
}) {
    return (
        <div
            className={`relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${className || ''}`}
        >
            {image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
                <Grid size={20} />
                {icon && <div className="relative z-20 mb-4">{icon}</div>}
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white relative z-20 mb-2">
                    {title}
                </h3>
                {description && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20">
                        {description}
                    </p>
                )}
                <div className="relative z-20 mt-4 flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {Array.from(new Map(squares.map((item: any) => [`${item[0]}-${item[1]}`, item])).values()).map(([x, y]: any) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
