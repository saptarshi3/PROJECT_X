import { motion } from "framer-motion";
import { Settings, Heart, PieChart, Palette } from "lucide-react";

export default function Showcase() {
  const careerStreams = [
    {
      title: "Engineering & Technology",
      icon: Settings,
      description: "Build the future with innovation, coding, and cutting-edge technology solutions.",
      gradient: "from-blue-500 to-purple-600",
      delay: 0,
    },
    {
      title: "Medicine & Healthcare",
      icon: Heart,
      description: "Heal, care, and make a difference in people's lives through medical expertise.",
      gradient: "from-red-500 to-pink-600",
      delay: 0.1,
    },
    {
      title: "Commerce & Finance",
      icon: PieChart,
      description: "Drive business growth through strategic thinking and financial expertise.",
      gradient: "from-green-500 to-emerald-600",
      delay: 0.2,
    },
    {
      title: "Arts & Humanities",
      icon: Palette,
      description: "Express creativity and explore human culture through art, literature, and philosophy.",
      gradient: "from-yellow-500 to-orange-600",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Career <span className="text-primary">Streams</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the four main career paths our assessment covers, each with unique opportunities and growth potential.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerStreams.map((stream, index) => (
            <motion.div
              key={index}
              className="tilt-card glassmorphism rounded-2xl p-6 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stream.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              data-testid={`career-stream-${index}`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stream.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stream.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{stream.title}</h3>
              <p className="text-muted-foreground text-sm">{stream.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
