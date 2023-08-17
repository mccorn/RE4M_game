import React from 'react';
import { render, screen } from '@testing-library/react';

const appContent = 'Вот тут будет жить ваше приложение :)';

// eslint-disable-next-line
test('Example test', async () => {
    render(<>`Вот тут будет жить ваше приложение :)`</>);
    // eslint-disable-next-line
    expect(screen.getByText(appContent)).toBeDefined();
});
