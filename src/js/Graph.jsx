import React from 'react';
import {Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {artistsInGraph: new Set(), graph: []};

        this.moveNode = this.moveNode.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.graph.length < nextProps.graph.length) {
            const l = this.state.graph.length;
            const newNodes = nextProps.graph
                .filter(n => !this.state.artistsInGraph.has(n.aid))
                .map((n, i) => {
                        const spacing = 200;
                        const margin = 40;
                        const randX = Math.random() * 30;
                        const randY = Math.random() * 30;
                        n.x = ((l + i) * spacing + margin) % (this.props.size - margin) + randX;
                        n.y = margin + Math.floor((l + i) * spacing / (this.props.size - margin))
                            * spacing + randY;
                        return n;
                    }
                );
            const graph = this.state.graph.concat(newNodes);
            const artistsInGraph = new Set(this.state.artistsInGraph);
            newNodes.forEach(n => {artistsInGraph.add(n.aid)});
            this.setState({graph, artistsInGraph});
        }
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
                    {this.state.graph.map((node) => (
                          <ArtistNode
                              key={node['aid']}
                              aid={node['aid']}
                              onDragged={this.moveNode}
                              x={node.x}
                              y={node.y}
                              radius={30}
                              text={node['name']}/>
                        )
                    )}
                </Layer>
            </Stage>
            </div>
        );
    }
}

export default Graph;