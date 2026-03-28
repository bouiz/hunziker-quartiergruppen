import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Group } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, MessageCircle, X } from 'lucide-react';

interface CircleMapProps {
  groups: Group[];
  selectedGroup: Group | null;
  onSelectGroup: (group: Group | null) => void;
  language: 'EN' | 'DE';
  resetTrigger: number;
  onInteraction?: () => void;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: Group;
  radius: number;
  x?: number;
  y?: number;
}

export const CircleMap: React.FC<CircleMapProps> = ({ groups, selectedGroup, onSelectGroup, language, resetTrigger, onInteraction }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const simulationRef = useRef<d3.Simulation<Node, undefined> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const prevNodesRef = useRef<Map<string, Node>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Initialize nodes, keeping previous positions if they exist
    const newNodes: Node[] = groups.map(g => {
      const existing = prevNodesRef.current.get(g.id);
      if (existing) {
        return { ...existing, group: g }; // Keep position and radius
      }
      return {
        id: g.id,
        group: g,
        radius: 35 + Math.random() * 20, // Random radius between 35 and 55
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 200,
        vx: 0,
        vy: 0
      };
    });

    // Update prevNodesRef
    prevNodesRef.current = new Map(newNodes.map(n => [n.id, n]));

    setNodes(newNodes);

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const simulation = d3.forceSimulation<Node>(newNodes)
      .force('charge', d3.forceManyBody().strength(15))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<Node>().radius(d => d.radius + 4).iterations(3))
      .alpha(0.3) // Re-heat slightly for smooth transition
      .restart()
      .on('tick', () => {
        setNodes([...simulation.nodes()]);
      });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [groups]);

  // Handle Zoom
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = svg.select('g.zoom-container');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('start', () => {
        if (onInteraction) onInteraction();
      })
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  const handleNodeClick = (node: Node) => {
    if (onInteraction) onInteraction();
    if (selectedGroup && selectedGroup.id === node.id) {
      // Already at level 3, maybe reset? Or do nothing.
      return;
    }
    
    // Always go directly to level 3
    onSelectGroup(node.group);
    setFocusedNodeId(null);
  };

  // Handle focused/selected group zoom
  useEffect(() => {
    if (!svgRef.current || !zoomRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (selectedGroup) {
      const node = nodes.find(n => n.id === selectedGroup.id);
      if (node && node.x && node.y) {
        // Zoom to node (Level 3)
        const scale = 3;
        const isMobile = window.innerWidth < 768;
        const x = isMobile ? width / 2 - node.x * scale : width / 3 - node.x * scale;
        const y = isMobile ? height / 4 - node.y * scale : height / 2 - node.y * scale;
        
        svg.transition().duration(750).call(
          zoomRef.current.transform,
          d3.zoomIdentity.translate(x, y).scale(scale)
        );
      }
    } else if (focusedNodeId) {
      const node = nodes.find(n => n.id === focusedNodeId);
      if (node && node.x && node.y) {
        // Zoom to node (Level 2)
        const scale = 2;
        const x = width / 2 - node.x * scale;
        const y = height / 2 - node.y * scale;
        
        svg.transition().duration(750).call(
          zoomRef.current.transform,
          d3.zoomIdentity.translate(x, y).scale(scale)
        );
      }
    } else {
      // Reset zoom (Level 1)
      const isMobile = window.innerWidth < 768;
      const scale = 0.75;
      const yOffset = isMobile ? 120 : 80;
      
      svg.transition().duration(750).call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(width / 2, height / 2 + yOffset).scale(scale).translate(-width / 2, -height / 2)
      );
    }
  }, [selectedGroup, focusedNodeId, nodes, resetTrigger]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#f4f4f5]">
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing">
        <g className="zoom-container">
          {nodes.map(node => (
              <g 
              key={node.id} 
              transform={`translate(${node.x || 0}, ${node.y || 0})`}
              onClick={() => handleNodeClick(node)}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: selectedGroup && selectedGroup.id !== node.id ? 0.2 : 1 }}
            >
              <circle 
                r={node.radius} 
                fill="#fff" 
                stroke="#e2e8f0" 
                strokeWidth="2"
                className="shadow-sm"
              />
              {/* Logo Image */}
              <clipPath id={`clip-${node.id}`}>
                <circle r={node.radius} />
              </clipPath>
              <image
                href={node.group.logo}
                x={-node.radius}
                y={-node.radius}
                width={node.radius * 2}
                height={node.radius * 2}
                clipPath={`url(#clip-${node.id})`}
                preserveAspectRatio="xMidYMid slice"
                style={{ 
                  opacity: (selectedGroup && selectedGroup.id === node.id) ? 1 : (zoomLevel >= 1.8 ? 0.15 : 1),
                  transition: 'opacity 0.3s'
                }}
                onError={(e) => {
                  // Fallback if logo not found
                  const target = e.target as SVGImageElement;
                  if (!target.href.baseVal.includes('picsum.photos')) {
                    target.href.baseVal = `https://picsum.photos/seed/${node.group.name}/200/200`;
                  }
                }}
              />
              
              {/* Level 2: Name over logo */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[12px] font-bold fill-slate-800 pointer-events-none"
                style={{ 
                  opacity: (selectedGroup && selectedGroup.id === node.id) ? 0 : (zoomLevel >= 1.8 ? 1 : 0), 
                  transition: 'opacity 0.3s',
                  textShadow: '0px 0px 4px rgba(255,255,255,0.8)'
                }}
              >
                {language === 'EN' 
                  ? (node.group.nameEn.length > 15 ? node.group.nameEn.substring(0, 12) + '...' : node.group.nameEn)
                  : (node.group.name.length > 15 ? node.group.name.substring(0, 12) + '...' : node.group.name)}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Level 3: Detail Panel */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            onWheel={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute right-0 bottom-0 md:top-0 w-full md:w-[400px] h-[60vh] md:h-full bg-white/95 backdrop-blur-xl shadow-2xl p-8 overflow-y-auto z-30 rounded-t-3xl md:rounded-none border-t md:border-l border-slate-200"
          >
            <button 
              onClick={() => {
                onSelectGroup(null);
                setFocusedNodeId(null);
              }}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-2 mt-4 pr-8">
              {language === 'EN' ? selectedGroup.nameEn : selectedGroup.name}
            </h2>
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium mb-8">
              {language === 'EN' ? selectedGroup.categoryEn : selectedGroup.category}
            </span>
            
            <div className="space-y-6 mb-10">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
                  {language === 'EN' ? 'Contact Person' : 'Ansprechperson'}
                </p>
                <p className="text-lg text-slate-800 font-medium">{selectedGroup.contact || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
                  {language === 'EN' ? 'Responsible AK' : 'Verantwortlich AK'}
                </p>
                <p className="text-lg text-slate-800 font-medium">{selectedGroup.responsible || '-'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {selectedGroup.flink && (
                <a 
                  href={selectedGroup.flink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <ExternalLink size={18} />
                  {language === 'EN' ? 'Open in Flink' : 'In Flink öffnen'}
                </a>
              )}
              {selectedGroup.chat && (
                <a 
                  href={selectedGroup.chat} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <MessageCircle size={18} />
                  {language === 'EN' ? 'Join Chat' : 'Chat beitreten'}
                </a>
              )}
              {!selectedGroup.flink && !selectedGroup.chat && (
                <p className="text-slate-500 text-sm italic text-center mt-4">
                  {language === 'EN' ? 'No links available' : 'Keine Links verfügbar'}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
