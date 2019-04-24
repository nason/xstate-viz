import { Component } from 'react';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
interface EditorProps {
    code: string;
    onChange?: (code: string) => void;
    height?: number | string;
    changeText?: string;
}
export declare class Editor extends Component<EditorProps> {
    state: {
        code: string;
    };
    render(): JSX.Element;
}
export {};
