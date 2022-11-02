import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Note component rendering tests", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "some guy",
    url: "someurl.com",
    likes: 79,
    user: "632a58f24b7bc5a1de3ad850",
  };

  //   const element = screen.queryByText('display: none')

  test("renders title and author but NOT likes or URL (by default)", () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector(".blogDisplay");
    const hiddenContent = container.querySelector(".hiddenByDefault");

    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(hiddenContent).toHaveStyle("display: none");
  });

  test("after clicking the button, likes and url are displayed", async () => {
    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = container.querySelector(".toggleView");
    await user.click(button);
    const postClickDiv = container.querySelector(".hiddenByDefault");

    expect(postClickDiv).not.toHaveStyle("display: none");
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    const mockHandler = jest.fn();

    const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />);

    const user = userEvent.setup();
    const button = container.querySelector(".likeButton");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
