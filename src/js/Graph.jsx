import React from 'react';
import {Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.moveNode = this.moveNode.bind(this);
    }

    moveNode(aid, e) {
        //console.log('\n\n');
        //console.log(aid);
        //console.log(e);
    }

    render() {
        return (
            <div className='graph' style={{width: this.props.size}}>
            <Stage width={this.props.size} height={this.props.size}>
                <Layer>
                    {this.props.graph.map((artist, i) => {
                        const spacing = 200;
                        const margin = 40;
                        const randX = Math.random() * 30;
                        const randY = Math.random() * 30;
                        return (
                          <ArtistNode
                              key={artist['aid']}
                              aid={artist['aid']}
                              onDragged={this.moveNode}
                              x={(i * spacing + margin) % (this.props.size - margin) + randX}
                              y={margin + Math.floor(i * spacing / (this.props.size - margin)) * spacing + randY}
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