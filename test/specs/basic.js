describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('/');
        expect(browser).toHaveTitle('Movie App');
    });
});
