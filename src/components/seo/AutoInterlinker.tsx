import Link from 'next/link';
import React from 'react';

// Basic map of keywords to URLs
// In a real app, this might come from the DB or a CMS
const KEYWORD_MAP: Record<string, string> = {
    'Retroescavadeira': '/locacao/retroescavadeira',
    'Escavadeira': '/locacao/escavadeira',
    'Terraplenagem': '/servicos/terraplenagem',
    'Motoniveladora': '/locacao/motoniveladora',
    'Rolo Compactador': '/locacao/rolo-compactador',
    'Divino Locações': '/',
};

/**
 * AutoInterlinker Component
 * Scans children text and replaces keywords with internal links.
 * WARNING: This is a simplified regex-based approach. For complex HTML content,
 * parsing the AST (e.g. with html-react-parser) is safer to avoid breaking existing tags.
 */
export function AutoInterlinker({ content }: { content: string }) {
    if (!content) return null;

    // Create a regex pattern from keys, ensuring we match whole words and ignore case if desired
    // Using capture groups to split the string
    const pattern = new RegExp(`\\b(${Object.keys(KEYWORD_MAP).join('|')})\\b`, 'gi');

    const parts = content.split(pattern);

    return (
        <>
            {parts.map((part, index) => {
                // Check if this part matches a keyword (case insensitive check)
                const lowerPart = part.toLowerCase();
                const matchKey = Object.keys(KEYWORD_MAP).find(k => k.toLowerCase() === lowerPart);

                if (matchKey) {
                    return (
                        <Link
                            key={index}
                            href={KEYWORD_MAP[matchKey]}
                            className="text-brand-yellow font-medium hover:underline"
                            title={`Saiba mais sobre ${matchKey}`}
                        >
                            {part}
                        </Link>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
}
