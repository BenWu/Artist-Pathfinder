import React from 'react';
import {Arrow, Layer, Stage} from 'react-konva';

import ArtistNode from './ArtistNode.jsx';

const NODE_SIZE = 30;

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {artistsInGraph: new Set(), nodes: [], edges: [], nodeCoords: {}};

    this.moveNode = this.moveNode.bind(this);
    this.updateEdges = this.updateEdges.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.path.length !== this.props.path.length) {
      this.updateEdges();
    }
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
          const aid = n.aid;
          const nodeCoords = this.state.nodeCoords;
          let startX = nodeCoords[aid].x + NODE_SIZE;
          let startY = nodeCoords[aid].y + NODE_SIZE;
          let endX = nodeCoords[relAid].x + NODE_SIZE;
          let endY = nodeCoords[relAid].y + NODE_SIZE;
          const theta = Math.atan2((endY - startY), (endX - startX));
          endX = endX - (NODE_SIZE + 3) * Math.cos(theta) - startX;
          endY = endY - (NODE_SIZE + 3) * Math.sin(theta) - startY;
          let highlighted = false;
          const path = this.props.path;
          if (path && path.length) {
            for (let i = 0 ; i < path.length - 1 ; i++) {
              if (path[i] === aid && path[i + 1] === relAid) {
                highlighted = true;
                break;
              }
            }
          }
          edges.push({
            startAid: n.aid, endAid: relAid,
            startX, startY,
            endX, endY,
            highlighted,
          });
        });
    });
    this.setState({edges});
  }

  moveNode(aid, e) {
    const nodeCoords = this.state.nodeCoords;
    nodeCoords[aid].x = nodeCoords[aid].x + e.evt.movementX;
    nodeCoords[aid].y = nodeCoords[aid].y + e.evt.movementY;
    this.setState({nodeCoords}, this.updateEdges);
  }

  render() {
    return (
      <div className='graph' style={{width: this.props.size}}>
        <Stage width={this.props.size} height={this.props.size * 1.5}>
          <Layer>
            {this.state.edges.map(edge => (
              <Arrow
                key={`${edge.startAid}-${edge.endAid}`}
                x={edge.startX}
                y={edge.startY}
                points={[0, 0, edge.endX, edge.endY]}
                pointerLength={8}
                pointerWidth={8}
                fill={'#000000'}
                stroke={edge.highlighted ? '#ffff00' : '#008ee4'}
                strokeWidth={edge.highlighted ? 4 : 2}
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