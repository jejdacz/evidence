import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";

import { Field, renderInput, showValidation } from "./hocForm.js";

const inputWithValidation = showValidation({
  valid: "valid",
  invalid: "invalid"
})(renderInput);

describe("Field component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Field name="firstName" type="text" component={inputWithValidation} />,
      {
        context: {
          formContext: {
            values: { firstName: "John" },
            errors: { firstName: "error" },
            touched: { firstName: true },
            handleBlur: jest.fn(),
            handleChange: jest.fn()
          }
        },
        childContextTypes: { formContext: PropTypes.object }
      }
    );
  });

  it("should have <input> element with correct properties", () => {
    console.log(wrapper.html());
    expect(wrapper.find("input").length).toEqual(1);
    expect(wrapper.find("input")).toHaveProp("name", "firstName");
    expect(wrapper.find("input")).toHaveProp("type", "text");
    expect(wrapper.find("input")).toHaveProp("className", "invalid");
    expect(wrapper.find("input")).toHaveProp("value", "John");
    expect(wrapper.find(renderInput)).toHaveProp("error", "error");
    expect(wrapper.find(renderInput)).toHaveProp("touched", true);
  });
});
