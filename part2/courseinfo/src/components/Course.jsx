const Header = (props) => {
  return <h2>{props.course}</h2>
}

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  return props.parts.map((item) => (
    <Part key={item.id} {...item} />
  ))
}

const Total = (props) => {
  return <p><b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course