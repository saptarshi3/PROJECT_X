import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface CareerFlowchartProps {
  stream: 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social';
  className?: string;
}

const flowchartData = {
  Science: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Class 12 Science' }, type: 'input' },
      { id: '2', position: { x: 100, y: 100 }, data: { label: 'B.Tech/B.E.' } },
      { id: '3', position: { x: 400, y: 100 }, data: { label: 'MBBS/BDS' } },
      { id: '4', position: { x: 250, y: 200 }, data: { label: 'B.Sc.' } },
      { id: '5', position: { x: 50, y: 250 }, data: { label: 'Software Engineer' } },
      { id: '6', position: { x: 150, y: 250 }, data: { label: 'M.Tech' } },
      { id: '7', position: { x: 350, y: 250 }, data: { label: 'Doctor' } },
      { id: '8', position: { x: 450, y: 250 }, data: { label: 'Specialist' } },
      { id: '9', position: { x: 200, y: 300 }, data: { label: 'M.Sc.' } },
      { id: '10', position: { x: 300, y: 300 }, data: { label: 'Research' } },
      { id: '11', position: { x: 0, y: 350 }, data: { label: 'Startup' } },
      { id: '12', position: { x: 100, y: 350 }, data: { label: 'MNC' } },
      { id: '13', position: { x: 200, y: 350 }, data: { label: 'Government' } },
      { id: '14', position: { x: 300, y: 350 }, data: { label: 'Academia' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e3-8', source: '3', target: '8' },
      { id: 'e4-9', source: '4', target: '9' },
      { id: 'e4-10', source: '4', target: '10' },
      { id: 'e5-11', source: '5', target: '11' },
      { id: 'e5-12', source: '5', target: '12' },
      { id: 'e6-12', source: '6', target: '12' },
      { id: 'e6-13', source: '6', target: '13' },
      { id: 'e9-14', source: '9', target: '14' },
      { id: 'e10-14', source: '10', target: '14' },
    ],
  },
  Commerce: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Class 12 Commerce' }, type: 'input' },
      { id: '2', position: { x: 150, y: 100 }, data: { label: 'B.Com' } },
      { id: '3', position: { x: 350, y: 100 }, data: { label: 'BBA/BMS' } },
      { id: '4', position: { x: 100, y: 200 }, data: { label: 'CA/CS/CMA' } },
      { id: '5', position: { x: 200, y: 200 }, data: { label: 'M.Com' } },
      { id: '6', position: { x: 300, y: 200 }, data: { label: 'MBA' } },
      { id: '7', position: { x: 50, y: 300 }, data: { label: 'Accountant' } },
      { id: '8', position: { x: 150, y: 300 }, data: { label: 'Banking' } },
      { id: '9', position: { x: 250, y: 300 }, data: { label: 'Finance' } },
      { id: '10', position: { x: 350, y: 300 }, data: { label: 'Manager' } },
      { id: '11', position: { x: 100, y: 400 }, data: { label: 'Entrepreneur' } },
      { id: '12', position: { x: 200, y: 400 }, data: { label: 'Corporate' } },
      { id: '13', position: { x: 300, y: 400 }, data: { label: 'Consultant' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e4-7', source: '4', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
      { id: 'e5-9', source: '5', target: '9' },
      { id: 'e6-10', source: '6', target: '10' },
      { id: 'e6-11', source: '6', target: '11' },
      { id: 'e7-12', source: '7', target: '12' },
      { id: 'e8-12', source: '8', target: '12' },
      { id: 'e9-13', source: '9', target: '13' },
      { id: 'e10-13', source: '10', target: '13' },
    ],
  },
  Arts: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Class 12 Arts' }, type: 'input' },
      { id: '2', position: { x: 150, y: 100 }, data: { label: 'B.A.' } },
      { id: '3', position: { x: 350, y: 100 }, data: { label: 'LLB' } },
      { id: '4', position: { x: 100, y: 200 }, data: { label: 'M.A.' } },
      { id: '5', position: { x: 200, y: 200 }, data: { label: 'B.Ed.' } },
      { id: '6', position: { x: 300, y: 200 }, data: { label: 'Journalism' } },
      { id: '7', position: { x: 400, y: 200 }, data: { label: 'Lawyer' } },
      { id: '8', position: { x: 50, y: 300 }, data: { label: 'Research' } },
      { id: '9', position: { x: 150, y: 300 }, data: { label: 'Professor' } },
      { id: '10', position: { x: 250, y: 300 }, data: { label: 'Teacher' } },
      { id: '11', position: { x: 350, y: 300 }, data: { label: 'Journalist' } },
      { id: '12', position: { x: 100, y: 400 }, data: { label: 'UPSC' } },
      { id: '13', position: { x: 200, y: 400 }, data: { label: 'Media' } },
      { id: '14', position: { x: 300, y: 400 }, data: { label: 'NGO' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
      { id: 'e4-9', source: '4', target: '9' },
      { id: 'e5-10', source: '5', target: '10' },
      { id: 'e6-11', source: '6', target: '11' },
      { id: 'e8-12', source: '8', target: '12' },
      { id: 'e9-12', source: '9', target: '12' },
      { id: 'e10-13', source: '10', target: '13' },
      { id: 'e11-13', source: '11', target: '13' },
      { id: 'e8-14', source: '8', target: '14' },
    ],
  },
  Creative: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Creative Arts' }, type: 'input' },
      { id: '2', position: { x: 150, y: 100 }, data: { label: 'Design' } },
      { id: '3', position: { x: 350, y: 100 }, data: { label: 'Fine Arts' } },
      { id: '4', position: { x: 100, y: 200 }, data: { label: 'Graphics' } },
      { id: '5', position: { x: 200, y: 200 }, data: { label: 'Fashion' } },
      { id: '6', position: { x: 300, y: 200 }, data: { label: 'Music' } },
      { id: '7', position: { x: 400, y: 200 }, data: { label: 'Film' } },
      { id: '8', position: { x: 50, y: 300 }, data: { label: 'Designer' } },
      { id: '9', position: { x: 150, y: 300 }, data: { label: 'Artist' } },
      { id: '10', position: { x: 250, y: 300 }, data: { label: 'Musician' } },
      { id: '11', position: { x: 350, y: 300 }, data: { label: 'Director' } },
      { id: '12', position: { x: 100, y: 400 }, data: { label: 'Studio' } },
      { id: '13', position: { x: 200, y: 400 }, data: { label: 'Freelance' } },
      { id: '14', position: { x: 300, y: 400 }, data: { label: 'Agency' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
      { id: 'e5-8', source: '5', target: '8' },
      { id: 'e6-10', source: '6', target: '10' },
      { id: 'e7-11', source: '7', target: '11' },
      { id: 'e8-12', source: '8', target: '12' },
      { id: 'e9-13', source: '9', target: '13' },
      { id: 'e10-13', source: '10', target: '13' },
      { id: 'e11-14', source: '11', target: '14' },
    ],
  },
  Social: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Social Service' }, type: 'input' },
      { id: '2', position: { x: 150, y: 100 }, data: { label: 'Social Work' } },
      { id: '3', position: { x: 350, y: 100 }, data: { label: 'Public Policy' } },
      { id: '4', position: { x: 100, y: 200 }, data: { label: 'MSW' } },
      { id: '5', position: { x: 200, y: 200 }, data: { label: 'Psychology' } },
      { id: '6', position: { x: 300, y: 200 }, data: { label: 'UPSC' } },
      { id: '7', position: { x: 400, y: 200 }, data: { label: 'MPA' } },
      { id: '8', position: { x: 50, y: 300 }, data: { label: 'NGO' } },
      { id: '9', position: { x: 150, y: 300 }, data: { label: 'Counselor' } },
      { id: '10', position: { x: 250, y: 300 }, data: { label: 'Civil Service' } },
      { id: '11', position: { x: 350, y: 300 }, data: { label: 'Policy Maker' } },
      { id: '12', position: { x: 100, y: 400 }, data: { label: 'Community' } },
      { id: '13', position: { x: 200, y: 400 }, data: { label: 'Government' } },
      { id: '14', position: { x: 300, y: 400 }, data: { label: 'International' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
      { id: 'e5-9', source: '5', target: '9' },
      { id: 'e6-10', source: '6', target: '10' },
      { id: 'e7-11', source: '7', target: '11' },
      { id: 'e8-12', source: '8', target: '12' },
      { id: 'e9-12', source: '9', target: '12' },
      { id: 'e10-13', source: '10', target: '13' },
      { id: 'e11-14', source: '11', target: '14' },
    ],
  },
};

const nodeStyles = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  color: 'var(--foreground)',
  fontSize: '12px',
  fontWeight: '500',
  padding: '8px 12px',
  minWidth: '100px',
  textAlign: 'center' as const,
};

export default function CareerFlowchart({ stream, className = "" }: CareerFlowchartProps) {
  const data = flowchartData[stream];
  
  const initialNodes: Node[] = useMemo(() => 
    data.nodes.map(node => ({
      ...node,
      style: nodeStyles,
    })),
    [data.nodes]
  );

  const initialEdges: Edge[] = useMemo(() =>
    data.edges.map(edge => ({
      ...edge,
      style: { stroke: 'var(--primary)', strokeWidth: 2 },
      animated: true,
    })),
    [data.edges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className={`h-96 w-full ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="glassmorphism rounded-lg"
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Controls 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
        />
        <MiniMap 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
          }}
          maskColor="rgba(255, 255, 255, 0.1)"
          nodeColor="var(--primary)"
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(255, 255, 255, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}