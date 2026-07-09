import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Citizenship from './pages/Citizenship';
import Residence from './pages/Residence';
import BusinessMigration from './pages/BusinessMigration';
import DigitalNomad from './pages/DigitalNomad';
import About from './pages/About';
import Contact from './pages/Contact';
import ComingSoon from './components/ComingSoon';
import ScrollToTop from './components/ScrollToTop';
import { defaultCitizenshipSlug } from './data/citizenshipPrograms';
import { defaultResidenceSlug } from './data/residencePrograms';
import { defaultBusinessMigrationSlug } from './data/businessMigrationPrograms';
import { defaultDigitalNomadSlug } from './data/digitalNomadPrograms';
import WhatsAppFloat from './components/WhatsAppFloat';


// ss 
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizenship" element={<Navigate to={`/citizenship/${defaultCitizenshipSlug}`} replace />} />
        <Route path="/citizenship/:slug" element={<Citizenship />} />
        <Route path="/residence" element={<Navigate to={`/residence/${defaultResidenceSlug}`} replace />} />
        <Route path="/residence/:slug" element={<Residence />} />
        <Route path="/business-migration" element={<Navigate to={`/business-migration/${defaultBusinessMigrationSlug}`} replace />} />
        <Route path="/business-migration/:slug" element={<BusinessMigration />} />
        <Route path="/digital-nomad" element={<Navigate to={`/digital-nomad/${defaultDigitalNomadSlug}`} replace />} />
        <Route path="/digital-nomad/:slug" element={<DigitalNomad />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ComingSoon title="Our Services" />} />
        <Route path="*" element={<ComingSoon title="Not Found" />} />

      </Routes>
      <WhatsAppFloat />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
