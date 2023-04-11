import React from 'react';

const PeepDisplay = ({ peeps }) => {
    // Sort the peeps by creation time in descending order
    const sortedPeeps = peeps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            <h2>Peeps</h2>
            <ul>
                {sortedPeeps.map((peep) => (
                    <li key={peep._id}>
                        {peep.description} - {new Date(peep.createdAt).toLocaleString()} - peeped by {peep.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PeepDisplay;
