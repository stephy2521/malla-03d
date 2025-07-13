// Escena básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear nodos (esferas) y líneas
const nodes = [];
const lines = new THREE.Group();
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

for (let i = 0; i < 20; i++) {
  const geometry = new THREE.SphereGeometry(0.5, 8, 8);
  const node = new THREE.Mesh(geometry, nodeMaterial);
  node.position.set(
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30
  );
  nodes.push(node);
  scene.add(node);
}

// Conectar nodos con líneas
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dist = nodes[i].position.distanceTo(nodes[j].position);
    if (dist < 12) {
      const points = [
        nodes[i].position.clone(),
        nodes[j].position.clone()
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      lines.add(line);
    }
  }
}

scene.add(lines);

// Rotación automática + interacción
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  // Rotación interactiva
  scene.rotation.y += 0.002 + mouseX * 0.001;
  scene.rotation.x += 0.002 + mouseY * 0.001;

  renderer.render(scene, camera);
}

animate();
