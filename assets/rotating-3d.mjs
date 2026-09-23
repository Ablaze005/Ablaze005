// scripts/render-3d.mjs
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader }   from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const W = 1200, H = 400;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.02);

const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
camera.position.set(0, 0, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(W, H);
renderer.setClearColor(0x05050a);

const grid = new THREE.GridHelper(60, 60, 0x00f0ff, 0x1a0b2e);
grid.position.y = -2.5;
scene.add(grid);

scene.add(new THREE.PointLight(0x00f0ff, 60, 30).translateX(-5));
scene.add(new THREE.PointLight(0xff2daa, 60, 30).translateX(5));
scene.add(new THREE.PointLight(0x9d4edd, 40, 30).translateZ(-5));

new FontLoader().load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  font => {
    const geo = new TextGeometry('Ablaze Pariyar', {
      font, size: 1.2, height: 0.4, curveSegments: 8,
      bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.05
    });
    geo.center();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff, emissive: 0x9d4edd,
      emissiveIntensity: 1.6, metalness: 0.9, roughness: 0.15
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const clock = new THREE.Clock();
    (function loop() {
      const t = clock.getElapsedTime();
      mesh.rotation.y = Math.sin(t * 0.6) * 0.9;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }
);