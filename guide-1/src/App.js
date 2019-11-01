import React, {Profiler} from 'react';
import ReactDOM from 'react-dom';


// ------------------- import() or  code-slitting -------------------
import {add as foo} from './math';

console.log(foo);

import('./math').then(math => {
    console.log(math.add(10, 20));
});

// ------------------- Context -------------------
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar/>
                <Popup/>
                <MyProfiler/>
            </ThemeContext.Provider>
        );
    }
}

function Toolbar() {
    return <ThemedButton/>;
}

function ThemedButton() { // use class components with static context declaration
    // Assign a contextType to read the current theme context.
    // static contextType = ThemeContext;

    // render() {

    return (
        <ThemeContext.Consumer>
            {(value) => (
                <button>
                    {value}
                </button>
            )}
        </ThemeContext.Consumer>
    )
    // }
}


// ------------------- Portals -------------------
class MyPortal extends React.Component {
    el = document.createElement('div');

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

class Popup extends React.Component {
    render() {
        return (
            <MyPortal>MyPortal</MyPortal>
        )
    }
}

// ------------------- Profiler -------------------

class MyProfiler extends React.Component {
    render() {
        const callback = (id, // the "id" prop of the Profiler tree that has just committed
                          phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
                          actualDuration, // time spent rendering the committed update
                          baseDuration, // estimated time to render the entire subtree without memoization
                          startTime, // when React began rendering this update
                          commitTime, // when React committed this update
                          interactions)=>{
            console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions);
        };

        return (
            <Profiler id="test" onRender={callback}>
                <ThemedButton/>
            </Profiler>
        )
    }

}

export default App;
