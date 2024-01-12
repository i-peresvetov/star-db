import React, { Component } from "react"
import SwapiService from "../../services/swapi-service"
import Loading from "../loading"

import "./random-planet.css"

export default class RandomPlanet extends Component {
  swapiService = new SwapiService()

  state = {
    planet: {},
    loading: true
  }

  constructor() {
    super()
    this.updatePlanet()
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: true,
    })
  }

  updatePlanet() {
    const id = 12
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
  }

  render() {
    const { planet: {id, name, population, rotationPeriod, diameter }, loading } =
      this.state

    if (loading) {
      return (
        <div className="jumbotron rounded">
          <Loading />
        </div>
      )
    }

    return (
      <div className="random-planet jumbotron rounded">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Население</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Период вращения</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Диаметр</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
