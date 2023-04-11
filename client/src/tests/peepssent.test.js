import React from 'react';
import { render } from '@testing-library/react';
import PeepDisplay from '../components/PeepDisplay';

describe('PeepDisplay component', () => {

    it('should render without errors', () => {
        render(<PeepDisplay peeps={[]} />);
    });

    it('should render the correct number of peeps', () => {
        const peeps = [
            { _id: '1', description: 'Peep 1', createdAt: '2023-04-07T12:00:00.000Z', username: 'user1' },
            { _id: '2', description: 'Peep 2', createdAt: '2023-04-07T11:00:00.000Z', username: 'user2' },
            { _id: '3', description: 'Peep 3', createdAt: '2023-04-07T10:00:00.000Z', username: 'user3' },
        ];
        const { getAllByRole } = render(<PeepDisplay peeps={peeps} />);
        const peepItems = getAllByRole('listitem');
        expect(peepItems.length).toBe(peeps.length);
    });
});