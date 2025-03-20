import React from 'react';

export interface ButtonProps {
    children?: React.ReactNode;
}

document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
        
        .button {
            min-width: 100px;
            height: 32px;
            background: #9988FF;
            border: 1px solid #443377;
            border-radius: 4px;
            color: #443377;
            font-size: 14px;
            line-height: 14px;
            font-family: 'Roboto', serif;
        }
        
        .button:hover {
            background: #7766EE;
        }
        
        .button:focus {
            outline: 2px solid #FFFF77;
            outline-offset: -2px;
        }
        
    </style>`,
);

export const Button = React.memo(({children}: ButtonProps) => {
    return <button className="button">{children}</button>;
});
