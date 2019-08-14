import React, {Component} from "react";
import styled from 'styled-components';
import StreamerItem from "../components/StreamerItem";
import Data from '../data/data';

const BoardWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;   
`;

class StreamerBoard extends Component {
    state = {
        streamersData: Data,
        streamersDataLive: Data,
        randomMax: 10,
        randomMin: 0
    };


    componentDidMount() {
        setInterval(() => {
            this.runRandom();
        }, 3000);
    }

    getRandomInt = () => {
        return Math.floor(Math.random() * (this.state.randomMax - this.state.randomMin + 1) + this.state.randomMin);
    };

    getRandomArray = () => {
        return [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()];
    };

    runRandom = () => {
        const maxRandomNumber = 200000;
        const streamerUpdate = this.getRandomArray();

        this.setState(state => {
            // Update all item with new random score number
            const list = state.streamersDataLive.map((item, index) => {
                // Just update when belong streamerUpdate array
                if (streamerUpdate.indexOf(index) !== -1) {
                    item.score = Math.floor(Math.random() * Math.floor(maxRandomNumber));
                    return item
                } else {
                    return item;
                }
            });

            // Sort by desc
            const newSorted = list.sort((a, b) => {
                return b.score - a.score
            });

            return {
                streamersDataLive: newSorted,
            };
        });
    };

    render() {
        return (
            <BoardWrapper>
                {this.state.streamersData.map((item, index) => {
                    return <StreamerItem streamersDataLive={this.state.streamersDataLive} item={item}
                                         key={index}/>
                })}
            </BoardWrapper>
        );
    }
}

export default StreamerBoard
