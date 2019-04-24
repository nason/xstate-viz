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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var interpreter_1 = require("xstate/lib/interpreter");
var xstate_1 = require("xstate");
var XState = __importStar(require("xstate"));
var graph_1 = require("xstate/lib/graph");
var StateChartNode_1 = require("./StateChartNode");
var utils_1 = require("./utils");
var Edge_1 = require("./Edge");
var Editor_1 = require("./Editor");
var InitialEdge_1 = require("./InitialEdge");
var StyledViewTab = styled_components_1.default.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"], ["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"])));
var StyledViewTabs = styled_components_1.default.ul(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n"])));
var StyledSidebar = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);\n"], ["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);\n"])));
var StyledView = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  overflow: hidden;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  overflow: hidden;\n"])));
var StyledStateChart = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr 25rem;\n  grid-template-rows: auto;\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n  padding: 1rem;\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n"], ["\n  display: grid;\n  grid-template-columns: 1fr 25rem;\n  grid-template-rows: auto;\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n  padding: 1rem;\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n"])));
var StyledField = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  padding: 0.5rem 1rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n  }\n"], ["\n  padding: 0.5rem 1rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n  }\n"])));
var StyledPre = styled_components_1.default.pre(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  overflow: auto;\n"], ["\n  overflow: auto;\n"])));
function Field(_a) {
    var label = _a.label, children = _a.children, disabled = _a.disabled, style = _a.style;
    return (react_1.default.createElement(StyledField, { style: __assign({}, style, (disabled ? { opacity: 0.5 } : undefined)) },
        react_1.default.createElement("label", null, label),
        children));
}
function toMachine(machine) {
    if (typeof machine !== 'string') {
        return machine;
    }
    var createMachine;
    try {
        createMachine = new Function('Machine', 'interpret', 'assign', 'XState', machine);
    }
    catch (e) {
        throw e;
    }
    var resultMachine;
    var machineProxy = function (config, options, ctx) {
        resultMachine = xstate_1.Machine(config, options, ctx);
        console.log(resultMachine);
        return resultMachine;
    };
    createMachine(machineProxy, interpreter_1.interpret, xstate_1.assign, XState);
    return resultMachine;
}
var StyledVisualization = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: relative;\n  max-height: inherit;\n  overflow-y: auto;\n"], ["\n  position: relative;\n  max-height: inherit;\n  overflow-y: auto;\n"])));
var StyledStateViewActions = styled_components_1.default.ul(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  list-style: none;\n"], ["\n  margin: 0;\n  padding: 0;\n  list-style: none;\n"])));
var StyledStateViewAction = styled_components_1.default.li(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  white-space: nowrap;\n  overflow-x: auto;\n"], ["\n  white-space: nowrap;\n  overflow-x: auto;\n"])));
var StateChart = /** @class */ (function (_super) {
    __extends(StateChart, _super);
    function StateChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = (function () {
            var machine = toMachine(_this.props.machine);
            // const machine = this.props.machine;
            return {
                current: machine.initialState,
                preview: undefined,
                previewEvent: undefined,
                view: 'definition',
                machine: machine,
                code: typeof _this.props.machine === 'string'
                    ? _this.props.machine
                    : "Machine(" + JSON.stringify(machine.config, null, 2) + ")",
                toggledStates: {},
                service: interpreter_1.interpret(machine, {}).onTransition(function (current) {
                    _this.setState({ current: current }, function () {
                        if (_this.state.previewEvent) {
                            _this.setState({
                                preview: _this.state.service.nextState(_this.state.previewEvent)
                            });
                        }
                    });
                })
            };
        })();
        _this.svgRef = react_1.default.createRef();
        return _this;
    }
    StateChart.prototype.componentDidMount = function () {
        this.state.service.start();
    };
    StateChart.prototype.renderView = function () {
        var _this = this;
        var _a = this.state, view = _a.view, current = _a.current, machine = _a.machine, code = _a.code;
        switch (view) {
            case 'definition':
                return (react_1.default.createElement(Editor_1.Editor, { code: this.state.code, onChange: function (code) { return _this.updateMachine(code); } }));
            case 'state':
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { style: { overflowY: 'auto' } },
                        react_1.default.createElement(Field, { label: "Value" },
                            react_1.default.createElement(StyledPre, null, JSON.stringify(current.value, null, 2))),
                        react_1.default.createElement(Field, { label: "Context", disabled: !current.context }, current.context !== undefined ? (react_1.default.createElement(StyledPre, null, JSON.stringify(current.context, null, 2))) : null),
                        react_1.default.createElement(Field, { label: "Actions", disabled: !current.actions.length }, !!current.actions.length && (react_1.default.createElement(StyledPre, null, JSON.stringify(current.actions, null, 2))))),
                    react_1.default.createElement(Field, { label: "Event", style: {
                            marginTop: 'auto',
                            borderTop: '1px solid #777',
                            flexShrink: 0,
                            background: 'var(--color-sidebar)'
                        } },
                        react_1.default.createElement(Editor_1.Editor, { height: "5rem", code: '{type: ""}', changeText: "Send event", onChange: function (code) {
                                try {
                                    var eventData = eval("(" + code + ")");
                                    _this.state.service.send(eventData);
                                }
                                catch (e) {
                                    console.error(e);
                                    alert('Unable to send event.\nCheck the console for more info.');
                                }
                            } }))));
            default:
                return null;
        }
    };
    StateChart.prototype.updateMachine = function (code) {
        var machine;
        try {
            machine = toMachine(code);
        }
        catch (e) {
            console.error(e);
            alert('Error: unable to update the machine.\nCheck the console for more info.');
            return;
        }
        this.reset(code, machine);
    };
    StateChart.prototype.reset = function (code, machine) {
        var _this = this;
        if (code === void 0) { code = this.state.code; }
        if (machine === void 0) { machine = this.state.machine; }
        this.state.service.stop();
        this.setState({
            code: code,
            machine: machine,
            current: machine.initialState
        }, function () {
            _this.setState({
                service: interpreter_1.interpret(_this.state.machine)
                    .onTransition(function (current) {
                    _this.setState({ current: current }, function () {
                        if (_this.state.previewEvent) {
                            _this.setState({
                                preview: _this.state.service.nextState(_this.state.previewEvent)
                            });
                        }
                    });
                })
                    .start()
            }, function () {
                console.log(_this.state.service);
            });
        });
    };
    StateChart.prototype.render = function () {
        var _this = this;
        var _a = this.state, current = _a.current, preview = _a.preview, previewEvent = _a.previewEvent, machine = _a.machine, code = _a.code;
        var edges = graph_1.getEdges(machine);
        var stateNodes = machine.getStateNodes(current);
        var events = new Set();
        stateNodes.forEach(function (stateNode) {
            var potentialEvents = Object.keys(stateNode.on);
            potentialEvents.forEach(function (event) {
                var transitions = stateNode.on[event];
                transitions.forEach(function (transition) {
                    if (transition.target !== undefined) {
                        events.add(event);
                    }
                });
            });
        });
        return (react_1.default.createElement(StyledStateChart, { className: this.props.className, key: code, style: {
                height: this.props.height || '100%',
                background: 'var(--color-app-background)',
                // @ts-ignore
                '--color-app-background': '#FFF',
                '--color-border': '#dedede',
                '--color-primary': 'rgba(87, 176, 234, 1)',
                '--color-primary-faded': 'rgba(87, 176, 234, 0.5)',
                '--color-primary-shadow': 'rgba(87, 176, 234, 0.1)',
                '--color-link': 'rgba(87, 176, 234, 1)',
                '--color-disabled': '#c7c5c5',
                '--color-edge': 'rgba(0, 0, 0, 0.2)',
                '--color-secondary': 'rgba(255,152,0,1)',
                '--color-secondary-light': 'rgba(255,152,0,.5)',
                '--color-sidebar': '#272722',
                '--radius': '0.2rem',
                '--border-width': '2px'
            } },
            react_1.default.createElement(StyledVisualization, null,
                react_1.default.createElement(StateChartNode_1.StateChartNode, { stateNode: this.state.machine, current: current, preview: preview, onReset: this.reset.bind(this), onEvent: this.state.service.send.bind(this), onPreEvent: function (event) {
                        return _this.setState({
                            preview: _this.state.service.nextState(event),
                            previewEvent: event
                        });
                    }, onExitPreEvent: function () {
                        return _this.setState({ preview: undefined, previewEvent: undefined });
                    }, toggledStates: this.state.toggledStates }),
                react_1.default.createElement("svg", { width: "100%", height: "100%", style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        // @ts-ignore
                        '--color': 'gray',
                        overflow: 'visible',
                        pointerEvents: 'none'
                    }, ref: this.svgRef, key: JSON.stringify(this.state.toggledStates) },
                    react_1.default.createElement("defs", null,
                        react_1.default.createElement("marker", { id: "marker", markerWidth: "4", markerHeight: "4", refX: "2", refY: "2", markerUnits: "strokeWidth", orient: "auto" },
                            react_1.default.createElement("path", { d: "M0,0 L0,4 L4,2 z", fill: "var(--color-edge)" })),
                        react_1.default.createElement("marker", { id: "marker-preview", markerWidth: "4", markerHeight: "4", refX: "2", refY: "2", markerUnits: "strokeWidth", orient: "auto" },
                            react_1.default.createElement("path", { d: "M0,0 L0,4 L4,2 z", fill: "gray" }))),
                    edges.map(function (edge) {
                        if (!_this.svgRef.current) {
                            return;
                        }
                        // const svgRect = this.svgRef.current.getBoundingClientRect();
                        return (react_1.default.createElement(Edge_1.Edge, { key: utils_1.serializeEdge(edge), svg: _this.svgRef.current, edge: edge, preview: edge.event === previewEvent &&
                                current.matches(edge.source.path.join('.')) &&
                                !!preview &&
                                preview.matches(edge.target.path.join('.')) }));
                    }),
                    utils_1.initialStateNodes(machine).map(function (initialStateNode, i) {
                        if (!_this.svgRef.current) {
                            return;
                        }
                        // const svgRect = this.svgRef.current.getBoundingClientRect();
                        return (react_1.default.createElement(InitialEdge_1.InitialEdge, { key: initialStateNode.id + "_" + i, source: initialStateNode, svgRef: _this.svgRef.current, preview: current.matches(initialStateNode.path.join('.')) ||
                                (!!preview &&
                                    preview.matches(initialStateNode.path.join('.'))) }));
                    }))),
            !this.props.hideSidebar && react_1.default.createElement(StyledSidebar, null,
                react_1.default.createElement(StyledViewTabs, null, ['definition', 'state'].map(function (view) {
                    return (react_1.default.createElement(StyledViewTab, { onClick: function () { return _this.setState({ view: view }); }, key: view, "data-active": _this.state.view === view || undefined }, view));
                })),
                react_1.default.createElement(StyledView, null, this.renderView()))));
    };
    return StateChart;
}(react_1.default.Component));
exports.StateChart = StateChart;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=StateChart.js.map