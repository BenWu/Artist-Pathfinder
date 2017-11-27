import React from 'react';
import {Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: 1000};
    }

    render() {
        return (
            <div className='graph' style={{width: this.state.size}}>
            <Stage width={this.state.size} height={this.state.size}>
                <Layer>
                    <ArtistNode x={50} y={50} radius={30}
                                text={'Test 1'}/>

                    <ArtistNode x={250} y={250} radius={30}
                                text={'Test 2'}/>
                </Layer>
            </Stage>
            </div>
        );
    }
}

export default Graph;