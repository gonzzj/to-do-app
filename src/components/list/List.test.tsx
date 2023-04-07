import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import List from "./List";

afterEach(() => {
    cleanup();
})

describe("Component: List", () => {
    const handleToggle = jest.fn();
    const mockTasks = [
        {
            id: 0,
            completed: false,
            text: "New test task 01"
        },
        {
            id: 1,
            completed: true,
            text: "New test task 02"
        },
        {
            id: 2,
            completed: false,
            text: "New test task 03"
        }
    ];

    test("List Rendering", () => {
        const { container } = render(<List tasks={mockTasks} handleToggle={handleToggle} />);
        expect(container.querySelectorAll('.MuiListItem-root')).toHaveLength(3);
        expect(container.querySelectorAll('.MuiListItem-root')).not.toHaveLength(1);
    });

    test("List check completed", () => {
        render(<List tasks={mockTasks} handleToggle={handleToggle} />);
        expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(1);
        expect(screen.getAllByRole('checkbox', { checked: true })).not.toHaveLength(3);
    });

    test("List check uncompleted", () => {
        render(<List tasks={mockTasks} handleToggle={handleToggle} />);
        expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(2);
        expect(screen.getAllByRole('checkbox', { checked: false })).not.toHaveLength(1);
    });

    test("List text on third list", () => {
        const { container } = render(<List tasks={mockTasks} handleToggle={handleToggle} />);
        expect(container.querySelectorAll('.MuiListItemText-root')[2]).toHaveTextContent("New test task 03");
    });

    test("List handle toggle", () => {
        render(<List tasks={mockTasks} handleToggle={handleToggle} />);
        fireEvent.click(screen.getAllByRole('checkbox')[2]);
        expect(handleToggle).toBeCalled();
    });
});
