import React, {Component} from "react";
import styled from 'styled-components';
import CountUp from 'react-countup';

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

    getPositionByIndex = (index) => {
        return index * 46; // Item height = 42
    };

    findWithAttr = (array, attr, value) => {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };

    bindStream = (item, scoreEnd = null) => {
        const streamersDataLive = this.props.streamersDataLive;

        // Find index by userID
        const index = this.findWithAttr(streamersDataLive, "userID", item.userID);
        // Get new item by new index
        const newItem = streamersDataLive[index];

        // Add position field
        newItem.positionTop = this.getPositionByIndex(index);
        newItem.position = index + 1;
        newItem.scoreStart = scoreEnd ? scoreEnd : newItem.scoreEnd;
        newItem.scoreEnd = newItem.score;

        return newItem;
    };

    state = {
        item: this.bindStream(this.props.item)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * When streamersDataLive has changed, we will get new index by userId and change rank position
         */
        if (prevProps.streamersDataLive !== this.props.streamersDataLive) {
            const userID = this.state.item.userID;
            // Find index by userId
            const index = this.findWithAttr(this.props.streamersDataLive, "userID", userID);
            const newItem = this.props.streamersDataLive[index];

            // Get old score
            const indexOldScore = this.findWithAttr(prevProps.streamersDataLive, "userID", userID);
            const oldItem = prevProps.streamersDataLive[indexOldScore];
            const scoreEnd = oldItem.scoreEnd;

            this.setState({item: this.bindStream(newItem, scoreEnd)})
        }
    }

    render() {
        const item = this.state.item;
        return (
            <LineWrapper top={item.positionTop}>
                <ItemWrapper>
                    <ItemNumber>
                        {item.position}
                    </ItemNumber>
                    <ItemStreamerInfo>
                        <ItemStreamerInfoAvatar picturePath={item.picture}/>
                        <ItemStreamInfoName>{item.displayName}</ItemStreamInfoName>
                    </ItemStreamerInfo>
                    <ItemScore>
                        <CountUp duration={2} start={item.scoreStart} end={item.scoreEnd} suffix={"pt"}>
                        </CountUp>
                    </ItemScore>
                </ItemWrapper>
            </LineWrapper>
        )
    }
}

export default StreamerItem
