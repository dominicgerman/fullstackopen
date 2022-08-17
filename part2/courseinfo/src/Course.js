const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((s, p) => s + p.exercises, 0)} />
  </div>
);

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

export default Course;
