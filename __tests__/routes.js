import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

jest.mock("axios");

describe("LoginForm", () => {
  it("redirects to /userProfiles and makes backend post request to /api/login", async () => {
    // Mock the backend post request
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    // Render the LoginForm inside the MemoryRouter
    const { getByLabelText, getByText, history } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate user interaction by filling the form and submitting it

    //todo: restructure to match frontend structure
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testytesttest" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Wait for the redirection and backend request to complete
    await waitFor(() => {
      expect(history.location.pathname).toBe("/userProfiles");
      expect(axios.post).toHaveBeenCalledWith("/api/login", {
        username: "testytesttest",
        password: "password123",
      });
    });
  });
});
