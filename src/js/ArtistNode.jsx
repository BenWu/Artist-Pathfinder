import React from 'react';
import {Circle, Group, Text} from 'react-konva';

class ArtistNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        const radius = this.props.radius;
        return (
            <Group draggable='true'>
                <Circle x={this.state.x + radius}
                         y={this.state.y + radius}
                         radius={this.props.radius}
                         fill={'#e48100'}
                         stroke={'#a85c00'}
                         strokeWidth={2}/>
                <Text x={this.state.x + radius - this.props.text.length * 3}
                      y={this.state.y - 14}
                      text={this.props.text}
                      fill={'#ffffff'}
                      fontSize={14}/>
            </Group>
        );
    }
}

export default ArtistNode;