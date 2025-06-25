const Footer = () => {
    const year=new Date();
     const footerstyle={
    backgroundColor:"green",
    fontSize:"30px",
    fontWeight:"bold",
    color:"white"
  }
  return (

    <div>
        <footer style={footerstyle}>
            copy right &copy; {year.getFullYear()}
        </footer>
    </div>
  )
}

export default Footer