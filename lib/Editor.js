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
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import { StyledButton } from './Button';
import styled from 'styled-components';
var StyledEditor = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem 0 0 1rem;\n"], ["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem 0 0 1rem;\n"])));
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
        return (React.createElement(StyledEditor, null,
            React.createElement(AceEditor, { mode: "javascript", theme: "monokai", editorProps: { $blockScrolling: true }, value: code, onChange: function (value) { return _this.setState({ code: value }); }, setOptions: { tabSize: 2, fontSize: '12px' }, width: "100%", height: height, showGutter: false, readOnly: !onChange }),
            onChange ? (React.createElement(StyledButton, { onClick: function () { return onChange(_this.state.code); } }, changeText)) : null));
    };
    return Editor;
}(Component));
export { Editor };
var templateObject_1;
