import React, { useState } from 'react';
import { 
  Twitter, 
  Linkedin, 
  Globe, 
  ChevronDown, 
  Heart, 
  Lightbulb, 
  Building2, 
  DollarSign, 
  Share2, 
  Users,
  Trophy,
  Briefcase,
  Clock
} from 'lucide-react';

export default function InvestorProfile() {
  const [expandedSection, setExpandedSection] = useState<string | null>('passion');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Share CTA Button */}
      <div className="flex-shrink-0 sticky top-0 z-10 p-3 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/80 backdrop-blur-sm">
        <button className="w-full group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-70 transition duration-300" />
          <div className="relative w-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 backdrop-blur-sm">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share Sarah's Profile</span>
          </div>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-investor">
        <div className="bg-gradient-to-b from-[#0B0F19] via-[#0D1225] to-[#0B0F19] p-6">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                alt="Sarah Anderson"
                className="w-full h-full object-cover rounded-full ring-4 ring-[#0D1225]"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Sarah Anderson</h1>
            <p className="text-lg text-indigo-400 mb-3">Partner at Innovation Capital</p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3 mb-6">
              <a href="#" className="p-2 rounded-full bg-gray-800/50 text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800/50 text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800/50 text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-yellow-500 mb-2">
                  <Trophy className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xl font-bold text-white">20+</div>
                <div className="text-sm text-gray-400">Exits</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-purple-500 mb-2">
                  <Briefcase className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Investments</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-green-500 mb-2">
                  <Clock className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {/* Passion Section */}
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('passion')}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="font-medium text-white">Passion</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === 'passion' ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedSection === 'passion' && (
                <div className="px-4 pb-4">
                  <p className="text-gray-300">
                    Empowering visionary founders who are reshaping industries through innovative technology. 
                    I'm particularly excited about startups tackling climate change, healthcare accessibility, 
                    and AI-driven solutions.
                  </p>
                </div>
              )}
            </div>

            {/* Investment Thesis */}
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('thesis')}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-white">Investment Thesis</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === 'thesis' ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedSection === 'thesis' && (
                <div className="px-4 pb-4">
                  <p className="text-gray-300">
                    I focus on early-stage startups with strong technical foundations and clear market validation. 
                    Looking for founders who deeply understand their market and have a unique approach to solving 
                    significant problems.
                  </p>
                </div>
              )}
            </div>

            {/* Industries */}
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('industries')}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-white">Industries</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === 'industries' ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedSection === 'industries' && (
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-indigo-300">AI/ML</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-indigo-300">Climate Tech</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-indigo-300">Healthcare</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-indigo-300">Enterprise SaaS</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-indigo-300">Fintech</span>
                  </div>
                </div>
              )}
            </div>

            {/* Check Size */}
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('checkSize')}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-white">Check Size</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === 'checkSize' ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedSection === 'checkSize' && (
                <div className="px-4 pb-4">
                  <p className="text-gray-300">
                    Initial investments typically range from $500K to $2M, with additional capital reserved for follow-on 
                    rounds in our top-performing portfolio companies.
                  </p>
                </div>
              )}
            </div>

            {/* Community Stats */}
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>1,247 founders have connected with Sarah this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}