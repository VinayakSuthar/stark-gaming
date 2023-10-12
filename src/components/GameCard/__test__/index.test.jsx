import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import GameCard from '..';

const mockHandleStatusChange = vi.fn(() => null);

const MockGameCard = () => {
  const gameData = {
    id: 3489,
    background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
    name: 'GTA V',
    genres: [{ name: 'Action' }],
  };
  return (
    <BrowserRouter>
      <GameCard
        data={gameData}
        buttonValue="Want to Play"
        isSelected={() => null}
        onStatusChange={mockHandleStatusChange}
      />
    </BrowserRouter>
  );
};

describe('Game card component', () => {
  it('should render game card correctly', () => {
    render(<MockGameCard />);
    const image = screen.getByRole('img');
    const gameTitle = screen.getByRole('heading');
    const gameGenre = screen.getByText(/action/i);
    const wantToPlayButton = screen.getByRole('button');
    expect(wantToPlayButton).toHaveTextContent(/want to play/i);
    expect(gameGenre).toBeInTheDocument();
    expect(gameTitle).toHaveTextContent('GTA V');
    expect(image).toBeInTheDocument();
  });

  it("should able to click 'Want to play' button", async () => {
    render(<MockGameCard />);
    const wantToPlayButton = screen.getByRole('button');
    await userEvent.click(wantToPlayButton);
    expect(mockHandleStatusChange).toHaveBeenCalledTimes(1);
  });
});
