import React, { useState, useEffect } from 'react';
import { HardHat, Menu, X, Phone, Mail, MapPin, ChevronRight, Award, Users, Building2, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

const projects = [
  {
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    title: 'Metro Tower Complex',
    category: 'Commercial',
    year: '2024',
    description: 'A 40-story mixed-use development featuring premium office spaces and retail outlets in the heart of downtown.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    title: 'Riverside Residences',
    category: 'Residential',
    year: '2023',
    description: 'Luxury waterfront condominiums with panoramic river views and modern amenities.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1482731215275-a1f151646268?q=80&w=1170',
    title: 'Industrial Park Phase 2',
    category: 'Industrial',
    year: '2024',
    description: 'State-of-the-art logistics and distribution center with advanced automation systems.',
    images: [
      'https://images.unsplash.com/photo-1590496793907-3802b8fa2562?w=800&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80',
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    title: 'Gateway Office Campus',
    category: 'Commercial',
    year: '2023',
    description: 'Modern corporate campus with sustainable design and collaborative workspaces.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    title: 'Urban Heights',
    category: 'Residential',
    year: '2024',
    description: 'High-rise residential tower offering stunning city views and premium finishes.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
    title: 'Harbor Logistics Center',
    category: 'Industrial',
    year: '2023',
    description: 'Multi-level warehouse facility with direct port access and rail connectivity.',
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
      'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?q=80&w=1332',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80',
    ]
  },
];

const stats = [
  { number: '450+', label: 'Projects Completed' },
  { number: '25', label: 'Years Experience' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '200+', label: 'Team Members' },
];

const services = [
  {
    icon: Building2,
    title: 'Commercial Construction',
    description: 'Office buildings, retail spaces, and mixed-use developments built to exact specifications.',
  },
  {
    icon: Users,
    title: 'Residential Projects',
    description: 'Custom homes, multi-family housing, and residential communities with quality craftsmanship.',
  },
  {
    icon: HardHat,
    title: 'Industrial Facilities',
    description: 'Warehouses, manufacturing plants, and logistics centers designed for operational efficiency.',
  },
  {
    icon: Award,
    title: 'Design-Build',
    description: 'Integrated approach combining design and construction for streamlined project delivery.',
  },
];

export default function ConstructionCompany() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    details: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === activeTab);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Quote request submitted! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', projectType: '', details: '' });
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-gradient-to-b from-slate-900/90 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rotate-45">
              <HardHat className={`${scrolled ? 'text-white' : 'text-white'} -rotate-45`} size={24} />
            </div>
            <div className="ml-2">
              <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                APEX BUILD
              </span>
              <div className={`text-xs tracking-widest ${scrolled ? 'text-orange-600' : 'text-orange-400'}`}>
                CONSTRUCTION GROUP
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['projects', 'services', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`${
                  scrolled ? 'text-slate-700 hover:text-orange-600' : 'text-white hover:text-orange-400'
                } transition-colors capitalize tracking-wide text-sm font-medium`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-orange-600 text-white px-6 py-2.5 hover:bg-orange-700 transition-colors font-medium text-sm tracking-wide"
            >
              GET QUOTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            {['projects', 'services', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors capitalize tracking-wide font-medium"
              >
                {item}
              </button>
            ))}
            <div className="p-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-orange-600 text-white px-6 py-3 hover:bg-orange-700 transition-colors font-medium"
              >
                GET QUOTE
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pb-40 pt-50 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-block bg-orange-600 text-white px-4 py-2 text-sm font-bold tracking-wider mb-6">
              25 YEARS OF EXCELLENCE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Building the
              <br />
              <span className="text-orange-400">Future Today</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              Leading construction and development firm delivering exceptional commercial, 
              residential, and industrial projects with uncompromising quality and safety standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-orange-600 text-white px-8 py-4 hover:bg-orange-700 transition-all font-bold tracking-wide flex items-center gap-2 group"
              >
                VIEW PROJECTS
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-slate-900 transition-all font-bold tracking-wide"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Diagonal Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-2 origin-bottom-left" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-24 px-6 transition-opacity duration-1000 ${
          visibleSections.projects ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-orange-600">Projects</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore our portfolio of successfully completed projects across various sectors
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'commercial', 'residential', 'industrial'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold tracking-wide uppercase text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
                }}
                onClick={() => openProjectModal(project)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-orange-400 text-sm font-bold mb-2 tracking-wide">
                    {project.category} • {project.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <button className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                    View Details
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`py-24 px-6 bg-white transition-opacity duration-1000 ${
          visibleSections.services ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-orange-600">Services</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive construction solutions tailored to your project needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 p-8 border-l-4 border-orange-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-orange-600 w-16 h-16 flex items-center justify-center mb-6">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button className="text-orange-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-24 px-6 bg-slate-900 text-white transition-opacity duration-1000 ${
          visibleSections.about ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Building Excellence <span className="text-orange-400">Since 1999</span>
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              Apex Build Construction Group has been at the forefront of the construction 
              industry for over two decades, delivering projects that stand the test of time.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Our commitment to quality, safety, and innovation has made us the preferred 
              partner for clients seeking reliable construction solutions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                'Licensed & Insured',
                'OSHA Compliant',
                'On-Time Delivery',
                'Sustainable Practices',
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <CheckCircle2 className="text-orange-400 mx-auto mb-2" size={32} />
                  <span className="text-slate-200 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-orange-600 text-white px-8 py-4 hover:bg-orange-700 transition-colors font-bold tracking-wide">
              LEARN MORE ABOUT US
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-24 px-6 transition-opacity duration-1000 ${
          visibleSections.contact ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="text-orange-600">Project</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Ready to bring your vision to life? Contact us for a consultation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, title: 'Call Us', detail: '(555) 123-4567' },
              { icon: Mail, title: 'Email Us', detail: 'info@apexbuild.com' },
              { icon: MapPin, title: 'Visit Us', detail: '123 Construction Ave, Building City' },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="bg-white p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-orange-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{contact.title}</h3>
                  <p className="text-slate-600">{contact.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 p-12 max-w-3xl mx-auto">
            <h3 className="text-white text-2xl font-bold mb-6 text-center">
              Request a Quote
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="px-4 py-3 bg-white border border-slate-300 focus:border-orange-600 focus:outline-none w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="px-4 py-3 bg-white border border-slate-300 focus:border-orange-600 focus:outline-none w-full"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="px-4 py-3 bg-white border border-slate-300 focus:border-orange-600 focus:outline-none w-full"
                />
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-white border border-slate-300 focus:border-orange-600 focus:outline-none w-full"
                >
                  <option value="">Project Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Project Details"
                rows="5"
                className="px-4 py-3 bg-white border border-slate-300 focus:border-orange-600 focus:outline-none w-full"
              />
              <button 
                onClick={handleSubmit}
                className="w-full bg-orange-600 text-white px-8 py-4 hover:bg-orange-700 transition-colors font-bold tracking-wide"
              >
                SUBMIT REQUEST
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-600 p-2 rotate-45">
                  <HardHat className="text-white -rotate-45" size={24} />
                </div>
                <div className="ml-2">
                  <div className="text-lg font-bold">APEX BUILD</div>
                  <div className="text-xs text-orange-400 tracking-widest">CONSTRUCTION GROUP</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Building excellence since 1999
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Projects', 'Services', 'About', 'Careers'].map((link) => (
                  <div key={link}>
                    <button className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                      {link}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <div className="space-y-2">
                {['Commercial', 'Residential', 'Industrial', 'Design-Build'].map((service) => (
                  <div key={service}>
                    <button className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                      {service}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>(555) 123-4567</p>
                <p>info@apexbuild.com</p>
                <p>123 Construction Ave<br />Building City, BC 12345</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© Konstantin Stanmeyer</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Project Modals */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeProjectModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-50"
            onClick={closeProjectModal}
          >
            <X size={32} />
          </button>

          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Gallery */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-slate-900 mb-6">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 text-white transition-all"
                  >
                    <ChevronRight size={28} className="rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 text-white transition-all"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedProject.images.map((project, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImageIndex 
                        ? 'bg-orange-500 w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-orange-600 text-white px-3 py-1 text-sm font-bold">
                  {selectedProject.category}
                </span>
                <span className="text-slate-500 text-sm">
                  {selectedProject.year}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                {selectedProject.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}