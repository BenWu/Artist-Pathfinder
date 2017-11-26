import React from 'react';
import {Layer, Rect, Stage} from 'react-konva';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: 'green'};
    }

    render() {
        return (
            <Stage width={700} height={700}>
                <Layer>
                    <Rect
                        x={10}
                        y={10}
                        width={50}
                        height={50}
                        fill={this.state.color}
                        shadowBlur={5}
                        onClick={() => {
                            this.setState({color: window.Konva.Util.getRandomColor()});
                        }}
                    />
                </Layer>
            </Stage>
        );
    }
}

export default Graph;