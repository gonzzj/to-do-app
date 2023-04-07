import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Component: Loading", () => {

    test("Loading Rendering", () => {
        const { container } = render(<Loading />);
        expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });
});
