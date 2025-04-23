// import React, { useState } from "react";
// import "./destination.css";
// import video from "../assets/aqua.mp4";
// import sun from "../assets/sunlight.jpg"
// import second from "../assets/second.jpg"
// import third from "../assets/third.jpg"
// import four from "../assets/fourth.jpg"
// import five from "../assets/five.jpg"

// const Destination = () => {
//   const [creatureInfo, setCreatureInfo] = useState(null);

//   const seaLayers = [
//     {
//       name: "Sunlight Zone",
//       description: "The top layer of the ocean where sunlight penetrates. It is home to the most marine life.",
//       image: sun, // Add image path
//       creatures: [
//         { name: "Dolphin", image: "/images/dolphin.jpg", description: "Highly intelligent marine mammal.", isExtinct: false, isMysterious: false, isHarmful: false },
//         { name: "Sea Turtle", image: "/images/turtle.jpg", description: "Migratory reptile found in tropical oceans.", isExtinct: false, isMysterious: false, isHarmful: false },
//       ],
//     },
//     {
//       name: "Twilight Zone",
//       description: "This layer receives very little sunlight and is home to unique creatures with bioluminescence.",
//       image: second, // Add image path
//       creatures: [
//         { name: "Giant Squid", image: "/images/giant-squid.jpg", description: "Rare and mysterious deep-sea predator.", isExtinct: false, isMysterious: true, isHarmful: false },
//         { name: "Hatchetfish", image: "/images/hatchetfish.jpg", description: "Small fish with glowing features.", isExtinct: false, isMysterious: false, isHarmful: false },
//       ],
//     },
//     {
//       name: "Midnight Zone",
//       description: "Completely dark, extreme pressure, and home to bioluminescent species.",
//       image: third, // Add image path
//       creatures: [
//         { name: "Anglerfish", image: "/images/anglerfish.jpg", description: "Uses a glowing lure to attract prey.", isExtinct: false, isMysterious: true, isHarmful: false },
//         { name: "Vampire Squid", image: "/images/vampire-squid.jpg", description: "Mysterious squid with unique defense mechanisms.", isExtinct: false, isMysterious: true, isHarmful: false },
//       ],
//     },
//     {
//       name: "Abyssal Zone",
//       description: "Extreme cold and high pressure, home to unique organisms.",
//       image: four, // Add image path
//       creatures: [
//         { name: "Gulper Eel", image: "/images/gulper-eel.jpg", description: "Has an enormous mouth for swallowing prey.", isExtinct: false, isMysterious: true, isHarmful: false },
//         { name: "Dumbo Octopus", image: "/images/dumbo-octopus.jpg", description: "A rare deep-sea octopus.", isExtinct: false, isMysterious: true, isHarmful: false },
//       ],
//     },
//     {
//       name: "Hadal Zone",
//       description: "The deepest parts of the ocean, mostly unexplored.",
//       image: five, // Add image path
//       creatures: [
//         { name: "Frilled Shark", image: "/images/frilled-shark.jpg", description: "A prehistoric deep-sea predator.", isExtinct: false, isMysterious: true, isHarmful: true },
//         { name: "Amphipod", image: "/images/amphipod.jpg", description: "A tiny but resilient deep-sea creature.", isExtinct: false, isMysterious: false, isHarmful: false },
//       ],
//     },
//   ];

//   const fetchWikipediaInfo = async (creature) => {
//     try {
//       const response = await fetch(
//         `https://en.wikipedia.org/api/rest_v1/page/summary/${creature.name}`
//       );
//       const data = await response.json();
//       setCreatureInfo({
//         name: creature.name,
//         image: data.thumbnail?.source || creature.image,
//         description: data.extract || creature.description,
//       });
//     } catch (error) {
//       console.error("Error fetching Wikipedia data:", error);
//       setCreatureInfo(creature);
//     }
//   };

//   return (
//     <div className="destination-page">
//       {/* Background Video */}
//       <video className="video-background" autoPlay loop muted>
//         <source src={video} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay for readability */}
//       <div className="video-overlay"></div>

//       {/* Scrollable Content */}
//       <div className="destination-content">
//         <h1>Explore the Layers of the Ocean</h1>
//         {seaLayers.map((layer, index) => (
//           <div key={index} className="sea-layer">
//             <h2>{layer.name}</h2>
//             <p>{layer.description}</p>
//             <div className="image-container">
//               <img src={layer.image} alt={layer.name} className="layer-image" />
//             </div>
//             <div className="creatures-list">
//               {layer.creatures.map((creature, idx) => (
//                 <button key={idx} className="creature-button" onClick={() => fetchWikipediaInfo(creature)}>
//                   {creature.name} 
//                   {creature.isExtinct && " (Extinct)"}
//                   {creature.isMysterious && " (Mysterious)"}
//                   {creature.isHarmful && " (Harmful)"}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Creature Details */}
//       {creatureInfo && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-modal" onClick={() => setCreatureInfo(null)}>&times;</button>
//             <h2>{creatureInfo.name}</h2>
//             <img src={creatureInfo.image} alt={creatureInfo.name} />
//             <p>{creatureInfo.description}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Destination;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./destination.css";
import video from "../assets/aqua.mp4";
import sun from "../assets/sunlight.jpg";
import second from "../assets/second.jpg";
import third from "../assets/third.jpg";
import four from "../assets/fourth.jpg";
import five from "../assets/five.jpg";

const Destination = () => {
  const [creatureInfo, setCreatureInfo] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const seaLayers = [
    {
      name: "Sunlight Zone",
      description: "The top layer of the ocean where sunlight penetrates. It is home to the most marine life.",
      image: sun,
      creatures: [
        { name: "Dolphin", image: "/images/dolphin.jpg", description: "Highly intelligent marine mammal.", isExtinct: false, isMysterious: false, isHarmful: false },
        { name: "Sea Turtle", image: "/images/turtle.jpg", description: "Migratory reptile found in tropical oceans.", isExtinct: false, isMysterious: false, isHarmful: false },
      ],
    },
    {
      name: "Twilight Zone",
      description: "This layer receives very little sunlight and is home to unique creatures with bioluminescence.",
      image: second,
      creatures: [
        { name: "Giant Squid", image: "/images/giant-squid.jpg", description: "Rare and mysterious deep-sea predator.", isExtinct: false, isMysterious: true, isHarmful: false },
        { name: "Hatchetfish", image: "/images/hatchetfish.jpg", description: "Small fish with glowing features.", isExtinct: false, isMysterious: false, isHarmful: false },
      ],
    },
    {
      name: "Midnight Zone",
      description: "Completely dark, extreme pressure, and home to bioluminescent species.",
      image: third,
      creatures: [
        { name: "Anglerfish", image: "/images/anglerfish.jpg", description: "Uses a glowing lure to attract prey.", isExtinct: false, isMysterious: true, isHarmful: false },
        { name: "Vampire Squid", image: "/images/vampire-squid.jpg", description: "Mysterious squid with unique defense mechanisms.", isExtinct: false, isMysterious: true, isHarmful: false },
      ],
    },
    {
      name: "Abyssal Zone",
      description: "Extreme cold and high pressure, home to unique organisms.",
      image: four,
      creatures: [
        { name: "Gulper Eel", image: "/images/gulper-eel.jpg", description: "Has an enormous mouth for swallowing prey.", isExtinct: false, isMysterious: true, isHarmful: false },
        { name: "Dumbo Octopus", image: "/images/dumbo-octopus.jpg", description: "A rare deep-sea octopus.", isExtinct: false, isMysterious: true, isHarmful: false },
      ],
    },
    {
      name: "Hadal Zone",
      description: "The deepest parts of the ocean, mostly unexplored.",
      image: five,
      creatures: [
        { name: "Frilled Shark", image: "/images/frilled-shark.jpg", description: "A prehistoric deep-sea predator.", isExtinct: false, isMysterious: true, isHarmful: true },
        { name: "Amphipod", image: "/images/amphipod.jpg", description: "A tiny but resilient deep-sea creature.", isExtinct: false, isMysterious: false, isHarmful: false },
      ],
    },
  ];

  const fetchWikipediaInfo = async (creature) => {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${creature.name}`);
      const data = await response.json();
      setCreatureInfo({
        name: creature.name,
        image: data.thumbnail?.source || creature.image,
        description: data.extract || creature.description,
      });
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
      setCreatureInfo(creature);
    }
  };

  return (
    <div className="destination-page">
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="video-overlay"></div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>

      {/* Scrollable Content */}
      <div className="destination-content">
        <h1>Explore the Layers of the Ocean</h1>
        {seaLayers.map((layer, index) => (
          <div key={index} className="sea-layer">
            <h2>{layer.name}</h2>
            <p>{layer.description}</p>
            <div className="image-container">
              <img src={layer.image} alt={layer.name} className="layer-image" />
            </div>
            <div className="creatures-list">
              {layer.creatures.map((creature, idx) => (
                <button key={idx} className="creature-button" onClick={() => fetchWikipediaInfo(creature)}>
                  {creature.name} 
                  {creature.isExtinct && " (Extinct)"}
                  {creature.isMysterious && " (Mysterious)"}
                  {creature.isHarmful && " (Harmful)"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creature Details */}
      {creatureInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setCreatureInfo(null)}>&times;</button>
            <h2>{creatureInfo.name}</h2>
            <img src={creatureInfo.image} alt={creatureInfo.name} />
            <p>{creatureInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destination;
