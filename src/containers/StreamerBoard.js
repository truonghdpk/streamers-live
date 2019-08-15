import React, {Component} from 'react';
import styled from 'styled-components';
import StreamerItem from '../components/StreamerItem';
import Data from '../data/data';
import {limitLoop} from '../utils/common';

const BoardWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;
`;

class StreamerBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamersData: Data, // Origin data just using for first loop
            streamersDataLive: Data, // Live data, always update
            randomMax: 9, // Index of array by max streamer
            randomMin: 0 // Index of array by min streamer
        };
    }

    componentDidMount() {
        // Hit runRandom every 3 seconds to change score of streamers
        limitLoop(this.runRandom, 0, 3000);
    }

    /**
     * Get random number by max and min number
     * @returns {number}
     */
    getRandomInt = () => {
        const {randomMax, randomMin} = this.state;
        return Math.floor(Math.random() * (randomMax - randomMin + 1) + randomMin);
    };

    /**
     * Get array number random list streamer will be update score
     * @returns {*[]}
     */
    getRandomArray = () => {
        return [
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt()
        ];
    };

    /**
     * Run update score by random number and sort by desc before return
     */
    runRandom = () => {
        const maxRandomNumber = 200000;
        const streamerUpdate = this.getRandomArray();
        let assignItem;
        this.setState(state => {
            // Update all item with new random score number
            const list = state.streamersDataLive.map((item, index) => {
                // Just update when belong streamerUpdate array
                if (streamerUpdate.indexOf(index) !== -1) {
                    assignItem = { ...item}; // Same as object assign
                    assignItem.score = Math.floor(Math.random() * Math.floor(maxRandomNumber));
                    return assignItem;
                }
                return item;
            });
            // After update new score let sort it by desc
            const newSorted = list.sort((a, b) => {
                return b.score - a.score;
            });
            return {
                streamersDataLive: newSorted
            };
        });
    };

    render() {
        const {streamersData, streamersDataLive} = this.state;
        return (
            <BoardWrapper>
                {streamersData.map((item) => {
                    return (
                        <StreamerItem
                            streamersDataLive={streamersDataLive}
                            item={item}
                            key={item.userID}
                        />
                    );
                })}
            </BoardWrapper>
        );
    }
}

export default StreamerBoard;
