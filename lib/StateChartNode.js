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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("./utils");
var tracker_1 = require("./tracker");
var graph_1 = require("xstate/lib/graph");
var Button_1 = require("./Button");
var StyledChildStates = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--color-border);\n  display: flex;\n  padding-bottom: 1rem;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  min-height: 1rem;\n"], ["\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--color-border);\n  display: flex;\n  padding-bottom: 1rem;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  min-height: 1rem;\n"])));
var StyledChildStatesToggle = styled_components_1.default.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  appearance: none;\n  display: inline-flex;\n  height: 1rem;\n  width: 1rem;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n\n  &:not(:hover) {\n    opacity: 0.5;\n  }\n\n  &:before {\n    --dot-size: 3px;\n    content: '';\n    display: block;\n    height: var(--dot-size);\n    width: var(--dot-size);\n    border-radius: 50%;\n    background: var(--toggle-color, gray);\n    flex-shrink: 0;\n    box-shadow: calc(-1 * (var(--dot-size) + 1px)) 0 var(--toggle-color, gray),\n      calc(var(--dot-size) + 1px) 0 var(--toggle-color, gray);\n  }\n\n  &:focus {\n    outline: none;\n  }\n"], ["\n  appearance: none;\n  display: inline-flex;\n  height: 1rem;\n  width: 1rem;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n\n  &:not(:hover) {\n    opacity: 0.5;\n  }\n\n  &:before {\n    --dot-size: 3px;\n    content: '';\n    display: block;\n    height: var(--dot-size);\n    width: var(--dot-size);\n    border-radius: 50%;\n    background: var(--toggle-color, gray);\n    flex-shrink: 0;\n    box-shadow: calc(-1 * (var(--dot-size) + 1px)) 0 var(--toggle-color, gray),\n      calc(var(--dot-size) + 1px) 0 var(--toggle-color, gray);\n  }\n\n  &:focus {\n    outline: none;\n  }\n"])));
var StyledStateNodeHeader = styled_components_1.default.header(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 1;\n  padding: 0.25rem 0;\n  bottom: calc(100% + var(--border-width, 0));\n  left: calc(-1 * var(--border-width));\n  display: flex;\n  flex-direction: row;\n\n  &:before {\n    display: none;\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background: var(--color-app-background);\n  }\n\n  &[data-type-symbol='history' i] {\n    --symbol-color: orange;\n  }\n\n  &[data-type-symbol] {\n    padding-right: 5em;\n\n    &:after {\n      content: attr(data-type-symbol);\n      position: absolute;\n      top: 0;\n      right: 0;\n      border-bottom-left-radius: 0.25rem;\n      background: var(--symbol-color, gray);\n      color: white;\n      padding: 0.25rem 0.5rem;\n      font-weight: bold;\n      font-size: 0.75em;\n    }\n  }\n"], ["\n  position: absolute;\n  z-index: 1;\n  padding: 0.25rem 0;\n  bottom: calc(100% + var(--border-width, 0));\n  left: calc(-1 * var(--border-width));\n  display: flex;\n  flex-direction: row;\n\n  &:before {\n    display: none;\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background: var(--color-app-background);\n  }\n\n  &[data-type-symbol='history' i] {\n    --symbol-color: orange;\n  }\n\n  &[data-type-symbol] {\n    padding-right: 5em;\n\n    &:after {\n      content: attr(data-type-symbol);\n      position: absolute;\n      top: 0;\n      right: 0;\n      border-bottom-left-radius: 0.25rem;\n      background: var(--symbol-color, gray);\n      color: white;\n      padding: 0.25rem 0.5rem;\n      font-weight: bold;\n      font-size: 0.75em;\n    }\n  }\n"])));
var StyledStateNode = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  --color-shadow: rgba(0, 0, 0, 0.05);\n  --color-node-border: var(--color-border);\n  position: relative;\n  display: inline-block;\n  border-radius: 0.25rem;\n  text-align: left;\n  border: 2px solid var(--color-node-border);\n  margin: 1rem;\n  flex-grow: 0;\n  flex-shrink: 1;\n  box-shadow: 0 0.5rem 1rem var(--color-shadow);\n  background: white;\n  color: #313131;\n  min-height: 1rem;\n\n  &[data-type~='machine'] {\n    border: none;\n    box-shadow: none;\n    width: 100%;\n    background: none;\n    margin: 2rem 0;\n\n    > ", " {\n      left: 1rem;\n      font-size: 1rem;\n    }\n\n    > ul {\n      padding-right: 1.5rem;\n    }\n  }\n  &:not([data-type~='machine']) {\n    // opacity: 0.75;\n  }\n\n  &:not([data-open='true']) > ", " > * {\n    display: none;\n  }\n\n  ", " {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n  }\n\n  &[data-type~='machine'] > ", " {\n    display: none;\n  }\n\n  &[data-active] {\n    --color-node-border: var(--color-primary);\n    --color-shadow: var(--color-primary-shadow);\n    opacity: 1;\n\n    > ", " {\n      color: var(--color-primary);\n    }\n\n    > ", " {\n      --toggle-color: var(--color-primary);\n    }\n  }\n\n  &[data-preview]:not([data-active]) {\n    --color-node-border: var(--color-primary-faded);\n  }\n\n  &[data-type~='parallel']\n    > ", "\n    > *:not(", ") {\n    border-style: dashed;\n  }\n\n  &[data-type~='final'] {\n    &:after {\n      content: '';\n      position: absolute;\n      top: -5px;\n      left: -5px;\n      width: calc(100% + 10px);\n      height: calc(100% + 10px);\n      border: 2px solid var(--color-node-border);\n      pointer-events: none;\n      border-radius: 6px;\n      z-index: 1;\n    }\n  }\n\n  &:before {\n    content: attr(data-key);\n    color: transparent;\n    visibility: hidden;\n    height: 1px;\n    display: block;\n  }\n"], ["\n  --color-shadow: rgba(0, 0, 0, 0.05);\n  --color-node-border: var(--color-border);\n  position: relative;\n  display: inline-block;\n  border-radius: 0.25rem;\n  text-align: left;\n  border: 2px solid var(--color-node-border);\n  margin: 1rem;\n  flex-grow: 0;\n  flex-shrink: 1;\n  box-shadow: 0 0.5rem 1rem var(--color-shadow);\n  background: white;\n  color: #313131;\n  min-height: 1rem;\n\n  &[data-type~='machine'] {\n    border: none;\n    box-shadow: none;\n    width: 100%;\n    background: none;\n    margin: 2rem 0;\n\n    > ", " {\n      left: 1rem;\n      font-size: 1rem;\n    }\n\n    > ul {\n      padding-right: 1.5rem;\n    }\n  }\n  &:not([data-type~='machine']) {\n    // opacity: 0.75;\n  }\n\n  &:not([data-open='true']) > ", " > * {\n    display: none;\n  }\n\n  ", " {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n  }\n\n  &[data-type~='machine'] > ", " {\n    display: none;\n  }\n\n  &[data-active] {\n    --color-node-border: var(--color-primary);\n    --color-shadow: var(--color-primary-shadow);\n    opacity: 1;\n\n    > ", " {\n      color: var(--color-primary);\n    }\n\n    > ", " {\n      --toggle-color: var(--color-primary);\n    }\n  }\n\n  &[data-preview]:not([data-active]) {\n    --color-node-border: var(--color-primary-faded);\n  }\n\n  &[data-type~='parallel']\n    > ", "\n    > *:not(", ") {\n    border-style: dashed;\n  }\n\n  &[data-type~='final'] {\n    &:after {\n      content: '';\n      position: absolute;\n      top: -5px;\n      left: -5px;\n      width: calc(100% + 10px);\n      height: calc(100% + 10px);\n      border: 2px solid var(--color-node-border);\n      pointer-events: none;\n      border-radius: 6px;\n      z-index: 1;\n    }\n  }\n\n  &:before {\n    content: attr(data-key);\n    color: transparent;\n    visibility: hidden;\n    height: 1px;\n    display: block;\n  }\n"])), StyledStateNodeHeader, StyledChildStates, StyledChildStatesToggle, StyledChildStatesToggle, StyledStateNodeHeader, StyledChildStatesToggle, StyledChildStates, StyledChildStatesToggle);
var StyledEvents = styled_components_1.default.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 0;\n  margin: 0.5rem 0;\n  list-style: none;\n\n  &:empty {\n    display: none;\n  }\n"], ["\n  padding: 0;\n  margin: 0.5rem 0;\n  list-style: none;\n\n  &:empty {\n    display: none;\n  }\n"])));
var StyledStateNodeActions = styled_components_1.default.ul(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 0.5rem;\n"], ["\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 0.5rem;\n"])));
var StyledEvent = styled_components_1.default.li(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  list-style: none;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: flex-end;\n\n  &:not(:last-child) {\n    margin-bottom: 0.25rem;\n  }\n\n  &[data-disabled] > ", " {\n    opacity: 0.7;\n  }\n"], ["\n  list-style: none;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: flex-end;\n\n  &:not(:last-child) {\n    margin-bottom: 0.25rem;\n  }\n\n  &[data-disabled] > ", " {\n    opacity: 0.7;\n  }\n"])), StyledStateNodeActions);
var StyledEventButton = styled_components_1.default.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  --color-event: var(--color-primary);\n  position: relative;\n  appearance: none;\n  background-color: var(--color-event);\n  border: none;\n  color: white;\n  font-size: 0.75em;\n  font-weight: bold;\n  padding: 0.25rem 0.25rem 0.25rem 0.5rem;\n  cursor: pointer;\n  border-radius: 2rem;\n  line-height: 1;\n  display: inline-flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-right: -0.5rem;\n  margin-left: 0.5rem;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n\n  &:not(:disabled):not([data-builtin]):hover {\n    --color-event: var(--color-primary);\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    --color-event: var(--color-disabled);\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  // duration\n  &[data-delay]:not([disabled]) {\n    &:before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: var(--color-event);\n      animation: move-left calc(var(--delay) * 1ms) linear;\n      z-index: 0;\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes move-left {\n    from {\n      transform: translateX(-100%);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  &[data-builtin] {\n    background-color: transparent;\n    color: black;\n    font-style: italic;\n  }\n"], ["\n  --color-event: var(--color-primary);\n  position: relative;\n  appearance: none;\n  background-color: var(--color-event);\n  border: none;\n  color: white;\n  font-size: 0.75em;\n  font-weight: bold;\n  padding: 0.25rem 0.25rem 0.25rem 0.5rem;\n  cursor: pointer;\n  border-radius: 2rem;\n  line-height: 1;\n  display: inline-flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-right: -0.5rem;\n  margin-left: 0.5rem;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n\n  &:not(:disabled):not([data-builtin]):hover {\n    --color-event: var(--color-primary);\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    --color-event: var(--color-disabled);\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  // duration\n  &[data-delay]:not([disabled]) {\n    &:before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: var(--color-event);\n      animation: move-left calc(var(--delay) * 1ms) linear;\n      z-index: 0;\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes move-left {\n    from {\n      transform: translateX(-100%);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  &[data-builtin] {\n    background-color: transparent;\n    color: black;\n    font-style: italic;\n  }\n"])));
var StyledStateNodeAction = styled_components_1.default.li(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 1rem;\n  list-style: none;\n  padding: 0 0.5rem;\n  margin: 0;\n\n  &[data-guard] {\n    &:before,\n    &:after {\n      font-weight: bold;\n    }\n    &:before {\n      content: '[';\n      margin-right: 0.5ch;\n    }\n    &:after {\n      content: ']';\n      margin-left: 0.5ch;\n    }\n  }\n\n  &[data-action-type]:before {\n    content: attr(data-action-type) ' / ';\n    margin-right: 0.5ch;\n    font-weight: bold;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 1rem;\n  list-style: none;\n  padding: 0 0.5rem;\n  margin: 0;\n\n  &[data-guard] {\n    &:before,\n    &:after {\n      font-weight: bold;\n    }\n    &:before {\n      content: '[';\n      margin-right: 0.5ch;\n    }\n    &:after {\n      content: ']';\n      margin-left: 0.5ch;\n    }\n  }\n\n  &[data-action-type]:before {\n    content: attr(data-action-type) ' / ';\n    margin-right: 0.5ch;\n    font-weight: bold;\n  }\n"])));
var StyledEventDot = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  height: 0.5rem;\n  width: 0.5rem;\n  border-radius: 50%;\n  background-color: white;\n  margin-left: 0.5rem;\n\n  &:before {\n    content: '';\n    position: absolute;\n    top: -0.25rem;\n    left: -0.25rem;\n    width: calc(100% + 0.5rem);\n    height: calc(100% + 0.5rem);\n    border-radius: 50%;\n    background-color: var(--color-event);\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: white;\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n  height: 0.5rem;\n  width: 0.5rem;\n  border-radius: 50%;\n  background-color: white;\n  margin-left: 0.5rem;\n\n  &:before {\n    content: '';\n    position: absolute;\n    top: -0.25rem;\n    left: -0.25rem;\n    width: calc(100% + 0.5rem);\n    height: calc(100% + 0.5rem);\n    border-radius: 50%;\n    background-color: var(--color-event);\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: white;\n  }\n"])));
var StateChartNode = /** @class */ (function (_super) {
    __extends(StateChartNode, _super);
    function StateChartNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toggled: true
        };
        _this.stateRef = react_1.default.createRef();
        return _this;
    }
    StateChartNode.prototype.componentDidUpdate = function () {
        tracker_1.tracker.update(this.props.stateNode.id, this.stateRef.current);
    };
    StateChartNode.prototype.render = function () {
        var _this = this;
        var _a = this.props, stateNode = _a.stateNode, current = _a.current, preview = _a.preview, onEvent = _a.onEvent, onPreEvent = _a.onPreEvent, onExitPreEvent = _a.onExitPreEvent, onReset = _a.onReset;
        var isActive = !stateNode.parent ||
            current.matches(stateNode.path.join('.')) ||
            undefined;
        var isPreview = preview
            ? preview.matches(stateNode.path.join('.')) || undefined
            : undefined;
        var dataType = stateNode.parent
            ? stateNode.type
            : "machine " + stateNode.type;
        return (react_1.default.createElement(StyledStateNode, { key: stateNode.id, "data-key": stateNode.key, "data-id": stateNode.id, "data-type": dataType, "data-active": isActive && stateNode.parent, "data-preview": isPreview && stateNode.parent, "data-open": this.state.toggled || undefined, ref: this.stateRef },
            react_1.default.createElement(StyledStateNodeHeader, { style: {
                    // @ts-ignore
                    '--depth': stateNode.path.length
                } },
                react_1.default.createElement("strong", null, stateNode.key),
                stateNode.path.length === 0 ? (react_1.default.createElement(Button_1.StyledButton, { "data-variant": "reset", onClick: onReset ? function () { return onReset(); } : undefined }, "Reset")) : null),
            !!utils_1.stateActions(stateNode).length && (react_1.default.createElement(StyledStateNodeActions, null,
                stateNode.definition.onEntry.map(function (action) {
                    var actionString = action.type;
                    return (react_1.default.createElement(StyledStateNodeAction, { key: actionString, "data-action-type": "entry" }, actionString));
                }),
                stateNode.definition.onExit.map(function (action) {
                    var actionString = action.type;
                    return (react_1.default.createElement(StyledStateNodeAction, { key: actionString, "data-action-type": "exit" }, actionString));
                }))),
            react_1.default.createElement(StyledEvents, null, graph_1.getEdges(stateNode, { depth: 0 }).map(function (edge) {
                var ownEvent = edge.event;
                var isBuiltInEvent = ownEvent.indexOf('xstate.') === 0 ||
                    ownEvent.indexOf('done.') === 0 ||
                    ownEvent === '';
                var disabled = !isActive || current.nextEvents.indexOf(ownEvent) === -1;
                // || (!!edge.cond &&
                //   typeof edge.cond === 'function' &&
                //   !edge.cond(current.context, { type: ownEvent }, { cond: undefined, }));
                var cond = edge.cond
                    ? "[" + edge.cond.toString().replace(/\n/g, '') + "]"
                    : '';
                var delay = isBuiltInEvent ? utils_1.getEventDelay(ownEvent) : false;
                if (typeof delay === 'string') {
                    var delayExpr = stateNode.machine.options.delays[delay];
                    delay =
                        typeof delayExpr === 'number'
                            ? delayExpr
                            : delayExpr(current.context, current.event);
                }
                return (react_1.default.createElement(StyledEvent, { style: {
                        //@ts-ignore
                        '--delay': delay || 0
                    }, "data-disabled": disabled || undefined, key: utils_1.serializeEdge(edge) },
                    react_1.default.createElement(StyledEventButton, { onClick: function () {
                            return !isBuiltInEvent ? onEvent(ownEvent) : undefined;
                        }, onMouseOver: function () { return onPreEvent(ownEvent); }, onMouseOut: function () { return onExitPreEvent(); }, disabled: disabled, "data-delay": edge.transition
                            .delay, "data-builtin": isBuiltInEvent || undefined, "data-id": utils_1.serializeEdge(edge), title: ownEvent },
                        react_1.default.createElement("span", null, utils_1.friendlyEventName(ownEvent)),
                        react_1.default.createElement(StyledEventDot, null)),
                    !!(edge.transition.actions.length || edge.transition.cond) && (react_1.default.createElement(StyledStateNodeActions, null,
                        edge.transition.cond && (react_1.default.createElement(StyledStateNodeAction, { "data-guard": true }, utils_1.condToString(edge.transition.cond))),
                        edge.transition.actions.map(function (action, i) {
                            var actionString = action.type;
                            return (react_1.default.createElement(StyledStateNodeAction, { "data-action-type": "do", key: actionString + ':' + i }, actionString));
                        })))));
            })),
            Object.keys(stateNode.states).length ? (react_1.default.createElement(StyledChildStates, null, Object.keys(stateNode.states || []).map(function (key) {
                var childStateNode = stateNode.states[key];
                return (react_1.default.createElement(StateChartNode, { stateNode: childStateNode, current: current, preview: preview, key: childStateNode.id, onEvent: onEvent, onPreEvent: onPreEvent, onExitPreEvent: onExitPreEvent, toggledStates: _this.props.toggledStates }));
            }))) : null,
            Object.keys(stateNode.states).length > 0 ? (react_1.default.createElement(StyledChildStatesToggle, { title: this.state.toggled ? 'Hide children' : 'Show children', onClick: function (e) {
                    e.stopPropagation();
                    _this.setState({ toggled: !_this.state.toggled }, function () {
                        tracker_1.tracker.updateAll();
                    });
                } })) : null));
    };
    return StateChartNode;
}(react_1.default.Component));
exports.StateChartNode = StateChartNode;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=StateChartNode.js.map