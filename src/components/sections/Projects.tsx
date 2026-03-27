import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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
    title: 'Smart Agriculture Bot',
    category: 'IoT',
    tags: ['ESP32', 'Sensors', 'AWS'],
    description: 'Autonomous irrigation and soil health monitoring system.',
    details: 'IoT-based automation using real-time soil analytics.'
  },
  {
    id: 2,
    title: 'Drone Swarm Controller',
    category: 'Robotics',
    tags: ['ROS', 'Python', 'UAV'],
    description: 'Coordinated drone system.',
    details: 'Multi-drone synchronization using ROS.'
  },
  {
    id: 3,
    title: 'Real-time Object Detection',
    category: 'Computer Vision',
    tags: ['YOLOv8', 'OpenCV'],
    description: 'Industrial object tracking.',
    details: 'Optimized real-time detection pipeline.'
  },
  {
    id: 4,
    title: 'ERP Dashboard',
    category: 'Web',
    tags: ['React', 'Node'],
    description: 'Business management tool.',
    details: 'Full-stack analytics dashboard.'
  }
];

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
            {/* BACK BUTTON */}
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

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {selectedProject.details}
              </p>

              <button
                onClick={() => setSelectedProject(null)}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;