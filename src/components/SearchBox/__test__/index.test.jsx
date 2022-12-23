import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import useAxios from "../../../hooks/useAxios";
import { BrowserRouter } from "react-router-dom";
import SearchBox from "..";

vi.mock("../../../hooks/useAxios.js");

const MocKSearchBox = () => {
  return (
    <BrowserRouter>
      <SearchBox />
    </BrowserRouter>
  );
};

describe("Search Box component", () => {
  it("should render search box correctly", () => {
    render(<MocKSearchBox />);
    const searchInput = screen.getByRole("textbox");
    const resultBox = screen.getByText(/search games/i);

    expect(searchInput).toBeInTheDocument();
    expect(resultBox).toBeInTheDocument();
  });

  it("should not show result for less than 3 characters", async () => {
    render(<MocKSearchBox />);
    const searchInput = screen.getByRole("textbox");
    const resultBox = screen.getByText(/search games/i);

    await userEvent.type(searchInput, "ab");
    expect(resultBox).toBeInTheDocument();
  });

  it("should show result after 3 characters", async () => {
    useAxios.mockReturnValue({
      get: vi.fn().mockResolvedValue({
        data: {
          count: 1,
          results: [
            { id: 1, name: "God of War", genres: [{ name: "Action" }] },
            { id: 2, name: "God of War 2", genres: [{ name: "Adventure" }] },
          ],
        },
      }),
    });
    render(<MocKSearchBox />);
    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "god");

    await waitFor(
      async () => {
        const result = await screen.findByText("God of War");
        expect(result).toBeVisible();
      },
      { timeout: 1000 }
    );
  });

  it("should show no result found", async () => {
    useAxios.mockReturnValue({
      get: vi.fn().mockResolvedValue({
        data: {
          count: 0,
          results: [],
        },
      }),
    });
    render(<MocKSearchBox />);
    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "god");

    await waitFor(
      async () => {
        const result = await screen.findByText("No Result Found");
        expect(result).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should show error message", async () => {
    useAxios.mockReturnValue({
      get: vi.fn().mockRejectedValue(new Error("error")),
    });
    render(<MocKSearchBox />);
    const searchInput = screen.getByRole("textbox");
    await userEvent.type(searchInput, "god");
    const result = await screen.findByText(
      "An error ocurred. Please try again later"
    );

    expect(result).toBeInTheDocument();
  });
});
