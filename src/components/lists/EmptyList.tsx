import React from 'react';
const EmptyList: React.FC<{ value: string }> = ({ value }) => {
    return (
        <div style={{ width: '99%' }} className="p-1 mt-4">
            <ul className="list-group">
                <li className="mb-4 list-group-item">
                    <p className="text-secondary">No {value} yet.</p>
                </li>
            </ul>
        </div>
    );
};

export default EmptyList;
