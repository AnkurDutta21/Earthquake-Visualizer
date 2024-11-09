import React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="flex-1 p-6 lg:ml-0 bg-base">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <div className="flex space-x-3">
            <select className="bg-surface border border-stroke rounded-xl px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-pink/50">
              <option>Last 24 Hours</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
            <button className="bg-surface border border-stroke rounded-xl px-4 py-2 text-gray-300 hover:bg-surface-light transition-colors">
              Export Data
            </button>
          </div>
        </div>
        <section className="bg-surface-dark backdrop-blur-xl rounded-3xl border border-stroke shadow-2xl">
          {children}
        </section>
      </div>
    </main>
  );
};

export default MainContainer;
