'use client';

import { useEffect, useState } from 'react';
import SmartLeadModal from '../marketing/SmartLeadModal';

export default function AutoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        // Retrieve if already shown in this session (optional, simpler to just show for demo)
        const sessionKey = 'divino-blog-popup-shown';
        if (sessionStorage.getItem(sessionKey)) {
            // Uncomment to prevent re-opening on reload
            // return;
        }

        const timer = setTimeout(() => {
            if (!hasOpened) {
                setIsOpen(true);
                setHasOpened(true);
                sessionStorage.setItem(sessionKey, 'true');
            }
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
    }, [hasOpened]);

    return (
        <SmartLeadModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            initialService="Locacao" // Default service for popups
        />
    );
}
