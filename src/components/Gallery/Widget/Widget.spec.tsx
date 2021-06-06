import { render, act } from "@testing-library/react";
import React from "react";
import {
  textTestkitFactory,
  gridTestkitFactory,
  buttonTestkitFactory,
} from "wix-ui-tpa/dist/src/testkit";
import {
  createSettingsParams,
  SettingsObject,
  testkit,
} from "yoshi-flow-editor/testkit";
import Widget from ".";
import settingsParams from "../settingsParams";

describe("Widget", () => {
  let settings: SettingsObject<any>;

  testkit.beforeAndAfter();

  beforeEach(() => {
    testkit.reset();
    settings = createSettingsParams(settingsParams, {});
  });

  it("renders the widget title", async () => {
    const { TestComponent } = testkit.getWidget(Widget, { settings });
    const { findByTestId } = render(<TestComponent />);
    const baseElement = await findByTestId("gallery-widget");

    const textDriver = textTestkitFactory({
      wrapper: baseElement,
      // Task 1: pass the correct dataHook
      dataHook: "widget-title",
    });

    // Task 2: correct the following expectation
    expect(await textDriver.getContent()).toBe("OOI Gallery");
  });

  it("renders three items in a row", async () => {
    const { TestComponent } = testkit.getWidget(Widget, { settings });
    const { findByTestId } = render(<TestComponent />);
    const baseElement = await findByTestId("gallery-widget");

    // Task 3: use the relevant testkit
    const gridDriver = gridTestkitFactory({
      wrapper: baseElement,
      dataHook: "pictures-grid",
    });
    expect(await gridDriver.itemsPerRow()).toBe(3);
  });

  it('renders the "loading more" button on startup by default', async () => {
    const { TestComponent } = testkit.getWidget(Widget, { settings });
    const { findByTestId } = render(<TestComponent />);
    const baseElement = await findByTestId("gallery-widget");

    // Task 3: use the relevant testkit
    const buttonDriver = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: "load-more-btn",
    });
    expect(await buttonDriver.exists()).toBe(true);
  });

  it('hides the "loading more" button after loading all items by clicking it', async () => {
    const { TestComponent } = testkit.getWidget(Widget, { settings });
    const { findByTestId } = render(<TestComponent />);
    const baseElement = await findByTestId("gallery-widget");

    // Task 3: use the relevant testkit
    const buttonDriver = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: "load-more-btn",
    });

    expect(await buttonDriver.exists()).toBe(true);
    await buttonDriver.click();

    act(async () => {
      expect(await buttonDriver.exists()).toBe(false);
    });
  });
});
