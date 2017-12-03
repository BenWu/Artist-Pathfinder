import React from 'react';
import {Circle, Group, Text} from 'react-konva';

class ArtistNode extends React.Component {
    render() {
        const radius = this.props.radius;
        return (
            <Group draggable='true'
                   onDragMove={(e) => {this.props.onDragged(this.props.aid, e)}}>
                <Circle x={this.props.x + radius}
                         y={this.props.y + radius}
                         radius={this.props.radius}
                         fill={'#e48100'}
                         stroke={'#a85c00'}
                         strokeWidth={2}/>
                <Text x={this.props.x + radius - this.props.text.length * 3}
                      y={this.props.y - 14}
                      text={this.props.text}
                      fill={'#ffffff'}
                      fontSize={14}/>
            </Group>
        );
    }
}

export default ArtistNode;