import './styles.css'

export default function Footer() {
  let year = new Date().getFullYear()

  return (
    <footer>
      <p>&copy; {year} Maths Rocks</p>
    </footer>
  );
}