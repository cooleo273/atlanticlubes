import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export function Cobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const focusRef = useRef<[number, number]>([0, 0]);
  const [distributor, setDistributor] = useState<{
    name: string;
    email: string;
    contact: string;
    country: string;
  } | null>(null);

  const distributors = {
    "San Francisco": {
      name: "John Doe",
      email: "john.doe@company.com",
      contact: "+1-123-456-7890",
      country: "USA",
    },
    Berlin: {
      name: "Anna Schmidt",
      email: "anna.schmidt@company.com",
      contact: "+49-30-12345678",
      country: "Germany",
    },
    Tokyo: {
      name: "Takashi Yamamoto",
      email: "takashi.yamamoto@company.com",
      contact: "+81-3-1234-5678",
      country: "Japan",
    },
    "Buenos Aires": {
      name: "Carlos López",
      email: "carlos.lopez@company.com",
      contact: "+54-11-1234-5678",
      country: "Argentina",
    },
  };

  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [37.78, -122.412], size: 0.1 },
        { location: [52.52, 13.405], size: 0.1 },
        { location: [35.676, 139.65], size: 0.1 },
        { location: [-34.6, -58.38], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;

        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
         <canvas
        ref={canvasRef}
        style={{
          width: "80%",
          height: "80%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
        
      />
      <div
        className="flex flex-col md:flex-row justify-center items-center control-buttons"
        style={{ gap: ".5rem" }}
      >
        Rotate to:
        <button
          className="bg-black hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={() => {
            focusRef.current = locationToAngles(37.78, -122.412);
            setDistributor(distributors["San Francisco"]);
          }}
        >
          📍 San Francisco
        </button>
        <button
        className="bg-black hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={() => {
            focusRef.current = locationToAngles(52.52, 13.405);
            setDistributor(distributors["Berlin"]);
          }}
        >
          📍 Berlin
        </button>
        <button
        className="bg-black hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={() => {
            focusRef.current = locationToAngles(35.676, 139.65);
            setDistributor(distributors["Tokyo"]);
          }}
        >
          📍 Tokyo
        </button>
        <button
        className="bg-black hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={() => {
            focusRef.current = locationToAngles(-34.6, -58.38);
            setDistributor(distributors["Buenos Aires"]);
          }}
        >
          📍 Buenos Aires
        </button>
      </div>
      {distributor && (
  <div
    style={{
      marginTop: "0.5rem",
      padding: "1rem",
      border: "1px solid #2563eb",
      borderRadius: "10px",
      backgroundColor: "black",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "absolute",
      top: "-10px",
      right: "-4rem",
      width: "300px"
    }}
  >
    <h3
      style={{
        borderBottom: "2px solid white",
        paddingBottom: "0.5rem",
        marginBottom: "1rem",
        fontSize: "1.25rem",
        color: "white"
      }}
    >Distributor Details</h3>
    <p style={{ margin: "0.5rem 0", color: "white" }}><strong>Name:</strong> {distributor.name}</p>
    <p style={{ margin: "0.5rem 0", color: "white" }}><strong>Email:</strong> {distributor.email}</p>
    <p style={{ margin: "0.5rem 0", color: "white" }}><strong>Contact:</strong> {distributor.contact}</p>
    <p style={{ margin: "0.5rem 0", color: "white" }}><strong>Country:</strong> {distributor.country}</p>
  </div>
)}

   
    
    </div>
  );
}


<style>{`
  .control-buttons button {
    background: rgba(155, 155, 155, 0.2);
    border-radius: 9px;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
  }
`}</style>
