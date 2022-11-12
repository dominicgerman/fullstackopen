import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

describe("NewBlogForm component tests", () => {
  test("form calls the event handler it receives as props with the right details when a new blog is created", async () => {
    const mockHandler = jest.fn();
    const { container } = render(<NewBlogForm createBlog={mockHandler} />);
    const user = userEvent.setup();
    const button = container.querySelector(".submitButton");
    const titleInput = container.querySelector(".titleInput");
    const authorInput = container.querySelector(".authorInput");
    const urlInput = container.querySelector(".urlInput");

    await user.type(titleInput, "this is a test title");
    await user.type(authorInput, "this is a test author");
    await user.type(urlInput, "this is a test url");
    await user.click(button);

    expect(mockHandler.mock.calls[0][0].title).toBe("this is a test title");
    expect(mockHandler.mock.calls[0][0].author).toBe("this is a test author");
    expect(mockHandler.mock.calls[0][0].url).toBe("this is a test url");
  });
});
