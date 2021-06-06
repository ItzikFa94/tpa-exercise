import {
  createStylesParams,
  StyleParamType,
  wixColorParam,
} from "yoshi-flow-editor/tpa-settings";

type IStylesParams = {
  buttonBackgroundColor: StyleParamType.Color;
  buttonBorderRadius: StyleParamType.Number;
};

export default createStylesParams<IStylesParams>({
  buttonBackgroundColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam("color-8"),
  },
  buttonBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 20,
  },
});
