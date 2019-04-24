"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_ace_1 = __importDefault(require("react-ace"));
require("brace/theme/monokai");
require("brace/mode/javascript");
var Button_1 = require("./Button");
var styled_components_1 = __importDefault(require("styled-components"));
var StyledEditor = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem 0 0 1rem;\n"], ["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem 0 0 1rem;\n"])));
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            code: _this.props.code
        };
        return _this;
    }
    Editor.prototype.render = function () {
        var _this = this;
        var code = this.state.code;
        var _a = this.props, onChange = _a.onChange, _b = _a.height, height = _b === void 0 ? '100%' : _b, _c = _a.changeText, changeText = _c === void 0 ? 'Update' : _c;
        return (react_1.default.createElement(StyledEditor, null,
            react_1.default.createElement(react_ace_1.default, { mode: "javascript", theme: "monokai", editorProps: { $blockScrolling: true }, value: code, onChange: function (value) { return _this.setState({ code: value }); }, setOptions: { tabSize: 2, fontSize: '12px' }, width: "100%", height: height, showGutter: false, readOnly: !onChange }),
            onChange ? (react_1.default.createElement(Button_1.StyledButton, { onClick: function () { return onChange(_this.state.code); } }, changeText)) : null));
    };
    return Editor;
}(react_1.Component));
exports.Editor = Editor;
var templateObject_1;
//# sourceMappingURL=Editor.js.map