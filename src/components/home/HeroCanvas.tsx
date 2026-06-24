'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HeroCanvasProps {
  viewState: 'HERO' | 'PORTFOLIO'
  activeIndex: number | null
  onNodeClick?: (index: number) => void
}

export default function HeroCanvas({ viewState, activeIndex, onNodeClick }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  
  // Keep states in refs so loop always has access to latest values without re-triggering effect
  const viewStateRef = useRef(viewState)
  viewStateRef.current = viewState
  
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  // Smooth mouse coordinates tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // 1. Scene setup
    const scene = new THREE.Scene()
    
    // Add subtle ambient fog to feel like a deep space void
    scene.fog = new THREE.FogExp2(0x020304, 0.08)

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 7

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0a1128, 1.5)
    scene.add(ambientLight)

    // Intense high-voltage cyan point light representing our Blue electricity
    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 15)
    cyanLight.position.set(2, 2, 2)
    scene.add(cyanLight)

    // Gold circuit tracer light
    const goldLight = new THREE.PointLight(0xfbbf24, 3, 15)
    goldLight.position.set(-2, -2, 2)
    scene.add(goldLight)

    // 5. Creating our 3D Geometries
    // To enable smooth fracturing/morphing, we create 3 clusters of geometries.
    // In HERO mode, we merge their positions at (0, 0, 0) to form a unified, highly complex multi-layered structure.
    // In PORTFOLIO mode, we drift them apart into left (-2.5, 0.5, 0), center (0, -0.6, -0.5), and right (2.5, 0.5, 0) nodes.

    // Cluster A: Left - Creative Production (Cyan Core)
    const clusterAGroup = new THREE.Group()
    const geoA = new THREE.IcosahedronGeometry(1.2, 1)
    const matA = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const meshA = new THREE.Mesh(geoA, matA)
    clusterAGroup.add(meshA)

    // Inside Cluster A: tiny cluster particles
    const particleGeoA = new THREE.BufferGeometry()
    const pCountA = 80
    const pPositionsA = new Float32Array(pCountA * 3)
    for (let i = 0; i < pCountA * 3; i += 3) {
      // Random shell distribution
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 0.4 + Math.random() * 0.6
      pPositionsA[i] = r * Math.sin(phi) * Math.cos(theta)
      pPositionsA[i+1] = r * Math.sin(phi) * Math.sin(theta)
      pPositionsA[i+2] = r * Math.cos(phi)
    }
    particleGeoA.setAttribute('position', new THREE.BufferAttribute(pPositionsA, 3))
    const particleMatA = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    })
    const particlesA = new THREE.Points(particleGeoA, particleMatA)
    clusterAGroup.add(particlesA)
    scene.add(clusterAGroup)

    // Cluster B: Center - SEO & Digital Dominance (Gold Sphere)
    const clusterBGroup = new THREE.Group()
    const geoB = new THREE.OctahedronGeometry(1.0, 1)
    const matB = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    const meshB = new THREE.Mesh(geoB, matB)
    clusterBGroup.add(meshB)

    // Inner core sphere for Cluster B
    const geoBInner = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const matBInner = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const meshBInner = new THREE.Mesh(geoBInner, matBInner)
    clusterBGroup.add(meshBInner)
    scene.add(clusterBGroup)

    // Cluster C: Right - Luxury Lifestyle Content (Bi-color Core)
    const clusterCGroup = new THREE.Group()
    // Ring-like torus knot representing continuous media streams
    const geoC = new THREE.TorusKnotGeometry(0.7, 0.2, 50, 6, 2, 3)
    const matC = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const meshC = new THREE.Mesh(geoC, matC)
    clusterCGroup.add(meshC)

    // Sparkly golden nodes for Cluster C
    const particleGeoC = new THREE.BufferGeometry()
    const pCountC = 60
    const pPositionsC = new Float32Array(pCountC * 3)
    for (let i = 0; i < pCountC * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2
      const rad = 0.8 + Math.random() * 0.4
      pPositionsC[i] = rad * Math.cos(theta)
      pPositionsC[i+1] = rad * Math.sin(theta)
      pPositionsC[i+2] = (Math.random() - 0.5) * 0.5
    }
    particleGeoC.setAttribute('position', new THREE.BufferAttribute(pPositionsC, 3))
    const particleMatC = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.04,
      transparent: true,
      opacity: 0.9,
    })
    const particlesC = new THREE.Points(particleGeoC, particleMatC)
    clusterCGroup.add(particlesC)
    scene.add(clusterCGroup)

    // 6. Volumetric golden Tracer beam line that travels across space
    const tracerPoints = []
    const tracerCount = 20
    for (let i = 0; i < tracerCount; i++) {
      tracerPoints.push(new THREE.Vector3(0, 0, 0))
    }
    const tracerGeo = new THREE.BufferGeometry().setFromPoints(tracerPoints)
    const tracerMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.6,
    })
    const tracerLine = new THREE.Line(tracerGeo, tracerMat)
    scene.add(tracerLine)

    // Current positions interpolators
    const currentPosA = new THREE.Vector3(0, 0, 0)
    const currentPosB = new THREE.Vector3(0, 0, 0)
    const currentPosC = new THREE.Vector3(0, 0, 0)

    // Cluster Target Coordinates:
    // HERO mode: concentrated in the center
    const heroPosA = new THREE.Vector3(0, 0, 0)
    const heroPosB = new THREE.Vector3(0, 0, 0)
    const heroPosC = new THREE.Vector3(0, 0, 0)

    // PORTFOLIO mode: expanded nodes in a digital void
    // Staggered slightly in Z for a real 3D depth field experience
    const portPosA = new THREE.Vector3(-2.8, 0.4, 0.3)
    const portPosB = new THREE.Vector3(0, -0.6, -0.5)
    const portPosC = new THREE.Vector3(2.8, 0.5, 0.8)

    // Track original mesh scales for pulsing effect
    const origScaleA = meshA.scale.clone()
    const origScaleB = meshB.scale.clone()
    const origScaleC = meshC.scale.clone()

    // 7. Responsive scaling and resizing
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Adjust camera / cluster scales for smaller screens (mobiles)
      if (w < 768) {
        camera.position.z = 9
        // Compact positions slightly so they don't drift off-screen
        portPosA.set(-1.6, 1.2, 0)
        portPosB.set(0, -0.8, 0)
        portPosC.set(1.6, 1.0, 0)
      } else {
        camera.position.z = 7
        portPosA.set(-2.8, 0.4, 0.3)
        portPosB.set(0, -0.6, -0.5)
        portPosC.set(2.8, 0.5, 0.8)
      }
    }
    
    // Call once initially
    handleResize()
    window.addEventListener('resize', handleResize)

    // Animation variables
    let clock = new THREE.Clock()

    // Camera target positions for detail zooms
    const camTargetPos = new THREE.Vector3(0, 0, 7)
    const camTargetLookAt = new THREE.Vector3(0, 0, 0)
    const camCurrentLookAt = new THREE.Vector3(0, 0, 0)

    // 8. Visual Animation Loop
    const animate = () => {
      const time = clock.getElapsedTime()

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Setup interpolation targets based on active viewstate
      const activeState = viewStateRef.current
      const activeIdx = activeIndexRef.current

      let targetA = heroPosA
      let targetB = heroPosB
      let targetC = heroPosC

      if (activeState === 'PORTFOLIO') {
        targetA = portPosA
        targetB = portPosB
        targetC = portPosC
      }

      // Smoothly interpolate cluster positions
      currentPosA.lerp(targetA, 0.06)
      currentPosB.lerp(targetB, 0.06)
      currentPosC.lerp(targetC, 0.06)

      clusterAGroup.position.copy(currentPosA)
      clusterBGroup.position.copy(currentPosB)
      clusterCGroup.position.copy(currentPosC)

      // Slow constant aesthetic rotate + React to Mouse Coordinate (tilting)
      clusterAGroup.rotation.y = time * 0.15 + mx * 0.2
      clusterAGroup.rotation.x = time * 0.1 + my * 0.2
      
      clusterBGroup.rotation.y = -time * 0.2 + mx * 0.15
      clusterBGroup.rotation.z = time * 0.15 + my * 0.15

      clusterCGroup.rotation.y = time * 0.1 - mx * 0.2
      clusterCGroup.rotation.x = -time * 0.12 - my * 0.2

      // "Pulsating" breathing geometries mimicking "Creativity & Strategy" data rates
      const breath = Math.sin(time * 2) * 0.06
      meshA.scale.copy(origScaleA).multiplyScalar(1 + breath)
      meshB.scale.copy(origScaleB).multiplyScalar(1 - breath * 1.2)
      meshC.scale.copy(origScaleC).multiplyScalar(1 + breath * 0.8)

      // Move light positions dynamically for volumetric shadow feel
      cyanLight.position.x = 2 * Math.cos(time * 0.8) + mx * 1.5
      cyanLight.position.y = 2 * Math.sin(time * 0.6) + my * 1.5
      cyanLight.position.z = 2 + Math.sin(time * 0.5)

      goldLight.position.x = -2 * Math.sin(time * 0.7) - mx * 1.5
      goldLight.position.y = -2 * Math.cos(time * 0.9) - my * 1.5

      // Continuous golden circuit board tracer line calculation
      // Draws path connecting Cluster A -> Cluster B -> Cluster C -> Cluster A
      const linePositions = tracerLine.geometry.attributes.position.array as Float32Array
      // Setup dynamic curved interpolation path
      const pointsArray = []
      // Cluster positions
      const pA = clusterAGroup.position
      const pB = clusterBGroup.position
      const pC = clusterCGroup.position

      for (let i = 0; i < tracerCount; i++) {
        const ratio = i / (tracerCount - 1)
        let pt = new THREE.Vector3()
        if (ratio < 0.5) {
          // Path from A to B
          pt.lerpVectors(pA, pB, ratio * 2)
          // Add sine wave curve for electrical tracer effect
          pt.y += Math.sin(ratio * Math.PI) * 0.35 * Math.sin(time * 4)
        } else {
          // Path from B to C
          pt.lerpVectors(pB, pC, (ratio - 0.5) * 2)
          pt.x += Math.sin((ratio - 0.5) * Math.PI) * 0.35 * Math.sin(time * 4)
        }
        pointsArray.push(pt)
      }

      // Update tracer line vertices
      for (let i = 0; i < tracerCount; i++) {
        linePositions[i * 3] = pointsArray[i].x
        linePositions[i * 3 + 1] = pointsArray[i].y
        linePositions[i * 3 + 2] = pointsArray[i].z
      }
      tracerLine.geometry.attributes.position.needsUpdate = true

      // Camera zoom details when clicking on a card in PORTFOLIO mode
      if (activeState === 'PORTFOLIO' && activeIdx !== null) {
        // Zoom and align closely to selected node
        if (activeIdx === 0) {
          camTargetPos.set(portPosA.x, portPosA.y, portPosA.z + 1.8)
          camTargetLookAt.copy(portPosA)
        } else if (activeIdx === 1) {
          camTargetPos.set(portPosB.x, portPosB.y, portPosB.z + 1.8)
          camTargetLookAt.copy(portPosB)
        } else if (activeIdx === 2) {
          camTargetPos.set(portPosC.x, portPosC.y, portPosC.z + 1.8)
          camTargetLookAt.copy(portPosC)
        }
      } else {
        // Default standard angles
        if (activeState === 'PORTFOLIO') {
          // Slightly angled panoramic view of the floating digital void
          camTargetPos.set(mx * 0.5, -0.2 + my * 0.5, 6.2)
          camTargetLookAt.set(0, 0, 0)
        } else {
          // Centered hero camera, tilts gently on mouse coordinates
          camTargetPos.set(mx * 0.8, my * 0.8, 6.5)
          camTargetLookAt.set(0, 0, 0)
        }
      }

      // Lerp Camera vectors smoothly
      camera.position.lerp(camTargetPos, 0.05)
      camCurrentLookAt.lerp(camTargetLookAt, 0.05)
      camera.lookAt(camCurrentLookAt)

      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    // Cleanup resources
    return () => {
      window.removeEventListener('resize', handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      container.removeChild(renderer.domElement)

      // Dispose scenes geometries and materials properly to preserve performance
      geoA.dispose()
      matA.dispose()
      particleGeoA.dispose()
      particleMatA.dispose()
      
      geoB.dispose()
      matB.dispose()
      geoBInner.dispose()
      matBInner.dispose()

      geoC.dispose()
      matC.dispose()
      particleGeoC.dispose()
      particleMatC.dispose()

      tracerGeo.dispose()
      tracerMat.dispose()

      renderer.dispose()
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ overflow: 'hidden' }}
    >
      <div 
        id="aistudio_canvas_container"
        ref={containerRef} 
        className="w-full h-full"
      />
    </div>
  )
}
