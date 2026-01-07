import type { FamilyMember } from '../types';

export interface PositionedNode extends FamilyMember {
  x: number;
  y: number;
  children: PositionedNode[];
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 130;
const HORIZONTAL_SPACING = 40;
const VERTICAL_SPACING = 80;

export function buildTree(
  data: FamilyMember[],
  rootId: string,
  expandedChildren: Set<string>
): { nodes: PositionedNode[]; lines: { fromId: string; toId: string }[] } {
  const nodeMap = new Map(data.map((d) => [d.id, d]));

  function layout(
    nodeId: string,
    depth: number
  ): [PositionedNode | null, number] {
    const member = nodeMap.get(nodeId);
    if (!member) return [null, 0];

    const childrenIds = data.filter((d) => d.fatherId === nodeId).map((d) => d.id);
    const showChildren = expandedChildren.has(nodeId);

    let children: PositionedNode[] = [];
    let subtreeWidth = 0;

    if (showChildren) {
      let currentX = 0;
      for (const childId of childrenIds) {
        const [childNode, childWidth] = layout(childId, depth + 1);
        if (childNode) {
          childNode.x = currentX;
          children.push(childNode);
          currentX += childWidth + HORIZONTAL_SPACING;
        }
      }
      if (children.length > 0) {
        subtreeWidth = currentX - HORIZONTAL_SPACING;
      }
    }

    if (subtreeWidth === 0) {
      subtreeWidth = NODE_WIDTH;
    }

    const x = children.length > 0
      ? (children[0].x + children[children.length - 1].x) / 2
      : 0;

    const positionedNode: PositionedNode = {
      ...member,
      x,
      y: depth * (NODE_HEIGHT + VERTICAL_SPACING),
      children,
    };

    return [positionedNode, subtreeWidth];
  }

  const [rootNode] = layout(rootId, 0);

  const positionedNodes: PositionedNode[] = [];
  const lines: { fromId: string; toId: string }[] = [];

  function collect(node: PositionedNode) {
    positionedNodes.push(node);
    for (const child of node.children) {
      lines.push({ fromId: node.id, toId: child.id });
      collect(child);
    }
  }

  if (rootNode) {
    collect(rootNode);
  }

  return { nodes: positionedNodes, lines };
}
