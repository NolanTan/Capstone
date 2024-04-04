describe('User Guide in App.jsx', () => {
  it('should have a valid USER_GUIDE link', async () => {
    // Same User Guide constant as the one in App.jsx
    const USER_GUIDE = 'https://nolantan.github.io/Capstone-User-Guide/';

    // Send HEAD request to the USER_GUIDE URL
    const response = await fetch(USER_GUIDE, { method: 'HEAD' });

    // Check if response status code is 200 OK
    expect(response.ok).toBe(true);
  });
});