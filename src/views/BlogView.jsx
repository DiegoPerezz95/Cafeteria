import { Col, Row } from 'react-bootstrap'
import BlogCard from '../components/BlogCard'
import { obtenerBlogs } from '../data/datos'

function BlogView() {
  return (
    <section>
      <h1>Blog</h1>
      <p className="text-muted">Noticias, recetas y consejos de nuestro equipo.</p>
      <Row xs={1} md={2} className="g-4">
        {obtenerBlogs().map((blog) => (
          <Col key={blog.id}>
            <BlogCard blog={blog} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default BlogView
