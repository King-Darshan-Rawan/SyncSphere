import React from "react";

const Body = () => {
  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Welcome to My Website</h1>
      <p className="text-gray-600 text-lg text-center mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet felis vitae magna vehicula accumsan non vitae eros.
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Feature One</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Feature Two</h2>
          <p className="text-gray-600">Nullam venenatis enim nec velit luctus, vel suscipit nisi fermentum.</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Feature Three</h2>
          <p className="text-gray-600">Praesent cursus metus vitae ipsum aliquam tincidunt.</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
