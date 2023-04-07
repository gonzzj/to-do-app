import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Input from "./Input";

afterEach(() => {
    cleanup();
})

describe("Component: Input", () => {
    const onSubmitInput = jest.fn(); 

    test("Input Rendering", () => {
        render(<Input onSubmitInput={onSubmitInput} error={false} />); 
        const input = screen.getByPlaceholderText("Create a new To Do"); 
        expect(input).toBeInTheDocument(); 
    });

    test("Input with validation", () => {
        render(<Input onSubmitInput={onSubmitInput} error={true} />); 
        const helperText = screen.getByText("You have to write something in order to add new task");
        expect(helperText).toBeInTheDocument(); 
    });

    test("Input change text", () => {
        render(<Input onSubmitInput={onSubmitInput} error={false} />); 
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: 'New test task 05'}});
        expect(input.getAttribute('value')).toBe('New test task 05');
        fireEvent.change(input, {target: {value: ''}});
        expect(input.getAttribute('value')).toBe('');
    });

    test("Input submit", () => {
        render(<Input onSubmitInput={onSubmitInput} error={false} />); 
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(onSubmitInput).toHaveBeenCalled(); 
    });
});
