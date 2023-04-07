import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Snackbar from "./Snackbar";

afterEach(() => {
    cleanup();
})

describe("Component: Snackbar", () => {
    const mockSnackbar = { open: true, text: "Snackbar test text" };

    test("Snackbar Rendering without open", () => {
        const { container } = render(<Snackbar snackbar={{ ...mockSnackbar, open: false }} severity="error" />);
        const snackbar = container.getElementsByClassName("MuiAlert-message"); 
        expect(snackbar.length).toBe(0);
    });

    test("Snackbar Rendering opened", () => {
        const { container } = render(<Snackbar snackbar={mockSnackbar} severity="error" />);
        const snackbar = container.getElementsByClassName("MuiAlert-message"); 
        expect(snackbar.length).toBe(1);
        expect(snackbar[0].textContent).toBe("Snackbar test text");
    });

    test("Snackbar Rendering opened", () => {
        const { container } = render(<Snackbar snackbar={mockSnackbar} severity="error" />);
        const snackbar = container.getElementsByClassName("MuiAlert-message"); 
        expect(snackbar.length).toBe(1);
        expect(snackbar[0].textContent).toBe("Snackbar test text");
    });

    test("Snackbar Rendering opened with info severity", () => {
        const { container } = render(<Snackbar snackbar={mockSnackbar} severity="info" />);
        const snackbar = container.getElementsByClassName("MuiAlert-standardInfo"); 
        expect(snackbar.length).toBe(1);
    });
});
