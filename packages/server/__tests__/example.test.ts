const magic = '🪄';

const cast = (spell: string, item: any) => {
    if (spell.startsWith(magic)) {
        return '🐷';
    }
    return item;
};

// eslint-disable-next-line
test('spell casting', () => {
    const result = cast(magic, '🐸');
    // eslint-disable-next-line
    expect(result).toBe('🐷');
});
