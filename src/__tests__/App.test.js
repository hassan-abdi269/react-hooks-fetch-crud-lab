import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App';

const mockQuestions = [
  {
    id: 1,
    prompt: 'lorem testum 1',
    answers: ['a', 'b', 'c', 'd'],
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: 'lorem testum 2',
    answers: ['e', 'f', 'g', 'h'],
    correctIndex: 1,
  },
];

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.endsWith('/questions')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockQuestions),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('displays all questions after loading', async () => {
  render(<App />);

  // Wait for the questions to be loaded
  await waitFor(() => {
    // This should now work as the elements are properly rendered
    expect(screen.getByText(/lorem testum 1/i)).toBeInTheDocument();
    expect(screen.getByText(/lorem testum 2/i)).toBeInTheDocument();
  });

  // Optional: Verify that fetch was called
  expect(global.fetch).toHaveBeenCalledWith('/questions');
});
