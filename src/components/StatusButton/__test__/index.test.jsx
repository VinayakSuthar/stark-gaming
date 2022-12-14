import { render, screen, fireEvent } from "@testing-library/react";
import StatusButton from "..";

const MockStatusButton = () => {
  return (
    <StatusButton
      gameData={{
        gameId: 1234,
        name: "GTA V",
        background_image: "any",
        genres: [{ name: "Action" }],
      }}
    />
  );
};

describe("Status button component", () => {
  it("should render status button correctly", () => {
    render(<MockStatusButton />);
    const statusButton = screen.getByTestId("active-status");
    expect(statusButton).toBeInTheDocument();
  });

  it("on hover show status list", () => {
    render(<MockStatusButton />);

    const dropdown = screen.getByTestId("dropdown");
    const dropdownContent = screen.getByTestId("dropdown-content");
    fireEvent.mouseOver(dropdown);
    expect(dropdownContent).toBeVisible();
  });

  it("should have four buttons", () => {
    render(<MockStatusButton />);

    const buttonList = screen.getAllByRole("button");
    expect(buttonList).toHaveLength(4);
  });

  it("should not have check icon", () => {
    render(<MockStatusButton />);

    const checkIcon = screen.queryByTestId("check-icon");
    expect(checkIcon).not.toBeInTheDocument();
  });

  it("on click should show check icon", () => {
    render(<MockStatusButton />);

    const statusButton = screen.getByTestId("active-status");
    fireEvent.click(statusButton);
    const checkIcon = screen.queryByTestId("check-icon");
    expect(checkIcon).toBeInTheDocument();
  });
});
