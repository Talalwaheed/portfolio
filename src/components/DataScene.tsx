import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const primaryGreen = new THREE.Color("#687259");
const subtleSand = new THREE.Color("#c2c5b4");

function LossLandscape({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rows = 32;
  const cols = 32;

  const { geometry, originalPositions } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(32, 24, cols - 1, rows - 1);
    const pos = geom.attributes.position;
    const originals = new Float32Array(pos.array.length);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.35) * Math.cos(y * 0.35) * 1.3 -
        Math.exp(-(x * x + y * y) * 0.03) * 1.8;

      pos.setZ(i, z);
      originals[i * 3] = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
    }

    geom.computeVertexNormals();
    return { geometry: geom, originalPositions: originals };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.033);
    const sp = scrollProgress.current;
    const time = state.clock.elapsedTime * 0.35;
    const pos = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      const dynamicZ =
        oz +
        Math.sin(ox * 0.35 + time) * 0.2 +
        Math.cos(oy * 0.3 + time * 0.6) * 0.15;
      pos.setZ(i, dynamicZ);
    }
    pos.needsUpdate = true;

    // Constrained motion so the landscape always stays visible in the lower viewport
    const targetY = -2.4 - sp * 1.8;
    const targetRotX = -Math.PI / 2.35 + sp * 0.15;
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 2.5, dt);
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 2.5, dt);

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      // Kept at a clean, visible baseline (minimum 0.24 opacity)
      const targetOpacity = Math.max(0.24, 0.38 - sp * 0.14);
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 2.5, dt);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.35, 0, 0]}
      position={[0, -2.4, -4.5]}
    >
      <meshStandardMaterial
        color={subtleSand}
        wireframe
        transparent
        opacity={0.35}
        roughness={0.6}
      />
    </mesh>
  );
}

function GlobalDataParticles({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 380;

  // Spanned across a much taller height (Y: -20 to +20) so you never scroll past the particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 9.5;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const dt = Math.min(delta, 0.033);
    const sp = scrollProgress.current;

    // Continuous slow orbit combined with smooth scroll reactivity
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03 + sp * 1.2;
    
    // Slow drift that tracks scroll without vanishing
    const targetY = -sp * 6;
    pointsRef.current.position.y = THREE.MathUtils.damp(pointsRef.current.position.y, targetY, 2.5, dt);

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (mat) {
      // Kept at a minimum 0.32 opacity so particles are distinctly visible at the bottom
      const targetOpacity = Math.max(0.32, 0.55 - sp * 0.2);
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 2.5, dt);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color={primaryGreen}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  return (
    <>
      <fog attach="fog" args={["#f7f5ed", 10, 32]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[-5, 8, 6]} intensity={1.8} color="#e5e2d3" />
      <pointLight position={[0, 2, 4]} intensity={5} color="#8a9477" />

      <group scale={isMobile ? 0.72 : 1}>
        <LossLandscape scrollProgress={scrollProgress} />
        <GlobalDataParticles scrollProgress={scrollProgress} />
      </group>
    </>
  );
}

export function DataScene() {
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 7.5], fov: 46 }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true,
          alpha: true,
        }}
      >
        <color attach="background" args={["#f7f5ed"]} />
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}