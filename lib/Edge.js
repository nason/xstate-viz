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
import React, { Component } from "react";
import { serializeEdge, isHidden, relative, center } from "./utils";
import { tracker } from "./tracker";
function maybeGet(value, getter) {
    return value ? getter(value) : undefined;
}
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            eventElement: null,
            sourceElement: null,
            targetElement: null,
            sourceData: tracker.get(_this.props.edge.source.id),
            targetData: tracker.get(_this.props.edge.target.id),
            eventData: tracker.get(serializeEdge(_this.props.edge))
        };
        _this.ref = React.createRef();
        return _this;
    }
    Edge.prototype.componentDidMount = function () {
        var _this = this;
        var edge = this.props.edge;
        var eventId = serializeEdge(edge);
        tracker.listen(eventId, function (data) {
            _this.setState({ eventData: data });
        });
        tracker.listen(edge.source.id, function (data) {
            _this.setState({ sourceData: data });
        });
        tracker.listen(edge.target.id, function (data) {
            var target = edge.target;
            var parentData = data;
            while (isHidden(parentData.element)) {
                if (!target.parent) {
                    break;
                }
                target = target.parent;
                parentData = tracker.get(target.id);
                if (!parentData) {
                    break;
                }
            }
            _this.setState({ targetData: parentData || undefined });
        });
    };
    Edge.prototype.render = function () {
        var edge = this.props.edge;
        var _a = this.state, sourceData = _a.sourceData, eventData = _a.eventData, targetData = _a.targetData;
        if (!sourceData ||
            sourceData.hidden ||
            !eventData ||
            eventData.hidden ||
            !targetData ||
            targetData.hidden) {
            return null;
        }
        var strokeWidth = 2;
        var svgRef = this.props.svg;
        // const sourceRect = relative(
        //   elSource.getBoundingClientRect(),
        //   svgRef.getBoundingClientRect()
        // );
        var eventRect = relative(this.state.eventData.rect, svgRef);
        var targetRect = relative(this.state.targetData.rect, svgRef);
        var eventCenterPt = center(eventRect);
        var targetCenterPt = center(targetRect);
        var start = {
            x: eventRect.right - 4,
            y: eventCenterPt.y
        };
        var end = {
            x: 0,
            y: 0
        };
        var m = (targetCenterPt.y - eventCenterPt.y) /
            (targetCenterPt.x - eventCenterPt.x);
        var b = eventCenterPt.y - m * eventCenterPt.x;
        var endSide;
        var bezierPad = 10;
        if (edge.source === edge.target) {
            endSide = "right";
            end.y = start.y + 10;
            end.x = start.x;
        }
        else {
            if (eventCenterPt.x <= targetCenterPt.x) {
                if (m * targetRect.left + b < targetRect.top) {
                    end.y = targetRect.top;
                    end.x = (end.y - b) / m;
                    endSide = "top";
                }
                else if (m * targetRect.left + b > targetRect.bottom) {
                    end.y = targetRect.bottom;
                    end.x = (end.y - b) / m;
                    endSide = "bottom";
                }
                else {
                    end.x = targetRect.left;
                    end.y = m * end.x + b;
                    endSide = "left";
                }
            }
            else {
                if (m * targetRect.right + b < targetRect.top) {
                    end.y = targetRect.top;
                    end.x = (end.y - b) / m;
                    endSide = "top";
                }
                else if (m * targetRect.right + b > targetRect.bottom) {
                    end.y = targetRect.bottom;
                    end.x = (end.y - b) / m;
                    endSide = "bottom";
                }
                else {
                    end.x = targetRect.right - bezierPad;
                    if (eventCenterPt.y > targetCenterPt.y) {
                        end.y = targetRect.bottom;
                        endSide = "bottom";
                    }
                    else {
                        end.y = targetRect.top;
                        endSide = "top";
                    }
                }
            }
        }
        switch (endSide) {
            case "bottom":
                end.y += 4;
                break;
            case "top":
                end.y -= 4;
                break;
            case "left":
                end.x -= 4;
                break;
            case "right":
                end.x += 4;
                break;
        }
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var preEnd = __assign({}, end);
        var postStart = {
            x: start.x + bezierPad,
            y: Math.abs(dy) > bezierPad
                ? start.x > end.x
                    ? dy > 0
                        ? start.y + bezierPad
                        : start.y - bezierPad
                    : start.y + bezierPad
                : start.y
        };
        var points = [start, postStart];
        if (endSide === "top") {
            preEnd.y = preEnd.y - bezierPad;
        }
        else if (endSide === "bottom") {
            preEnd.y = preEnd.y + bezierPad;
        }
        else if (endSide === "left") {
            preEnd.y = end.y;
            preEnd.x = end.x - bezierPad;
        }
        else if (endSide === "right") {
            preEnd.y = end.y;
            preEnd.x = end.x + bezierPad;
        }
        points.push(preEnd);
        points.push(end);
        var path = points.reduce(function (acc, point, i) {
            if (i === 0) {
                return "M " + point.x + "," + point.y;
            }
            if (i === points.length - 1) {
                return acc + (" L " + point.x + "," + point.y);
            }
            var prevPoint = points[i - 1];
            var nextPoint = points[i + 1];
            if (prevPoint.x === point.x || prevPoint.y === point.y) {
                return acc + (" L " + point.x + "," + point.y);
            }
            // return acc + ` L ${point.x},${point.y}`;
            var dx = point.x - prevPoint.x;
            var dy = point.y - prevPoint.y;
            var nextDx = nextPoint.x - point.x;
            var nextDy = nextPoint.y - point.y;
            var midpoint1 = {
                x: prevPoint.x + dx / 2,
                y: prevPoint.y + dy / 2
            };
            var midpoint2 = {
                x: point.x + nextDx / 2,
                y: point.y + nextDy / 2
            };
            return acc + (" Q " + point.x + "," + point.y + " " + midpoint2.x + "," + midpoint2.y);
        }, "");
        var isHighlighted = this.props.preview;
        return (React.createElement("g", null,
            React.createElement("path", { d: path, stroke: isHighlighted ? "gray" : "var(--color-edge)", strokeWidth: strokeWidth, fill: "none", markerEnd: isHighlighted ? "url(#marker-preview)" : "url(#marker)", ref: this.ref })));
    };
    return Edge;
}(Component));
export { Edge };
