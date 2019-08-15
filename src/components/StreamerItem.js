import React, {Component} from 'react';
import styled from 'styled-components';
import {findWithAttr, limitLoop} from '../utils/common';
import Counter from "./Counter";

const LineWrapper = styled.div`
  display: block;
  position: absolute;
  top: ${props => props.top}px;
  width: 100%;
  transition: all 1s ease-out;
  background: #fff;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
`;
const ItemNumber = styled.div`
  width: 30px;
  text-align: center;
  align-self: center;
`;
const ItemStreamerInfo = styled.div`
  flex-grow: 2;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const ItemStreamerInfoAvatar = styled.div`
  background-image: url(${props => props.picturePath});
  background-size: 100%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-self: center;
`;
const ItemStreamInfoName = styled.div`
  align-self: center;
  padding-left: 5px;
`;
const ItemScore = styled.div`
  flex-grow: 1;
  width: 30px;
  text-align: right;
  align-self: center;
`;

class StreamerItem extends Component {
    constructor(props) {
        super(props);
        const {item} = this.props;
        this.counterRef = React.createRef();
        this.state = {
            item: this.bindStream(item)
        };
    }

    componentDidUpdate(prevProps) {
        /**
         * When streamersDataLive has changed, we will get new index by userId and change rank position
         */
        const {streamersDataLive} = this.props;
        if (prevProps.streamersDataLive !== streamersDataLive) {
            const {item} = this.state;
            const {userID} = item;
            // Find index by userId
            const index = findWithAttr(streamersDataLive, 'userID', userID);
            const newItem = streamersDataLive[index];
            const newScore = newItem.score;

            // Get old score
            const indexOldScore = findWithAttr(streamersDataLive, 'userID', userID);
            const oldItem = streamersDataLive[indexOldScore];
            const currentScore = oldItem.score;

            // Re update item with new item score apply
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({item: this.bindStream(newItem)});

            // Set max limit
            console.log("---------");
            console.log('new score:', newScore);
            console.log('current score:', currentScore);
            // this.counterRef.current.setLimitNumber(newScore);
            if (newScore > currentScore) {
                // Counter up
                limitLoop(this.counterRef.current.increment, 30);
            } else {
                // Counter down
                limitLoop(this.counterRef.current.decrement, 30);
            }
        }
    }

    /**
     * By item, this function will recalculation the parameters with new item score updated
     * @param item
     * @returns {*}
     */
    bindStream = (item) => {
        const {streamersDataLive} = this.props;

        // Find index by userID
        const index = findWithAttr(streamersDataLive, 'userID', item.userID);
        // Get new item by new index
        const newItem = streamersDataLive[index];

        // Add or update fields
        newItem.positionTop = this.getPositionByIndex(index);
        newItem.position = index + 1;
        return newItem;
    };

    /**
     * Get position to margin top display
     * @param index
     * @returns {number}
     */
    getPositionByIndex = index => {
        return index * 46; // Item height, default = 46
    };

    render() {
        const {item} = this.state;
        return (
            <LineWrapper top={item.positionTop}>
                <ItemWrapper>
                    <ItemNumber>{item.position}</ItemNumber>
                    <ItemStreamerInfo>
                        <ItemStreamerInfoAvatar picturePath={item.picture}/>
                        <ItemStreamInfoName>{item.displayName}</ItemStreamInfoName>
                    </ItemStreamerInfo>
                    <ItemScore>
                        <Counter ref={this.counterRef}/>
                    </ItemScore>
                </ItemWrapper>
            </LineWrapper>
        );
    }
}

export default StreamerItem;
