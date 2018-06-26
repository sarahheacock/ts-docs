import * as React from "react";

// typescript ships in JSX modes preserve, react, and react-native
// preserve--preserve JSX and use Babel to transpile
// disallows angle bracket assertion in tsx files
// --> let foo = <foo>bar;
// --> let foo = bar as foo;

// instrinc elements are emitted as strings -- React.createElement("div");
// component you created -- React.createElement(MyComponent);

// INSTRINSIC ELEMENTS
// declare namespace JSX {
//     interface IntrinsicElements {
//         foo: any
//         [elemName: string]: any; --> catch-all
//     }
// }
// <foo />;  ok
// <bar />;  error

// VALUE-BASED
// checks if stateless by user overload resolution
// (1) Stateless Functional Component
// (2) Class Component

// declare namespace JSX {
//     interface ElementAttributesProperty {
//         props; // specify the property name to use
//     }
// }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
interface StatelessProp {
    name: string;
}
function StatelessComp(prop: StatelessProp): JSX.Element {
    return <b>{prop.name}</b>
}

// element class type => Hello
// element instance type => { render: () => void }
export interface HelloProps { compiler: string; framework: string; }
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello <StatelessComp name="Sarah"/>, from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

