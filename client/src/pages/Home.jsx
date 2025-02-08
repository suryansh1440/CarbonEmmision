import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import Earth from '../components/Earth'
import { gsap } from 'gsap'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const preventDefault = (e) => {
      const delta = e.deltaY;
      const container = document.getElementById('scroll-container');
      container.scrollBy({
        top: delta,
        behavior: 'smooth'
      });
      e.preventDefault();
    };
    
    document.addEventListener('wheel', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', preventDefault);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(".title", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".subtitle", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo(".cta-button", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-screen snap-start bg-gradient-to-b from-[#000000] via-[#001233] to-[#001845]">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
            <color attach="background" args={['#000000']} />
            
            <ambientLight intensity={2} />
            <pointLight 
              position={[0, 0, 5]}
              intensity={2}
            />
            
            <Earth position={[0, 0, 0]} scale={4.5} />
            
            <Stars 
              radius={90} 
              depth={60} 
              count={10000} 
              factor={4} 
              saturation={0}
              fade={true}
              speed={1}
            />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
            <Environment preset="night" />
          </Canvas>
        </div>
        <div className="absolute inset-0 flex items-center justify-center flex-col h-screen z-10">
          <div className="title text-white text-6xl font-bold">CarbonTally</div>
          <div className="subtitle text-white text-2xl mt-6">Track your carbon footprint</div>
          <Link
            to={user?._id ? "" : "/login"}
            className="cta-button mt-8 bg-white text-black px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200 transition-colors text-xl"
          >
            {user?._id ? "Calculate your Emission" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
