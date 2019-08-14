import React, {Component} from "react";
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  transition: all 0.3s ease 0s;
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
    render() {
        const item = this.props.item;
        return (
            <ItemWrapper>
                <ItemNumber>
                    {this.props.position + 1}
                </ItemNumber>
                <ItemStreamerInfo>
                    <ItemStreamerInfoAvatar picturePath={item.picture}/>
                    <ItemStreamInfoName>{item.displayName}</ItemStreamInfoName>
                </ItemStreamerInfo>
                <ItemScore>
                    {item.score}pt
                </ItemScore>
            </ItemWrapper>
        )
    }
}

export default StreamerItem
