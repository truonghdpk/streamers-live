import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    increment = () => {
        const {counter} = this.state;
        this.setState({
            counter: counter + 1
        });
    };

    render() {
        const {counter} = this.state;
        return (
            <div>
                {counter}pt
            </div>
        )
    }
}

export default Counter;
