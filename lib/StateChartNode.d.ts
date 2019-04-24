import React from 'react';
import { StateNode, State } from 'xstate';
interface StateChartNodeProps {
    stateNode: StateNode;
    current: State<any, any>;
    preview?: State<any, any>;
    onEvent: (event: string) => void;
    onPreEvent: (event: string) => void;
    onExitPreEvent: () => void;
    onReset?: () => void;
    toggledStates: Record<string, boolean>;
}
export declare class StateChartNode extends React.Component<StateChartNodeProps> {
    state: {
        toggled: boolean;
    };
    stateRef: React.RefObject<any>;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
