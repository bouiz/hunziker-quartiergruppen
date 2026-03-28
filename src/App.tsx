/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CircleMap } from './components/CircleMap';
import { groups, categories, Group } from './data';
import { Search, Filter, Globe } from 'lucide-react';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<'EN' | 'DE'>('DE');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(groups, {
    keys: ['name', 'nameEn', 'category', 'categoryEn', 'contact', 'responsible'],
    threshold: 0.3,
  }), []);

  const filteredGroups = useMemo(() => {
    let result = groups;

    if (searchQuery) {
      result = fuse.search(searchQuery).map(r => r.item);
    }

    if (selectedCategory) {
      result = result.filter(g => g.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory, fuse]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#f4f4f5]">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-8 pointer-events-none flex flex-col items-center gap-6">
        
        <h1 
          onClick={() => {
            setSelectedGroup(null);
            setSearchQuery('');
            setSelectedCategory(null);
            setResetTrigger(prev => prev + 1);
          }}
          className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight font-serif cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
        >
          {language === 'EN' ? 'Hunziker Community Groups' : 'Hunziker Quartiergruppen'}
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-4 pointer-events-auto w-full max-w-2xl justify-center">
          
          {/* Search and Filter Container */}
          <div ref={filterContainerRef} className="flex flex-col gap-2 w-full max-w-md relative">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={20} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder={language === 'EN' ? 'Search groups...' : 'Gruppen suchen...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFilterOpen(false)}
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-3 rounded-xl transition-colors ${selectedCategory || isFilterOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <Filter size={20} />
              </button>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-4 flex flex-wrap gap-2 z-30"
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedCategory ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {language === 'EN' ? 'All' : 'Alle'}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.de}
                      onClick={() => setSelectedCategory(cat.de)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.de ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {language === 'EN' ? cat.en : cat.de}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(l => l === 'EN' ? 'DE' : 'EN')}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shrink-0"
          >
            <Globe size={18} />
            {language}
          </button>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <CircleMap 
          groups={filteredGroups} 
          selectedGroup={selectedGroup} 
          onSelectGroup={setSelectedGroup}
          language={language}
          resetTrigger={resetTrigger}
          onInteraction={() => setIsFilterOpen(false)}
        />
      </div>
    </div>
  );
}
