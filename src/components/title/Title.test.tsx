import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Title from "./Title";

afterEach(() => {
    cleanup();
})

beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query !== '(min-width: 240px)',
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn()
    }));
});

describe("Component: Title", () => {
    const setFlagDarkTheme = jest.fn();

    test("Title Rendering", () => {
        render(<Title flagDarkTheme={false} setFlagDarkTheme={setFlagDarkTheme} />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('TO DO APP')
    });

    test("Title Button on light mode", () => {
        render(<Title flagDarkTheme={false} setFlagDarkTheme={setFlagDarkTheme} />);
        expect(screen.getByRole('button')).toHaveTextContent('Dark mode');
        expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
    });

    test("Title Button on dark mode", () => {
        render(<Title flagDarkTheme={true} setFlagDarkTheme={setFlagDarkTheme} />);
        expect(screen.getByRole('button')).toHaveTextContent('Light mode');
        expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
    });

    test("Title Button click to change theme mode", () => {
        render(<Title flagDarkTheme={true} setFlagDarkTheme={setFlagDarkTheme} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

       expect(setFlagDarkTheme).toHaveBeenCalled();
    });
});
