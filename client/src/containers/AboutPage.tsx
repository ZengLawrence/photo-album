import { Fragment } from "react"
import { Jumbotron } from "react-bootstrap"
import { AppNavBar } from "../components/AppNavBar"

function Icons8Link() {
  return (
    <p style={{fontSize: "smaller"}}>
      <a target="_blank" rel="noreferrer" href="https://icons8.com/icons/set/stack-of-photos--v1">Photo Gallery icon</a> icon by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a>
    </p>
  )
}

export const AboutPage = () => {
  return (
    <Fragment>
      <AppNavBar />
      <Jumbotron>
        <h1>Photo Album</h1>
        <p>Photo Album is browser based photo album software for everyday usage and runs on your own WIFI network.</p>
      </Jumbotron>
      <div className="d-flex justify-content-center">
        <Icons8Link />
      </div>
    </Fragment>
  )
}