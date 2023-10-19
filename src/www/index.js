import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, __.getWidth() / __.getHeight(), 1e-1, 1e4)
camera.position.set(2.5, 2.5, 2.5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

scene.add(new THREE.GridHelper(10, 10))

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x990099 }),
)
scene.add(cube)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  cube.rotation.x += 1e-2
  cube.rotation.y += 1e-2

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
