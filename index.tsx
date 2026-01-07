

import { GoogleGenAI } from '@google/genai';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// Custom Components
const Logo = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24">
    <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" fill="#1e293b" />
    <text x="50" y="45" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="serif">DEEPIKA'S</text>
    <path d="M35 55 h5 v15 h-5 Z M42 55 h5 v15 h-5 Z M49 55 l4 -2 v17 l-4 0 Z" fill="#7dd3fc" />
    <text x="65" y="65" textAnchor="middle" fill="white" fontSize="12" fontStyle="italic" fontFamily="serif">Library</text>
  </svg>
);

// Fix: Making children optional to resolve TS error where nested JSX children aren't automatically matched to a required 'children' prop type
const SectionTitle = ({ children, subtitle }: { children?: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{children}</h2>
    {subtitle && <p className="text-gray-700 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    <div className="w-24 h-1 bg-gray-900 mx-auto mt-6"></div>
  </div>
);

function App() {
  const [query, setQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an assistant for Dr. Sanyam Bansal's mathematics institute, Deepika's Library. 
        Dr. Bansal has a PhD in Math and an ME from Panjab University. 
        He teaches +1, +2, and IIT-JEE. 
        Answer this query helpfully: ${query}`,
      });
      setQueryResponse(response.text || 'Dr. Bansal will get back to you soon.');
    } catch (error) {
      setQueryResponse('Unable to connect. Please call +91-7717540624.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-yellow-400/90 backdrop-blur-md border-b border-yellow-500/30 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dr. Sanyam Bansal</h1>
            <p className="text-xs uppercase tracking-widest opacity-70">Mathematics Excellence</p>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#about" className="hover:text-black transition-colors">The Mentor</a>
          <a href="#results" className="hover:text-black transition-colors">Results</a>
          <a href="#courses" className="hover:text-black transition-colors">Courses</a>
          <a href="#register" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-black transition-all">Enroll Now</a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-black text-yellow-400 text-sm font-bold mb-6">
            DISTRICT TOPPER 2025 MENTOR
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight mb-6">
            Master Mathematics with <span className="text-white underline decoration-black underline-offset-8">Dr. Sanyam Bansal</span>
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-xl leading-relaxed">
            PhD in Mathematics & ME from Panjab University. Dedicated coaching for +1, +2 Board Exams and IIT-JEE (Mains & Advanced).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#register" className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">Start Your Journey</a>
            <a href="tel:+917717540624" className="px-8 py-4 border-2 border-gray-900 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              Contact Dr. Bansal
            </a>
          </div>
        </div>
        <div className="flex-1 relative">
           <div className="w-full aspect-square bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30 flex items-center justify-center p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-20"></div>
              <Logo />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:-translate-y-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Legacy of Success</p>
                <p className="text-2xl font-serif font-bold">100% Board Scorers & IIT Qualifiers</p>
              </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Experience the difference of learning from a subject-matter expert.">The Academic Edge</SectionTitle>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold">Dr. Sanyam Bansal <span className="text-lg font-sans font-normal block mt-1 text-gray-500">PhD (Mathematics), ME (Panjab University, Chandigarh)</span></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a deep academic background and a passion for teaching, Dr. Bansal transforms complex mathematical concepts into intuitive insights. His methodology is focused on building strong fundamentals, critical for both board excellence and the rigorous requirements of IIT-JEE.
              </p>
              <ul className="space-y-4">
                {[
                  "PhD level expertise for advanced problem solving",
                  "Personalized attention to every student",
                  "Proven track record with Barnala District Toppers",
                  "Comprehensive study material for JEE Mains & Advanced"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                    </span>
                    <span className="font-medium text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100 flex flex-col justify-center text-center">
                <span className="text-5xl font-serif font-bold text-yellow-600 mb-2">2025</span>
                <span className="font-bold text-gray-900">District Topper Mentor</span>
              </div>
              <div className="bg-gray-900 p-8 rounded-3xl text-white flex flex-col justify-center text-center">
                <span className="text-5xl font-serif font-bold text-yellow-400 mb-2">100%</span>
                <span className="font-bold">Board Exam Scorers</span>
              </div>
              <div className="col-span-2 bg-yellow-400 p-8 rounded-3xl border border-yellow-500 flex flex-col justify-center text-center">
                <span className="text-4xl font-serif font-bold text-gray-900 mb-2">IIT-JEE</span>
                <span className="font-bold text-gray-800">Advanced Success Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="Targeted mathematics programs designed for clarity and result-oriented success.">Programs & Courses</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "+1 Mathematics", desc: "Building the foundation for higher math and competitive entrance exams.", color: "bg-white" },
            { title: "+2 Mathematics", desc: "Focused preparation for Board Exams with a goal of 100/100 marks.", color: "bg-white" },
            { title: "IIT-JEE Special", desc: "Rigorous coaching for Mains & Advanced with high-level problem solving.", color: "bg-gray-900 text-white" }
          ].map((course, i) => (
            <div key={i} className={`${course.color} p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform border border-black/5`}>
              <h4 className="text-2xl font-serif font-bold mb-4">{course.title}</h4>
              <p className="opacity-80 mb-8">{course.desc}</p>
              <button className={`w-full py-3 rounded-xl font-bold border-2 ${course.title.includes('Special') ? 'border-yellow-400 text-yellow-400' : 'border-gray-900 text-gray-900'}`}>Course Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive AI Assistant */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Ask Dr. Bansal's AI assistant about courses, fees, or even a math concept.">Smart Query Assistant</SectionTitle>
          <form onSubmit={handleQuerySubmit} className="mt-8 relative max-w-2xl mx-auto">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What are the timings for +2 JEE batch?"
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-lg outline-none focus:border-yellow-400 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="absolute right-3 top-3 bottom-3 px-6 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-300 transition-colors flex items-center gap-2"
            >
              {isLoading ? '...' : 'Ask'}
            </button>
          </form>
          {queryResponse && (
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-yellow-400 font-bold mb-2 uppercase text-xs tracking-widest">Assistant's Response:</p>
              <p className="text-lg leading-relaxed">{queryResponse}</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-black/5">
          <div className="flex-1 p-12 md:p-20 bg-yellow-400">
            <h3 className="text-4xl font-serif font-bold mb-6">Book a Free Demo Class</h3>
            <p className="text-lg font-medium text-gray-800 mb-8">Come visit us or fill the form to reserve a seat. Our batches fill up fast!</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                <div>
                  <p className="font-bold">Visit Us</p>
                  <p className="text-gray-700">Street No.3, Near S.D. College, Barnala</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                <div>
                  <p className="font-bold">Call Anytime</p>
                  <p className="text-gray-700 font-mono">+91-7717540624</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-12 md:p-20">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-500 uppercase">Student Name</label>
                  <input type="text" className="bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-500 uppercase">Class</label>
                  <select className="bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>+1 Non-Med</option>
                    <option>+2 Non-Med</option>
                    <option>IIT-JEE (Dropper)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase">Mobile Number</label>
                <input type="tel" className="bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase">Queries / Message</label>
                <textarea className="bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 h-32"></textarea>
              </div>
              <button type="button" className="w-full py-5 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-xl">Submit Registration</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <Logo />
              <h2 className="text-2xl font-serif font-bold">Deepika's Library</h2>
            </div>
            <p className="text-gray-500 max-w-md">Empowering Barnala's youth with world-class mathematics education since inception. Led by Dr. Sanyam Bansal.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-yellow-400">Connect with Dr. Bansal</p>
            <p className="text-lg">+91-7717540624</p>
            <p className="text-gray-500 text-sm">© 2025 Deepika's Library. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
