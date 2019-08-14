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
        streamersData: Data, // Origin data just using for first loop
        streamersDataLive: Data, // Live data, always update
        randomMax: 9, // Index of array by max streamer
        randomMin: 0 // Index of array by min streamer
    };

    componentDidMount() {
        // Run random function every 3 seconds
        setInterval(() => {
            this.runRandom();
        }, 3000);
    }

    /**
     * Get random number by max and min number
     * @returns {number}
     */
    getRandomInt = () => {
        return Math.floor(Math.random() * (this.state.randomMax - this.state.randomMin + 1) + this.state.randomMin);
    };

    /**
     * Get array number random list streamer will be update score
     * @returns {*[]}
     */
    getRandomArray = () => {
        return [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()];
    };

    /**
     * Run update score by random number and sort by desc before return
     */
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
            // After update new score let sort it by desc
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
                    return <StreamerItem streamersDataLive={this.state.streamersDataLive} item={item} key={index}/>
                })}
            </BoardWrapper>
        );
    }
}

export default StreamerBoard
