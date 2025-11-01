import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const mathSymbols = ["π", "∑", "∫", "dx/dy", "√", "∞", "∂", "≈", "≠", "≥"];

export default function App() {

  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [hovered, setHovered] = useState(null);

  const [showTapeButton, setShowTapeButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const boxRefs = [useRef(null), useRef(null), useRef(null)];
  const [paths, setPaths] = useState([]);



  const lines = [
    "I build powerful AI models 🚀",
    "I create clean and scalable code 💻",
    "I turn ideas into real projects 🌟",
    "I Never Run out of Ideas 💡",
    "I Never Run out of Motivations 🔥",
    "I Build What I Imagine 🎯",
    "I Learn Everyday 📚",
    "Today I am stronger than yesterday 💪",
    "I Keep comparing myself to my past self 🧠",

  ];
  

  // Petals for the flower
  const petals = [
    "Love Working in Teams 🤝",
    "Like Building New things 🛠️",
    "Making New algorithms 🤖",
    "Creative Builder 🌟",
    "Problem Solver 🔎",
    "Always Learning 📚",
  ];
  const projects = [
  {
    title: "Chess Match Outcome Predictor",
    description: "Predicting chess game outcomes using machine learning.",
    image: "/projects/chess.png",
  },
  {
    title: "Arabic Sign Language Detection System using Deep Learning",
    description: "Predicting Arabic sign language gestures using deep learning techniques.",
    image: "/projects/asl.png",
  },
  {
    title: "Analysis Geek App",
    description: "A full app for Data cleaning and data visualization with a real website at https://analysisgeek.online/",
    image: "/projects/geek.png",
  },
  {
    title: "AI background remover",
    description: "An AI-powered tool to remove image backgrounds seamlessly.",
    image: "/projects/ph.png",

  },
];





  // Text rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Math particle click
  const handleClick = (e) => {
    const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    const newParticle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      symbol,
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 3000);
  };

  // Connect timeline boxes dynamically
  useEffect(() => {
    const updateLines = () => {
      const positions = boxRefs.map((ref) => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        return {
          startX: rect.left + rect.width / 2 + window.scrollX,
          startY: rect.bottom + window.scrollY,
          endX: rect.left + rect.width / 2 + window.scrollX,
          endY: rect.top + window.scrollY,
        };
      });

      const newPaths = [];
      for (let i = 0; i < positions.length - 1; i++) {
        if (!positions[i] || !positions[i + 1]) continue;
        const start = { x: positions[i].startX, y: positions[i].startY };
        const end = { x: positions[i + 1].endX, y: positions[i + 1].endY };

        const path = `M ${start.x},${start.y}
                      C ${start.x},${(start.y + end.y) / 2}
                        ${end.x},${(start.y + end.y) / 2}
                        ${end.x},${end.y}`;
        newPaths.push(path);
      }
      setPaths(newPaths);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    window.addEventListener("scroll", updateLines);
    return () => {
      window.removeEventListener("resize", updateLines);
      window.removeEventListener("scroll", updateLines);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
      onClick={handleClick} // <-- click anywhere on the page
      onTouchStart={(e) => handleClick(e.touches[0])}
    >
      {/* Background animated circles (always full-page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 pointer-events: none;">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.6,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
            }}
          />
        ))}
      </div>

      {/* Floating math particles (full-page) */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl text-green-400 pointer-events-none select-none z-20"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          animate={{
            opacity: 0,
            y: -120,
            scale: 1.5,
            x: Math.random() * 60 - 30,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {p.symbol}
        </motion.span>
      ))}
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white overflow-hidden"
    
    >
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.6,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
            }}
          />
        ))}
      </div>

      {/* Floating math particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl text-green-400 pointer-events-none select-none z-20"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          animate={{
            opacity: 0,
            y: -120,
            scale: 1.5,
            x: Math.random() * 60 - 30,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {p.symbol}
        </motion.span>
      ))}

      {/* Welcome section */}
      <div className="relative z-10 text-center mt-20 mb-32">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My <span className="text-green-400">World</span>
        </motion.h1>

        <motion.div
          className="text-xl text-gray-300 h-10 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            {lines[index]}
          </motion.span>
        </motion.div>
      </div>

      {/* Arrows (SVG paths between boxes) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="rgb(74,222,128)"
            strokeWidth="3"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* Timeline - Paper Boxes */}
      <div className="relative z-10 flex flex-col items-start space-y-48">
        <motion.div
          ref={boxRefs[0]}
          className="bg-white text-black shadow-2xl rounded-lg w-72 h-96 p-6 border-2 border-green-400 ml-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-bold text-2xl mb-3">How I Started</h3>
          <p className="text-sm">
            I began at 12 exploring creativity through design, video editing, and countless experiments — but it was coding and AI that truly captured my passion.
          </p>
        </motion.div>

        <motion.div
          ref={boxRefs[1]}
          className="bg-white text-black shadow-2xl rounded-lg w-72 h-96 p-6 border-2 border-green-400 ml-40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-bold text-2xl mb-3">Leveling Up</h3>
          <p className="text-sm">
            Today, I build complete AI systems, contribute to real-world innovation, and mentor others in machine learning. I’m constantly pushing my limits and exploring advanced AI research.
          </p>
        </motion.div>

        <motion.div
          ref={boxRefs[2]}
          className="bg-white text-black shadow-2xl rounded-lg w-72 h-96 p-6 border-2 border-green-400 ml-80"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-bold text-2xl mb-3">Where I Am Now</h3>
          <p className="text-sm">
            Building full AI systems and pushing forward into advanced research.
            Working as a Machine Learning Engineering at SBS and Teaching AI to others in my company. 


          </p>
        </motion.div>
      </div>

      {/* Flower About Me */}
      <div className="relative z-10 flex items-center justify-center mt-32">
        <div className="relative w-96 h-96 flex items-center justify-center">
          {/* Center circle */}
          <motion.div
            className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold"
            whileHover={{ scale: 1.1 }}
          >
            Who Am I?
          </motion.div>

          {/* Petals */}
          {petals.map((text, i) => {
            const angle = (i / petals.length) * 360;
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <motion.div
                key={i}
                className="absolute w-24 h-24 rounded-full bg-green-400/40 flex items-center justify-center text-center p-2 cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px - 3rem)`,
                  top: `calc(50% + ${y}px - 3rem)`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.2, backgroundColor: "rgba(34,197,94,0.9)" }}
              >
                {hovered === i && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-semibold text-black"
                  >
                    {text}
                  </motion.span>
                )}
              </motion.div>
              
            );
          })}
        </div>
      </div>
      {/* Projects Section */}
      <section className="relative z-10 py-20 px-6 bg-black text-white">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-400">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-green-400/50 transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-green-400">{proj.title}</h3>
                <p className="text-gray-300 text-sm">{proj.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Why Me Section */}
<section className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20">
  <motion.h2
    className="text-4xl md:text-5xl font-bold mb-12 text-green-400 text-center"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Why Choose Me
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
    {[
      {
        title: "Love Failing",
        description:
        "I love failing — every mistake is a lesson that makes me a better person, a stronger developer, and ultimately unstoppable.",
        color: "bg-green-500/30",
      },
      {
        title: "Skilled Builder",
        description:
          "I started learning and building real-world projects at the age of 12, which taught me how to write clean, scalable, and reliable code.",
        color: "bg-green-400/30",
      },
      {
        title: "Relentless Learner",
        description:
          "I never stop improving — constantly learning new frameworks, exploring research, and mastering emerging technologies.",
        color: "bg-green-300/30",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        className={`relative p-8 rounded-2xl shadow-2xl border-2 border-green-400 cursor-pointer ${item.color}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 60px rgba(34,197,94,0.7)",
          rotate: [0, -2, 2, 0],
        }}
        transition={{ duration: 0.5 + i * 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
        <p className="text-gray-300">{item.description}</p>
      </motion.div>
    ))}
  </div>

  {/* Optional: central quote or vision statement */}
  <motion.div
    className="mt-20 max-w-3xl text-center text-xl text-gray-400 italic"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    “Comfort is the enemy of greatness — I live where I evolve.”
  </motion.div>
</section>

{/* Achievements Section */}
<section className="relative z-10 py-20 px-6 bg-black text-white">
  <h2 className="text-4xl font-bold mb-12 text-center text-green-400">
    Achievements & Certificates
  </h2>

  {/* Achievements Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

    {[
      // 🥇 Sports Achievements
      {

        title: "Gymnastics champion 1st place Gold medal",
        description: "Won first place in Cairo gymnastics competition.",
        image: "/first_medal.jpg"
      },
        {
          title: "My second Gymnastics champion 1st place Gold medal",
          description: "Won first place in Cairo gymnastics competition for the first time again.",
          image: "/Second_medal.jpg"
        },
        {
          title: "My Third Gymnastics champion 3rd place Bronze medal",
          description: "Won third place in Cairo gymnastics competition.",
          image: "/Third_medal.jpg"
        }
        ,
        {
          title: "My first Taekwondo champion 3rd place Silver medal",
          description: "Won third place in Cairo Taekwondo competition.",
          image: "/fourth_medal.jpg"
        }
        ,
        {
          title: "My Second Taekwondo champion 3rd place Bronze medal",
          description: "Won third place in Cairo Taekwondo competition.",
          image: "/5_medal.jpg"
        },
        {
          title: "Data Science Basics From Skillup.",
        description: "Data Science with Python",
        pdf: "/certificates/Skillup.pdf",
      },
    {
      title: "AWS Intro To Generative AI",
      description: "Generated AI Fundamentals",
      pdf: "/certificates/AWS.pdf",
    },
    {
      title: "Compeleted The Machine Learning Engineering Track at DataCamp",
      description: "compeleted The Machine Learning Engineering Track at DataCamp",
      pdf: "/certificates/Track.pdf",
    },
    {
      title: "Neural Networks and Deep Learning From Coursera",
      description: "Compeleted Neural Networks and Deep Learning From Coursera",
      pdf: "/certificates/NN.pdf",
    },
    {
      title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization From Coursera",
      description: "Finished Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization From Coursera",
      pdf: "/certificates/Im.pdf",
    },
    {
      title: "Took Udacity internsip from the goverment of Egypt in Data Science & AI Level 2",
      description: "Finished Took Udacity internsip from the goverment of Egypt in Data Science & AI Level 2",
      pdf: "/certificates/lv2.pdf",
    },
    {
      title: "Took Udacity internsip from the goverment of Egypt in Data Science & AI Level3",
      description: "Finished Took Udacity internsip from the goverment of Egypt in Data Science & AI Level 3",
      pdf: "/certificates/Three.pdf",
    },
      {
      title: "Took Udacity internsip from the goverment of Egypt in Data Science & AI Level4",
      description: "Finished Took Udacity internsip from the goverment of Egypt in Data Science & AI Level 4",
      pdf: "/certificates/lv4.pdf",
    },
      {
      title: "I can type Fast Too <:",
      description: "94 wpm",
      image: "/hobbies/typing.png",
    },
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-green-400/50 transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {/* Image (only for medals) */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-60 object-contain bg-black"
          />
        )}

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-green-400">{item.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{item.description}</p>

          {/* PDF Button (only for certificates) */}
          {item.pdf && (
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              View Certificate
            </a>
          )}
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* Hobbies Section */}
<section className="relative z-10 py-20 px-6 bg-black text-white">
  <h2 className="text-4xl font-bold mb-12 text-center text-green-400">Hobbies</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
    

    {/* Hobbies Cards (Left Side) */}
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          title: "Playing Chess",
          description: "I love how there is millions of possible moves in chess.",
          image: "/hobbies/chess.png",
        },
        {
          title: "Playing Minecraft",
          description: "I love Creating new friends in minecraft servers and play.",
          image: "/hobbies/minecraft.png",
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-green-400/50 transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3 text-green-400">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Your Photo (Right Side) */}
    {/* <div className="flex justify-center">
      <img
        src="https://via.placeholder.com/400x500.png?text=Me+Playing"
        alt="Me"
        className="rounded-2xl shadow-2xl border-4 border-green-400 object-cover"
      />  
    </div> */}
  </div>
</section>
{/* Quote Section */}
<section className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-6">
  {/* Floating particles / tech vibes */}
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-green-400/20 "
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 1,
        }}
        transition={{
          duration: 25 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          width: Math.random() * 20 + 10,
          height: Math.random() * 20 + 10,
        }}
      />
    ))}
  </div>

  <motion.blockquote
    className="relative z-10 text-center max-w-3xl text-4xl md:text-6xl font-extrabold leading-snug text-white"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    "Don't follow the regular path — <span className='text-green-400'>forge yours</span>."
  </motion.blockquote>

  <motion.p
    className="mt-8 text-gray-400 text-xl text-center max-w-xl"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}>

    Today I work for a company — tomorrow, I’ll build my own empire.
  </motion.p>
</section>




{/* Contact Section */}
<section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6 py-20 overflow-hidden">

  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold mb-4 text-green-400">Contact Me</h2>
    <p className="text-gray-400 max-w-lg mx-auto">
      Do you have what it takes to see my contact info?
    </p>
  </div>

  {/* Button to "show tape" */}
  {showTapeButton && (
    <motion.button
      className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
      onClick={() => {
        setShowMessage(true);
        setShowTapeButton(false);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Reveal the secret
    </motion.button>
  )}

  {/* Fun message */}
  {showMessage && (
    <motion.p
      className="mt-6 text-center text-lg text-red-400"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Sorry, I don’t reveal info until you prove your worth 😎
    </motion.p>
  )}

  {/* Side Tape */}
  {(!showTapeButton || showMessage) && (
    <motion.div
      drag="x"
      dragConstraints={{ left: -300, right: 0 }}
      dragElastic={0.2}
      className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-5 py-6 font-bold cursor-grab rounded-l-lg z-50 shadow-lg flex items-center space-x-2"
      whileDrag={{ scale: 1.05, boxShadow: "0 5px 15px rgba(34,197,94,0.5)" }}
      whileHover={{ backgroundColor: "#22c55e" }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -150) setShowContact(true);
      }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
      </svg>
      <span>If you pulled this a nuke will strike you</span>
    </motion.div>
  )}

  {/* Contact Info */}
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    animate={showContact ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7 }}
    className="relative w-full max-w-2xl bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-green-400/40 z-40 mt-12"
  >
    {showContact && (
      <div className="text-center space-y-6">
        <p className="text-gray-300 text-lg">
          You’ve proven your worth! Here’s how you can reach me:
        </p>

       {/* Contact Info Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
  {/* Email - Bigger Box */}
  <div className="bg-black/60 p-10 rounded-2xl border border-green-400/40 text-center md:col-span-2">
    <h3 className="text-green-400 font-mono text-xl mb-2">Email</h3>
    <p className="text-white font-mono text-lg break-all">
      marwan.d.2008@gmail.com
    </p>
  </div>
      <br/>
  {/* Discord */}
  <div className="bg-black/60 p-8 rounded-2xl border border-green-400/40 text-center">
    <h3 className="text-green-400 font-mono text-xl mb-2">Discord</h3>
    <p className="text-white font-mono text-base">Soreal404</p>
  </div>

  {/* Social Links */}
  <div className="bg-black/60 p-8 rounded-2xl border border-green-400/40 text-center flex flex-col items-center">
    <h3 className="text-green-400 font-mono text-xl mb-4">Socials</h3>
    <div className="flex gap-6">
      {/* GitHub */}
      <a
        href="https://github.com/soreal404"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 shadow-lg hover:shadow-green-400/40"
      >
        <i className="fab fa-github text-2xl"></i>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/marwan-mostafa-712192212"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 shadow-lg hover:shadow-green-400/40"
      >
        <i className="fab fa-linkedin-in text-2xl"></i>
      </a>
    </div>
  </div>
</div>

<p className="text-gray-400 mt-6 text-sm text-center">
  Feel free to reach out for collaboration, projects, or just to say hello!
</p>



      </div>
    )}
  </motion.div>
</section>



 
  
</section>




        </div>

    
  );
}
