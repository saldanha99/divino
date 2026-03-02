import Script from 'next/script';

export default function SchemaJSONLD({ json }: { json: Record<string, any> }) {
    return (
        <Script
            id="schema-json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
            strategy="afterInteractive"
        />
    );
}
