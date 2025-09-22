import React from 'react';

export const DuckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18.5 9.5c0-3.5-2.5-6-5.5-6s-5.5 2.5-5.5 6c0 2.5 1.5 4.5 3.5 5.5" />
        <path d="M12 15s-2 2-2 4h4c0-2-2-4-2-4z" />
        <path d="M21 12c-1.5 0-2.5-1-2.5-2.5S19.5 7 21 7" />
        <path d="M14 19c-2 1.5-4 1.5-6 0" />
    </svg>
);
