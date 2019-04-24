"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isChildOf(childState, parentState) {
    var marker = childState;
    while (marker.parent && marker.parent !== parentState) {
        marker = marker.parent;
    }
    return marker === parentState;
}
exports.isChildOf = isChildOf;
function flatten(array) {
    var _a;
    return (_a = []).concat.apply(_a, array);
}
exports.flatten = flatten;
function transitions(stateNode) {
    return flatten(stateNode.ownEvents.map(function (event) {
        return stateNode.definition.on[event];
    }));
}
exports.transitions = transitions;
function condToString(cond) {
    return cond.type;
    // if (typeof cond === "function") {
    //   return cond.toString();
    //   // return cond
    //   //   .toString()
    //   //   .replace(/\n/g, "")
    //   //   .match(/\{(.*)\}/)![1]
    //   //   .trim();
    // }
    // return cond;
}
exports.condToString = condToString;
function friendlyEventName(event) {
    var match = event.match(/^xstate\.after\((.+)\)/);
    if (match) {
        var isMs = Number.isFinite(+match[1]);
        return "after " + match[1] + (isMs ? 'ms' : '');
    }
    match = event.match(/^done\.state/);
    if (match) {
        return "done";
    }
    if (event === '') {
        return 'transient';
    }
    return event;
}
exports.friendlyEventName = friendlyEventName;
function getEventDelay(event) {
    var match = event.match(/^xstate\.after\((.+)\)/);
    if (match) {
        return Number.isFinite(+match[1]) ? +match[1] : match[1];
    }
    return false;
}
exports.getEventDelay = getEventDelay;
function serializeEdge(edge) {
    var cond = edge.cond ? "[" + edge.cond.toString().replace(/\n/g, '') + "]" : '';
    return edge.source.id + ":" + edge.event + cond + "->" + edge.target.id;
}
exports.serializeEdge = serializeEdge;
function isHidden(el) {
    if (!el) {
        return true;
    }
    var rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
        return true;
    }
    return false;
}
exports.isHidden = isHidden;
function relative(childRect, parentElement) {
    var parentRect = parentElement.getBoundingClientRect();
    return {
        top: childRect.top - parentRect.top,
        right: childRect.right - parentRect.left,
        bottom: childRect.bottom - parentRect.top,
        left: childRect.left - parentRect.left,
        width: childRect.width,
        height: childRect.height
    };
}
exports.relative = relative;
function initialStateNodes(stateNode) {
    var stateKeys = Object.keys(stateNode.states);
    return stateNode.initialStateNodes.concat(flatten(stateKeys.map(function (key) {
        var childStateNode = stateNode.states[key];
        if (childStateNode.type === 'compound' ||
            childStateNode.type === 'parallel') {
            return initialStateNodes(stateNode.states[key]);
        }
        return [];
    })));
}
exports.initialStateNodes = initialStateNodes;
function stateActions(stateNode) {
    return stateNode.onEntry.concat(stateNode.onExit);
}
exports.stateActions = stateActions;
function center(rect) {
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}
exports.center = center;
//# sourceMappingURL=utils.js.map