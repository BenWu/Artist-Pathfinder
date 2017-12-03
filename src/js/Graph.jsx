import React from 'react';
import {Arrow, Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

const NODE_SIZE = 30;

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {artistsInGraph: new Set(), nodes: [], edges: [], nodeCoords: {}};

    this.moveNode = this.moveNode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.graph.length === 0) {
      this.setState({artistsInGraph: new Set(), nodes: [], edges: [], nodeCoords: {}});
    } else if (this.props.graph.length < nextProps.graph.length) {
      const l = this.state.nodes.length;
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
      const nodes = this.state.nodes.concat(newNodes);
      const artistsInGraph = new Set(this.state.artistsInGraph);
      const nodeCoords = this.state.nodeCoords;
      newNodes.forEach(n => {
        artistsInGraph.add(n.aid);
        nodeCoords[n.aid] = {x: n.x, y: n.y};
      });
      this.setState({nodes, artistsInGraph}, this.updateEdges);
    }
  }

  updateEdges() {
    const edges = [];
    this.state.nodes.forEach(n => {
      n.related
        .filter(aid => this.state.artistsInGraph.has(aid))
        .forEach(relAid => {
          let startX = n.x + NODE_SIZE;
          let startY = n.y + NODE_SIZE;
          let endX = this.state.nodeCoords[relAid].x + NODE_SIZE;
          let endY = this.state.nodeCoords[relAid].y + NODE_SIZE;
          const theta = Math.atan2((endY - startY), (endX - startX));
          endX = endX - (NODE_SIZE + 3) * Math.cos(theta) - startX;
          endY = endY - (NODE_SIZE + 3) * Math.sin(theta) - startY;
          edges.push({
            startAid: n.aid, endAid: relAid,
            startX, startY,
            endX, endY,
          });
        });
    });
    this.setState({edges});
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
            {this.state.edges.map(edge => (
              <Arrow
                key={`${edge.startAid}-${edge.endAid}`}
                x={edge.startX}
                y={edge.startY}
                points={[0, 0, edge.endX, edge.endY]}
                pointerLength={8}
                pointerWidth={8}
                fill={'#ffcf3b'}
                stroke={'#ffcf3b'}
                strokeWidth={2}
              />
            ))}
            {this.state.nodes.map(node => (
              <ArtistNode
                key={node['aid']}
                aid={node['aid']}
                onDragged={this.moveNode}
                x={node.x}
                y={node.y}
                radius={NODE_SIZE}
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