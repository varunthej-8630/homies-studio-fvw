import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= DATA =================

const categories = [
  'IoT',
  'Robotics',
  'AI/ML',
  'Web',
  'FPGA',
  'Communication',
  'Computer Vision'
];

const projects = [
  {
    id: 1,
    title: 'ERP Dashboard',
    category: 'Web',

    description: 'Business management tool.',

    details:
      'A full-stack ERP system with analytics dashboards, automation workflows, and user management.',

    tools: ['React', 'Node.js', 'MongoDB', 'Chart.js'],

    sections: [
      {
        title: 'Architecture',
        content:
          'Frontend built using React, backend using Node.js, connected via REST APIs with MongoDB.'
      },
      {
        title: 'Features',
        content:
          'Real-time analytics, reporting dashboard, role-based access, automation workflows.'
      },
      {
        title: 'Challenges',
        content:
          'Handling large datasets and optimizing real-time performance.'
      }
    ],

    links: {
      github: 'https://github.com/',
      live: 'https://example.com'
    }
  },

  {
    id: 2,
    title: 'Smart Agriculture Bot',
    category: 'IoT',

    description: 'Autonomous irrigation system.',

    details:
      'IoT-based smart farming system that monitors soil and automates irrigation.',

    tools: ['ESP32', 'Sensors', 'AWS'],

    sections: [
      {
        title: 'Working',
        content:
          'Sensors collect soil data and trigger irrigation automatically.'
      },
      {
        title: 'Impact',
        content:
          'Reduces water usage and improves crop yield.'
      }
    ],

    links: {
      github: '',
      live: ''
    }
  }
];

// ================= COMPONENT =================

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = projects.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-[1200px] mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-10">
            Stuff We've Actually Built.
          </h2>
        </div>

        {/* CATEGORY GRID */}
        {!activeCategory && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer p-10 bg-white rounded-2xl shadow-md text-center font-semibold text-lg hover:shadow-xl transition"
              >
                {cat}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PROJECTS */}
        {activeCategory && (
          <>
            <button
              onClick={() => setActiveCategory(null)}
              className="mb-10 text-sm text-gray-500 hover:text-black"
            >
              ← Back to Categories
            </button>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-200 to-green-200 relative">
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-white px-4 py-2 rounded-full"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-500">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedProject.category}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 overflow-y-auto space-y-6">

                {/* OVERVIEW */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Overview</h4>
                  <p className="text-gray-700">
                    {selectedProject.details}
                  </p>
                </div>

                {/* TOOLS */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Tools & Technologies
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProject.tools.map((tool: string) => (
                      <span
                        key={tool}
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SECTIONS */}
                {selectedProject.sections.map((section: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-semibold text-lg mb-2">
                      {section.title}
                    </h4>
                    <p className="text-gray-600">
                      {section.content}
                    </p>
                  </div>
                ))}

                {/* LINKS */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Links</h4>
                  <div className="flex gap-4">

                    {selectedProject.links?.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                      >
                        GitHub
                      </a>
                    )}

                    {selectedProject.links?.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;