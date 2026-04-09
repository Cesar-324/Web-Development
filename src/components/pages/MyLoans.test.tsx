import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import MyLoansPage from "./MyLoans";
import loansReducer from "../../store/loansSlice";

const renderWithProviders = (initialBooks: any[] = []) => {
  const store = configureStore({
    reducer: {
      loans: loansReducer,
    },
    preloadedState: {
      loans: { borrowedBooks: initialBooks },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/my-loans"]}>
        <MyLoansPage />
      </MemoryRouter>
    </Provider>,
  );
};

describe("MyLoansPage Component", () => {
  it("should show a message when there are no borrowed books", () => {
    renderWithProviders([]);

    expect(screen.getByText("My Loans")).toBeInTheDocument();
    expect(
      screen.getByText("You haven't requested any books yet."),
    ).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: /Go to Catalog/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("It should render the books if they exist in the global state", () => {
    const mockBooks = [
      {
        id: "book-123",
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        description: "Una obra maestra de la literatura hispanoamericana.",
        coverUrl: "http://fake-image.com/cien.jpg",
        publishedDate: "1967",
      },
    ];

    renderWithProviders(mockBooks);

    expect(
      screen.queryByText("You haven't requested any books yet."),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Cien Años de Soledad")).toBeInTheDocument();
  });
});
