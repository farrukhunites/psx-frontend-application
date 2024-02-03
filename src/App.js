import React from 'react';
import SideNavbar from './components/SideNavbar';

function App() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white">
        <SideNavbar />
      </div>
      <div className="flex-grow">
        {/* Your main content goes here */}
        {/* For demonstration purposes, I'm adding a placeholder */}
        <main className="p-4">
          <h1>Main Content</h1>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  );
}

export default App;
