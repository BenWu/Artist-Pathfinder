import React from 'react';
import {Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const l = this.props.graph.length;
        return (
            <div className='graph' style={{width: this.props.size}}>
            <Stage width={this.props.size} height={this.props.size}>
                <Layer>
                    {this.props.graph.map((artist) => {
                        const spacing = 200;
                        const margin = 40;
                        const randX = Math.random() * 30;
                        const randY = Math.random() * 30;
                        return (
                          <ArtistNode
                              key={artist['aid']}
                              x={(l * spacing + margin) % (this.props.size - margin) + randX}
                              y={margin + Math.floor(l * spacing / (this.props.size - margin))
                              * spacing + randY}
                              radius={30}
                              text={artist['name']}/>
                        );
                    })}
                </Layer>
            </Stage>
            </div>
        );
    }
}

export default Graph;