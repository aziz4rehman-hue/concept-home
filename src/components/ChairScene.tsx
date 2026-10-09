import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

type Upholstery = { color: string; roughness: number; sheen: number }
type Wood = { color: string; grain: string }

/** Procedural wood-grain texture drawn on a canvas. */
function useWoodTexture(wood: Wood) {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 512
    const g = c.getContext('2d')!
    g.fillStyle = wood.color
    g.fillRect(0, 0, 256, 512)
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * 256
      g.strokeStyle = wood.grain
      g.globalAlpha = 0.12 + Math.random() * 0.25
      g.lineWidth = 0.6 + Math.random() * 2.2
      g.beginPath()
      g.moveTo(x, 0)
      for (let y = 0; y <= 512; y += 32) g.lineTo(x + Math.sin(y / 60 + i) * (4 + Math.random() * 3), y)
      g.stroke()
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    return t
  }, [wood.color, wood.grain])
}

function Chair({ up, wood }: { up: Upholstery; wood: Wood }) {
  const woodMap = useWoodTexture(wood)
  const fabric = (
    <meshPhysicalMaterial
      color={up.color}
      roughness={up.roughness}
      sheen={up.sheen}
      sheenRoughness={0.5}
      sheenColor={new THREE.Color(up.color).offsetHSL(0, 0, 0.2)}
      clearcoat={up.sheen === 0 ? 0.25 : 0}
    />
  )
  const woodMat = <meshStandardMaterial map={woodMap} roughness={0.55} />

  const legs: [number, number][] = [
    [-0.62, 0.42],
    [0.62, 0.42],
    [-0.62, -0.42],
    [0.62, -0.42],
  ]

  return (
    <group position={[0, -0.55, 0]}>
      {/* Wooden base frame */}
      <RoundedBox args={[1.5, 0.08, 1.05]} radius={0.03} position={[0, 0.3, 0]}>
        {woodMat}
      </RoundedBox>
      {legs.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.13, z]} rotation={[z > 0 ? 0.12 : -0.12, 0, x > 0 ? -0.12 : 0.12]}>
          <cylinderGeometry args={[0.035, 0.022, 0.32, 16]} />
          {woodMat}
        </mesh>
      ))}
      {/* Seat cushion */}
      <RoundedBox args={[1.18, 0.22, 0.9]} radius={0.09} smoothness={5} position={[0, 0.45, 0.05]}>
        {fabric}
      </RoundedBox>
      {/* Back */}
      <RoundedBox args={[1.42, 0.78, 0.2]} radius={0.09} smoothness={5} position={[0, 0.8, -0.44]} rotation={[-0.14, 0, 0]}>
        {fabric}
      </RoundedBox>
      {/* Arms */}
      {[-0.66, 0.66].map((x) => (
        <group key={x}>
          <RoundedBox args={[0.16, 0.48, 1.02]} radius={0.07} smoothness={5} position={[x, 0.58, 0]}>
            {fabric}
          </RoundedBox>
          <RoundedBox args={[0.2, 0.05, 1.04]} radius={0.02} position={[x, 0.84, 0]}>
            {woodMat}
          </RoundedBox>
        </group>
      ))}
      {/* Loose back cushion */}
      <RoundedBox args={[1.05, 0.46, 0.14]} radius={0.07} smoothness={5} position={[0, 0.78, -0.28]} rotation={[-0.2, 0, 0]}>
        {fabric}
      </RoundedBox>
    </group>
  )
}

export default function ChairScene({ up, wood, reduced }: { up: Upholstery; wood: Wood; reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [2.2, 1.3, 2.6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-label="3D lounge chair. Drag to rotate."
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={1.6} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 2]} scale={[6, 2, 1]} color="#fff6ea" />
        <Lightformer form="rect" intensity={1} position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} color="#ead9c3" />
        <Lightformer form="rect" intensity={0.6} position={[4, 1, -2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
      </Environment>
      <Chair up={up} wood={wood} />
      <ContactShadows position={[0, -0.55, 0]} opacity={0.42} scale={4} blur={2.4} far={1.2} color="#2B1F17" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
