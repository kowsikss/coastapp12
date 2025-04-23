const Footer = () => {
    return (
      <footer style={{ backgroundColor: "#002244", color: "#fff", padding: "30px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "0 20px" }}>
          {/* Quick Links */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Quick Links</h3>
            <a href="#" style={{ color: "#ffcc00", textDecoration: "none", margin: "0 15px" }}>Home</a>
            <a href="#" style={{ color: "#ffcc00", textDecoration: "none", margin: "0 15px" }}>Destinations</a>
            <a href="#" style={{ color: "#ffcc00", textDecoration: "none", margin: "0 15px" }}>Activities</a>
            <a href="#" style={{ color: "#ffcc00", textDecoration: "none", margin: "0 15px" }}>Gallery</a>
            <a href="#" style={{ color: "#ffcc00", textDecoration: "none", margin: "0 15px" }}>Blog</a>
          </div>
  
          {/* Legal Links */}
          <div style={{ marginBottom: "15px" }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>Terms & Conditions</a> |
            <a href="#" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>Privacy Policy</a> |
            <a href="#" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>Contact Us</a>
          </div>
  
          {/* Copyright */}
          <div>
            <p style={{ margin: "0" }}>&copy; 2025 Ministry Of Climate and Forest, Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  