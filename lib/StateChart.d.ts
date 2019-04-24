import React from 'react';
import { Interpreter } from 'xstate/lib/interpreter';
import { StateNode, State, EventObject } from 'xstate';
import * as XState from 'xstate';
interface StateChartProps {
    className: string;
    machine: StateNode<any> | string;
    height?: number | string;
    hideSidebar?: boolean;
}
interface StateChartState {
    machine: StateNode<any>;
    current: State<any, any>;
    preview?: State<any, any>;
    previewEvent?: string;
    view: string;
    code: string;
    toggledStates: Record<string, boolean>;
    service: Interpreter<any>;
    error?: any;
}
export declare class StateChart extends React.Component<StateChartProps, StateChartState> {
    state: StateChartState;
    svgRef: React.RefObject<SVGSVGElement>;
    componentDidMount(): void;
    renderView(): JSX.Element | null;
    updateMachine(code: string): void;
    reset(code?: string, machine?: StateNode<any, any, XState.OmniEventObject<EventObject>>): void;
    render(): JSX.Element;
}
export {};
