import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { gsap } from 'gsap'

const Earth = ({ position, scale }) => {
  const earthRef = useRef()
  const cloudsRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    '/earth/daymap.jpg',
    '/earth/clouds.jpg'
  ])

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('scroll-container')
      if (container) {
        const scrollPosition = container.scrollTop
        const maxScroll = container.scrollHeight - container.clientHeight
        const progress = Math.min(scrollPosition / maxScroll, 1)
        setScrollProgress(progress)
      }
    }

    const container = document.getElementById('scroll-container')
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Handle hover animations
  useEffect(() => {
    if (earthRef.current && cloudsRef.current) {
      const duration = 0.5
      const ease = "power2.out"
      const targetScale = 1 - scrollProgress * 0.3
      
      if (hovered) {
        // Scale up effect with scroll consideration
        gsap.to(earthRef.current.scale, {
          x: scale * targetScale * 1.1,
          y: scale * targetScale * 1.1,
          z: scale * targetScale * 1.1,
          duration,
          ease
        })
        gsap.to(cloudsRef.current.scale, {
          x: scale * targetScale * 1.103,
          y: scale * targetScale * 1.103,
          z: scale * targetScale * 1.103,
          duration,
          ease
        })

        // Glow effect
        gsap.to(earthRef.current.material, {
          emissiveIntensity: 0.4,
          duration,
          ease
        })

        // Clouds opacity
        gsap.to(cloudsRef.current.material, {
          opacity: 0.6,
          duration,
          ease
        })
      } else {
        // Reset to normal state with scroll consideration
        gsap.to(earthRef.current.scale, {
          x: scale * targetScale,
          y: scale * targetScale,
          z: scale * targetScale,
          duration,
          ease
        })
        gsap.to(cloudsRef.current.scale, {
          x: scale * targetScale * 1.003,
          y: scale * targetScale * 1.003,
          z: scale * targetScale * 1.003,
          duration,
          ease
        })

        // Reset glow
        gsap.to(earthRef.current.material, {
          emissiveIntensity: 0,
          duration,
          ease
        })

        // Reset clouds opacity
        gsap.to(cloudsRef.current.material, {
          opacity: 0.4,
          duration,
          ease
        })
      }
    }
  }, [hovered, scale, scrollProgress])

  useFrame((state, delta) => {
    if (earthRef.current && cloudsRef.current) {
      const baseSpeed = delta * 0.1
      const rotationSpeed = hovered ? baseSpeed * 2 : baseSpeed
      
      // Base rotation
      earthRef.current.rotation.y += rotationSpeed
      cloudsRef.current.rotation.y += rotationSpeed * 1.2

      // Scroll-based animations
      const targetY = scrollProgress * Math.PI
      const targetX = scrollProgress * 2

      // Earth animations
      gsap.to(earthRef.current.rotation, {
        x: targetY,
        duration: 1,
        ease: "power2.out"
      })

      gsap.to(earthRef.current.position, {
        x: targetX,
        duration: 1,
        ease: "power2.out"
      })

      // Cloud animations
      gsap.to(cloudsRef.current.rotation, {
        x: targetY * 1.2,
        duration: 1,
        ease: "power2.out"
      })

      gsap.to(cloudsRef.current.position, {
        x: targetX * 1.05,
        duration: 1,
        ease: "power2.out"
      })

      // Add a slight tilt based on scroll
      earthRef.current.rotation.z = scrollProgress * 0.2
      cloudsRef.current.rotation.z = scrollProgress * 0.25
      
      // Add some vertical displacement to clouds
      cloudsRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.1
    }
  })

  const onHover = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const onHoverEnd = (e) => {
    e.stopPropagation()
    setHovered(false)
  }

  return (
    <group>
      {/* Earth */}
      <mesh
        ref={earthRef}
        position={position}
        scale={scale}
        onPointerOver={onHover}
        onPointerOut={onHoverEnd}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap}
          shininess={15}
          specular={0x333333}
          emissive={0x222222}
          emissiveIntensity={0}
        />
      </mesh>

      {/* Clouds */}
      <mesh
        ref={cloudsRef}
        position={position}
        scale={scale * 1.003}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

export default Earth