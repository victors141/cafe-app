import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";

import Create, { CREATE_DISH } from "../Create";
import { fakeMenuItem } from "../../utils/testUtils";

jest.mock("../../utils/uploadImage");

describe("<Create/> Component", () => {
  it("handles state updating", async () => {
    render(
      <MockedProvider>
        <Create />
      </MockedProvider>
    );
    const imgFile = new File(["hello"], "hello.png", { type: "image/png" });
    const name = screen.getByLabelText("Name");
    const type = screen.getByLabelText("Type");
    const price = screen.getByLabelText("Price");
    const photo = screen.getByLabelText("Photo");

    userEvent.type(name, "Pizza new york style");
    expect(name).toHaveValue("Pizza new york style");

    userEvent.selectOptions(type, "main-course");
    expect(screen.getByText("Main Course").selected).toBe(true);

    userEvent.type(price, "20");
    expect(price).toHaveValue(20);

    userEvent.upload(photo, imgFile);
    expect(await screen.findByText("Remove")).toBeVisible();
    expect(screen.queryByText("Choose photo")).not.toBeInTheDocument();
  });

  it("creates a new menu item when the form is submitted", async () => {
    const history = createMemoryHistory();
    history.push("/create");
    const item = fakeMenuItem();
    const mocks = [
      {
        request: {
          operationName: "CreateDish",
          query: CREATE_DISH,
          variables: {
            name: item.name,
            photo: item.photo,
            price: item.price,
            type: item.type,
          },
        },
        result: jest.fn(() => ({
          data: {
            insert_dishes: {
              affected_rows: 1,
            },
          },
        })),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <Create />
        </Router>
      </MockedProvider>
    );

    const imgFile = new File(["hello"], item.photo, { type: "image/png" });
    const name = screen.getByLabelText("Name");
    const type = screen.getByLabelText("Type");
    const price = screen.getByLabelText("Price");
    const photo = screen.getByLabelText("Photo");

    userEvent.type(name, item.name);
    userEvent.selectOptions(type, item.type);
    userEvent.type(price, item.price.toString());
    userEvent.upload(photo, imgFile);
    await screen.findByText("Remove");

    userEvent.click(screen.getByText("Save Item"));

    expect(history.location.pathname).toBe("/create");
    await waitFor(() => expect(mocks[0].result).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(history.location.pathname).toBe("/");
  });
});
