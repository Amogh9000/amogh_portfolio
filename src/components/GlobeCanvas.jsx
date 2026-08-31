import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Converts Lat / Long to 3D Cartesian Vector3 on sphere of given radius
const latLongToVector3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Target Nodes coordinates
const NODES = {
  samsung: {
    id: "samsung",
    label: "[ SAMSUNG PRISM // BLR ]",
    coords: [12.9716, 77.5946],
    offset: [0.15, 0.12, 0],
  },
  edunet: {
    id: "edunet",
    label: "[ EDUNET // BLR ]",
    coords: [12.9716, 77.5946],
    offset: [-0.15, -0.12, 0],
  },
};

// Generates an equirectangular world map Canvas and samples points over landmasses
const createWorldParticles = (radius = 2.5, pointDensity = 14000) => {
  const positions = [];
  const sizes = [];

  // Create offscreen canvas for world map landmass sampling
  const canvas = document.createElement("canvas");
  const width = 200;
  const height = 100;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Procedural sharp continent approximation canvas drawing
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";

  // Americas
  ctx.beginPath();
  // North America
  ctx.ellipse(45, 30, 22, 14, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(25, 20, 30, 18);
  // South America
  ctx.ellipse(60, 70, 12, 20, 0.2, 0, 2 * Math.PI);
  ctx.fill();

  // Europe & Asia & Africa
  ctx.beginPath();
  // Europe
  ctx.ellipse(105, 25, 14, 10, 0, 0, 2 * Math.PI);
  // Africa
  ctx.ellipse(108, 55, 15, 18, 0, 0, 2 * Math.PI);
  // Asia
  ctx.ellipse(142, 30, 28, 16, -0.1, 0, 2 * Math.PI);
  // India Subcontinent
  ctx.ellipse(138, 45, 10, 12, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Australia / Oceania
  ctx.beginPath();
  ctx.ellipse(168, 72, 12, 9, 0.1, 0, 2 * Math.PI);
  ctx.fill();

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const totalPoints = pointDensity;
  for (let i = 0; i < totalPoints; i++) {
    // Fibonacci sphere point distribution
    const phi = Math.acos(1 - (2 * (i + 0.5)) / totalPoints);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

    // Map spherical coordinates (phi, theta) to canvas (x, y)
    const u = (theta / (2 * Math.PI)) % 1;
    const v = phi / Math.PI;

    const xImg = Math.floor(u * width);
    const yImg = Math.floor(v * height);
    const index = (yImg * width + xImg) * 4;

    // Check if pixel represents landmass
    if (data[index] > 128) {
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions.push(x, y, z);
      sizes.push(0.038);
    }
  }

  return {
    positions: new Float32Array(positions),
    sizes: new Float32Array(sizes),
  };
};

// 3D Dotted World Continents Mesh
const DottedWorldGlobe = ({ radius = 2.5 }) => {
  const pointsRef = useRef();

  const { positions } = useMemo(
    () => createWorldParticles(radius, 16000),
    [radius]
  );

  return (
    <group>
      {/* Light Grey Inner Sphere Base */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 48, 48]} />
        <meshBasicMaterial color="#d4d4d8" transparent opacity={0.65} />
      </mesh>

      {/* Industrial Dark Charcoal Landmass Continent Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.042}
          color="#18181b"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// Precise Black Target Pin & Monospace Tooltip
const TargetPin = ({ node, radius, isActive, onHoverPin, onSelectPin }) => {
  const basePos = useMemo(
    () => latLongToVector3(node.coords[0], node.coords[1], radius * 1.01),
    [node.coords, radius]
  );

  // Apply slight visual offset for distinct markers at same city node
  const position = useMemo(
    () =>
      new THREE.Vector3(
        basePos.x + node.offset[0],
        basePos.y + node.offset[1],
        basePos.z + node.offset[2]
      ),
    [basePos, node.offset]
  );

  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + (Math.sin(clock.getElapsedTime() * 4) + 1) * 0.5;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverPin(node.id);
      }}
      onPointerOut={() => onHoverPin(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelectPin(node.id);
      }}
    >
      {/* Solid Black Core Node Pin */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Radar Ping Ripple Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.08, 0.11, 32]} />
        <meshBasicMaterial
          color="#000000"
          side={THREE.DoubleSide}
          transparent
          opacity={isActive ? 0.9 : 0.4}
        />
      </mesh>

      {/* Industrial Monospace Floating Label */}
      <Html position={[0, 0.22, 0]} center distanceFactor={7}>
        <div
          className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase whitespace-nowrap border-2 border-black transition-all duration-200 pointer-events-none select-none ${
            isActive
              ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-105"
              : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
};

// Main R3F Globe Scene with Smooth Camera Lerp
const GlobeScene = ({ activeId, hoverId, onHoverPin, onSelectPin }) => {
  const globeGroupRef = useRef();
  const radius = 2.5;

  const targetRotation = useRef({ x: 0, y: 0 });

  // Compute rotation angle to center Bangalore (Lat: 12.9716, Long: 77.5946)
  useEffect(() => {
    const lat = 12.9716;
    const lng = 77.5946;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    targetRotation.current = {
      x: phi - Math.PI / 2,
      y: -theta - Math.PI / 2,
    };
  }, []);

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      const isFocused = Boolean(activeId || hoverId);

      if (isFocused) {
        // Smooth lerp camera focus directly onto Bangalore node
        globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.x,
          targetRotation.current.x,
          delta * 3.0
        );
        globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.y,
          targetRotation.current.y,
          delta * 3.0
        );
      } else {
        // Slow ambient rotation when un-focused
        globeGroupRef.current.rotation.y += delta * 0.12;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 12, 5]} intensity={1.2} />
      <group ref={globeGroupRef}>
        <DottedWorldGlobe radius={radius} />
        <TargetPin
          node={NODES.samsung}
          radius={radius}
          isActive={activeId === "samsung" || hoverId === "samsung"}
          onHoverPin={onHoverPin}
          onSelectPin={onSelectPin}
        />
        <TargetPin
          node={NODES.edunet}
          radius={radius}
          isActive={activeId === "edunet" || hoverId === "edunet"}
          onHoverPin={onHoverPin}
          onSelectPin={onSelectPin}
        />
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={!activeId && !hoverId}
        autoRotateSpeed={0.6}
      />
    </>
  );
};

export default function GlobeCanvas({
  activeId,
  hoverId,
  onHoverPin,
  onSelectPin,
}) {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeScene
          activeId={activeId}
          hoverId={hoverId}
          onHoverPin={onHoverPin}
          onSelectPin={onSelectPin}
        />
      </Canvas>
    </div>
  );
}
