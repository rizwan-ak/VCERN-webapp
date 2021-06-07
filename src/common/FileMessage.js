import React from 'react';
import icons from './icons';

export default function FileMessage({ message, className, children }) {
    const { url, fileType } = message.files[0];
    const { name } = message.from;
    return (
        <a className={className} href={url} target="_blank" download>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icons.download}
                {`${name} shared a ${fileType?.split('/')[1]} file`}
            </div>
            {children}
        </a>
    );
}
