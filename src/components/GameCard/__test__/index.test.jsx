import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import GameCard from "..";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => null),
    },
    writable: true,
  });
});

const MockGameCard = () => {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  function addGameToWishlist(id) {
    if (wishlist.includes(id)) {
      const newList = wishlist.filter((item) => item !== id);
      setWishlist(newList);
    } else {
      setWishlist((previousList) => [...previousList, id]);
    }
  }

  const gameData = {
    id: 3489,
    background_image:
      "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    name: "GTA V",
    genres: [{ name: "Action" }],
  };
  return (
    <BrowserRouter>
      <GameCard
        gameData={gameData}
        addGameToWishlist={addGameToWishlist}
        wishlist={wishlist}
      />
    </BrowserRouter>
  );
};

describe("Game card component", () => {
  it("should render game card correctly", () => {
    render(<MockGameCard />);
    const image = screen.getByRole("img");
    const gameTitle = screen.getByRole("heading");
    const gameGenre = screen.getByText(/action/i);
    const wantToPlayButton = screen.getByRole("button");
    expect(wantToPlayButton).toHaveTextContent(/want to play/i);
    expect(gameGenre).toBeInTheDocument();
    expect(gameTitle).toHaveTextContent("GTA V");
    expect(image).toBeInTheDocument();
  });

  it("should able to click 'Want to play' button", () => {
    render(<MockGameCard />);
    const wantToPlayButton = screen.getByRole("button");
    userEvent.click(wantToPlayButton);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});
