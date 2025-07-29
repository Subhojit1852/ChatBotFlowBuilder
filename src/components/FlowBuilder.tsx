import  { useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
 
} from 'reactflow';
import { useSnackbar } from './SnackbarContext';

import type {
     Connection,
  EdgeChange,
  NodeChange,
  NodeTypes,
 
} from 'reactflow';

import 'reactflow/dist/style.css';
import MessageNode from './nodes/MessageNode';
import UserInputNode from './nodes/UserInputNode';
import { useFlowStore } from '../store/flowStore';

const nodeTypes: NodeTypes = {
  message: MessageNode,
  BotInput: UserInputNode,
};


export default function FlowBuilder() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNode,
    selectedNodeId,
    
    persistFlow,  
    loadFlow,
  } = useFlowStore();
const { showMessage } = useSnackbar();

useEffect(() => {
  showMessage('Flow loaded from localStorage!', 'success');

  loadFlow(); // ✅ Load from localStorage on mount
}, []);


  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
    persistFlow(); // <- after setNodes

  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
    persistFlow(); // <- after setEdges

  };

  const onConnect = (connection: Connection) => {
    const { source, target } = connection;
    persistFlow(); 
  if (!source || !target) return;

  // ❌ Prevent self-connections
  if (source === target) {
    showMessage('Connection not allowed!', 'error');

    return;
  }

  // ❌ Prevent multiple outgoing edges from a source
  const existingOutgoing = edges.find((e) => e.source === source);
  if (existingOutgoing) {
    showMessage('Each node has only 1 outgoing connection', 'error');

    return;
  }

    setEdges(addEdge({ ...connection, animated: true }, edges));
    showMessage('Connection created!', 'success');
  };

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // 🛑 If the user is typing in an input or textarea, don't delete
    const active = document.activeElement;
    const isInputFocused =
      active?.tagName === 'INPUT' ||
      active?.tagName === 'TEXTAREA' ||
      active?.getAttribute('contenteditable') === 'true';

    if (isInputFocused) return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (!selectedNodeId) return;

      const newNodes = nodes.filter((n) => n.id !== selectedNodeId);
      const newEdges = edges.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      );
      showMessage('Node deleted!', 'info');

      setNodes(newNodes);
      setEdges(newEdges);
      setSelectedNode(null);
      persistFlow(); // Persist after deletion
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedNodeId, nodes, edges]);

  

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        fitView
         nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
