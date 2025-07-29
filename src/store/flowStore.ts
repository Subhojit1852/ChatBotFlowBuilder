import { create } from 'zustand';
import type  { Edge, Node } from 'reactflow';

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (id: string | null) => void;

  updateNodeData: (id: string, data: any) => void;

  persistFlow: () => void;
loadFlow: () => void;

};

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  updateNodeData: (id, data) =>
  set((state) => {
    const updatedNodes = state.nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    );
    localStorage.setItem('chatbot-nodes', JSON.stringify(updatedNodes)); // ✅ persist update
    return { nodes: updatedNodes };
  }),


persistFlow: () => {
  set((state) => {
    localStorage.setItem('chatbot-nodes', JSON.stringify(state.nodes));
    localStorage.setItem('chatbot-edges', JSON.stringify(state.edges));
    return {};
  });
},
loadFlow: () => {
  const savedNodes = localStorage.getItem('chatbot-nodes');
  const savedEdges = localStorage.getItem('chatbot-edges');
  if (savedNodes && savedEdges) {
    set({
      nodes: JSON.parse(savedNodes),
      edges: JSON.parse(savedEdges),
    });
  }
},


}));
