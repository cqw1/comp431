const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {

    velocity[0] += delta * acceleration[0]
    velocity[1] += delta * acceleration[1]

    position[0] += delta * velocity[0]
    position[1] += delta * velocity[1]

    position[0] = ((position[0] % canvas.width) + canvas.width) % canvas.width
    position[1] = ((position[1] % canvas.height) + canvas.height) % canvas.height

    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
