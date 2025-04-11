import { useState, useEffect, useRef } from 'react';

interface Tab {
  id: number | string;
  label: string;
}

interface TabsComponentProps {
  tabs: Tab[];
  getIdTab: (id: Tab['id']) => void;
  initialActiveTab?: Tab['id'];
}

const TabsUser: React.FC<TabsComponentProps> = ({ 
  tabs, 
  getIdTab, 
  initialActiveTab 
}) => {
  const [activeTab, setActiveTab] = useState<Tab['id']>(initialActiveTab || tabs[0].id);
  const [borderPosition, setBorderPosition] = useState<number>(0);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const tabRefs = useRef<Array<HTMLLIElement | null>>([]);
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
        const activeElement = tabRefs.current[activeIndex];
        if (activeElement) {
          setBorderPosition(activeElement.offsetLeft);
          setBorderWidth(activeElement.offsetWidth);
        }
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: Tab['id']) => {
    setActiveTab(tabId);
    getIdTab(tabId);
  };

  return (
    <div className="relative">
      <ul className="flex flex-row items-center mb-[6px]">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            ref={el => (tabRefs.current[index] = el)}
            onClick={() => handleTabClick(tab.id)}
            className={`cursor-pointer px-6 py-2 relative transition-colors duration-300 ${
              activeTab === tab.id ? 'font-medium' : ''
            }`}
          >
            <span
              className={`text-gray-600 text-[17px]`}
            >
              {tab.label}
            </span>
          </li>
        ))}
      </ul>
      <span
        className="absolute bottom-0 h-[3px] rounded-[4px]  bg-red-500 transition-all duration-300 ease-in-out"
        style={{
          width: `${borderWidth}px`,
          transform: `translateX(${borderPosition}px)`,
          transitionProperty: 'transform, width'
        }}
      />
    </div>
  );
};

export default TabsUser;