function Footer() {
  return (
    <footer className="page-footer red darken-1">
      <div className="footer-copyright">
        <div className="container" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Tuning Company
        </div>
      </div>
    </footer>
  );
}

export { Footer };
