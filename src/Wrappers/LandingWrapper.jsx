import Navbar from '../Components/layout/Navbar/Navbar';
import Footer from '../Components/layout/Footer';

const LandingWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingWrapper;
