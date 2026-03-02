'use client';

import { useState } from 'react';
import SmartLeadModal from './SmartLeadModal';
import { Button } from "@/components/ui/Button";
import { ChevronRight } from 'lucide-react';

interface SmartQuoteButtonProps {
    children: React.ReactNode;
    service?: string; // 'Terraplenagem', 'Demolicao', etc.
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Matches UI Button
}

export default function SmartQuoteButton({ children, service, className, variant = 'primary' }: SmartQuoteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* If custom className is provided that overrides Button look, we might need to adjust, but mostly we use this as a wrapper */}
            {className?.includes('glass-ios') ? (
                <button onClick={() => setIsOpen(true)} className={className}>
                    {children}
                </button>
            ) : (
                <Button variant={variant} onClick={() => setIsOpen(true)} className={className}>
                    {children}
                </Button>
            )}

            <SmartLeadModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialService={service}
            />
        </>
    );
}
