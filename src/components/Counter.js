import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            limitNumber: 0
        }
    }

    setLimitNumber = (number) => {
        this.setState({limitNumber: number});
    };

    increment = () => {
        const {counter, limitNumber} = this.state;
        if (counter < limitNumber) {
            this.setState({
                counter: counter + 1
            });
        }
    };

    decrement = () => {
        const {counter, limitNumber} = this.state;
        if (counter > limitNumber) {
            this.setState({
                counter: counter - 1
            });
        }
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
