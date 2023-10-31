import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { planesInCube, squaresInCube } from './constants.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getSide: () => THREE.DoubleSide,
  getPI: () => Math.PI / 2,
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, __.getWidth() / __.getHeight(), 1e-1, 1e4)
camera.position.set(+2.5, +2.5, +2.5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

const createPlane = (color) => {
  if (!color) throw new Error('It has no color!')

  return new THREE.Mesh(
    new THREE.PlaneGeometry(+1.0, +1.0),
    new THREE.MeshBasicMaterial({ color, side: __.getSide(), }),
  )
}

const createSquare = (...colors) => {
  if (colors.length != 6) throw new Error('It must to have 6 colors!')

  const group = new THREE.Group()

  colors.map((color, ix) => {
    const plane = createPlane(color)
    group.add(plane)
    plane.position.set(planesInCube[ix][0], planesInCube[ix][1], planesInCube[ix][2],)
    plane.rotation.set(planesInCube[ix][3], planesInCube[ix][4], planesInCube[ix][5],)

    return plane
  })

  return group
}

const cube = new THREE.Group()
scene.add(cube)

Array.from(Array(27)).map((_, ix) => {
  const sqare = createSquare(
    0xff0000, // red
    0x0000ff, // blue
    0xffffff, // white
    0x00ff00, // green
    0xff9900, // orange
    0xffff00, // yellow
  )

  sqare.position.set(
    squaresInCube[ix][0] * +1.1,
    squaresInCube[ix][1] * +1.1,
    squaresInCube[ix][2] * +1.1,
  )

  cube.add(sqare)
})

const controls = new OrbitControls(camera, renderer.domElement)

const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
