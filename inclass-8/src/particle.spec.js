import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.mass).not.to.be.NaN

        expect(p.position).is.an('array')
        expect(p.position).to.have.lengthOf(2)
        expect(p.position[0]).not.to.be.NaN
        expect(p.position[1]).not.to.be.NaN

        expect(p.velocity).is.an('array')
        expect(p.velocity).to.have.lengthOf(2)
        expect(p.velocity[0]).not.to.be.NaN
        expect(p.velocity[1]).not.to.be.NaN

        expect(p.acceleration).is.an('array')
        expect(p.acceleration).to.have.lengthOf(2)
        expect(p.acceleration[0]).not.to.be.NaN
        expect(p.acceleration[1]).not.to.be.NaN
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const canvas = {width: 100, height: 100}
        const { position } = update(p, 1.0, canvas)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const canvas = {width: 100, height: 100}
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({velocity: [1, 1], acceleration: [-0.5, 0.5]})
        const canvas = {width: 100, height: 100}
        const { velocity } = update(p, 3.0, canvas)
        expect(velocity).to.eql([-0.5, 2.5])
    })

    it('particles should wrap around the world', () => {
        const canvas = {width: 100, height: 100}

        // Check off the left side.
        var p = particle({position: [-20, 50]})
        var { position } = update(p, 0, canvas)
        expect(position).to.eql([80, 50])

        // Check off the right side.
        var p = particle({position: [120, 50]})
        var { position } = update(p, 0, canvas)
        expect(position).to.eql([20, 50])

        // Check off the top side.
        var p = particle({position: [50, -20]})
        var { position } = update(p, 0, canvas)
        expect(position).to.eql([50, 80])

        // Check off the bottom side.
        var p = particle({position: [50, 120]})
        var { position } = update(p, 0, canvas)
        expect(position).to.eql([50, 20])
    })

})
