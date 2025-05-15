'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  StarIcon,
  RocketLaunchIcon,
  HeartIcon,
  CalendarDaysIcon,
  MapPinIcon,
  HashtagIcon,
  NewspaperIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import RevealOnScroll from '@/components/RevealOnScroll';
import FloatingCard from '@/components/FloatingCard';
import GlowButton from '@/components/GlowButton';

export default function CommunityPage() {
  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribedToNewsletter(true);
      setEmail('');
      // In a real app, you would send this to your API
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="community-pattern opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <GlobeAltIcon className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-4xl font-bold">One Culture, One Community</h1>
          </div>
          
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join a global community of developers building amazing experiences with Frontend Hamroun.
            Share knowledge, collaborate on projects, and grow together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlowButton
              href="https://discord.gg/hamroun-framework"
              className="px-6 py-3 rounded-full flex items-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Join Discord
            </GlowButton>
            
            <Link href="https://github.com/hamroun/frontend-hamroun" className="bg-secondary hover:bg-secondary/80 px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
            
            <Link href="/arabic" className="bg-transparent border border-foreground/20 hover:bg-secondary/50 px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
              <span className="arabic-text">العربية</span>
              Arabic Community
            </Link>
          </div>
          
          <div className="flex justify-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">75k+</div>
              <div className="text-foreground/60">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">120+</div>
              <div className="text-foreground/60">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">5k+</div>
              <div className="text-foreground/60">Open Source Contributors</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community channels section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">Connect With The Community</h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Discord',
                description: 'Join our Discord server for real-time discussions, help, and community events',
                icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
                link: 'https://discord.gg/hamroun-framework',
                linkText: 'Join Server'
              },
              {
                title: 'GitHub Discussions',
                description: 'Participate in technical discussions and help shape the future of the framework',
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>,
                link: 'https://github.com/hamroun/frontend-hamroun/discussions',
                linkText: 'View Discussions'
              },
              {
                title: 'Twitter',
                description: 'Follow us for news, tips, and updates about Frontend Hamroun and the community',
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>,
                link: 'https://twitter.com/hamroun',
                linkText: 'Follow Us'
              },
              {
                title: 'Community Forum',
                description: 'Our forum is perfect for longer discussions and knowledge sharing',
                icon: <UserGroupIcon className="w-8 h-8" />,
                link: '/forum',
                linkText: 'Browse Forum'
              },
              {
                title: 'Arabic Community',
                description: 'Resources, discussions and support in Arabic for Arabic-speaking developers',
                icon: <GlobeAltIcon className="w-8 h-8" />,
                link: '/arabic',
                linkText: 'Join Arabic Community'
              },
              {
                title: 'YouTube Channel',
                description: 'Tutorial videos, live streams, and event recordings',
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>,
                link: 'https://youtube.com/hamroun',
                linkText: 'Watch Videos'
              }
            ].map((channel, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <FloatingCard className="p-6 h-full flex flex-col">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                    {channel.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">{channel.description}</p>
                  <a 
                    href={channel.link} 
                    target={channel.link.startsWith('http') ? '_blank' : undefined}
                    rel={channel.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-primary hover:underline font-medium"
                  >
                    {channel.linkText} →
                  </a>
                </FloatingCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming events section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-4">Upcoming Community Events</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
              Join us at our virtual and in-person events to learn, share, and connect with the community
            </p>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Frontend Hamroun Conference',
                date: 'June 15-16, 2024',
                location: 'Virtual',
                description: 'Our annual conference with talks from core team members and community experts',
                tags: ['conference', 'virtual']
              },
              {
                title: 'Community Meetup - New York',
                date: 'April 28, 2024',
                location: 'New York, NY',
                description: 'In-person meetup with lightning talks and networking',
                tags: ['meetup', 'in-person']
              },
              {
                title: 'Arabic Developer Workshop',
                date: 'May 10, 2024',
                location: 'Virtual',
                description: 'Learn to build RTL-friendly applications with Frontend Hamroun',
                tags: ['workshop', 'arabic', 'virtual']
              }
            ].map((event, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className="bg-background rounded-lg shadow-md p-6 border border-primary/10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                      Upcoming
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2 text-foreground/70">
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    {event.date}
                  </div>
                  
                  <div className="flex items-center mb-4 text-foreground/70">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {event.location}
                  </div>
                  
                  <p className="mb-4 text-foreground/80">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs flex items-center">
                        <HashtagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-primary hover:underline text-sm">
                      Add to calendar
                    </button>
                    <button className="bg-primary text-white px-4 py-1.5 rounded-md text-sm">
                      RSVP
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/events" className="text-primary hover:underline font-medium">
              View all upcoming events →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Community spotlight section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
              <StarIcon className="w-8 h-8 text-primary mr-3" />
              Community Spotlight
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="bg-secondary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Featured Contributor</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-secondary/40 rounded-full mr-4"></div>
                  <div>
                    <div className="font-medium">Ahmed Hassan</div>
                    <div className="text-sm text-foreground/60">Core Team Member</div>
                  </div>
                </div>
                <p className="text-foreground/70 mb-4">
                  Ahmed has contributed over 120 pull requests to the core library and 
                  helped build our Arabic localization support.
                </p>
                <a href="#" className="text-primary hover:underline">Read Ahmed&apos;s Story →</a>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="bg-secondary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Featured Project</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-secondary/40 rounded-lg mr-4 flex items-center justify-center">
                    <RocketLaunchIcon className="w-8 h-8 text-primary/50" />
                  </div>
                  <div>
                    <div className="font-medium">Hamroun UI</div>
                    <div className="text-sm text-foreground/60">Component Library</div>
                  </div>
                </div>
                <p className="text-foreground/70 mb-4">
                  A beautiful component library built on top of Frontend Hamroun with 
                  over 50 customizable components.
                </p>
                <a href="#" className="text-primary hover:underline">View Project →</a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="py-16 bg-gradient-to-br from-primary/40 to-accent/40 text-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll>
            <div className="flex items-center justify-center mb-6">
              <NewspaperIcon className="w-10 h-10 mr-3" />
              <h2 className="text-3xl font-bold">Stay Connected</h2>
            </div>
            
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for community updates, tips, and announcements
            </p>
            
            {subscribedToNewsletter ? (
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto">
                <BellIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">You&apos;re subscribed!</h3>
                <p>Thank you for subscribing to our newsletter. You&apos;ll receive updates directly to your inbox!</p>
              </div>
            ) : (
              <form 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
                onSubmit={handleSubscribe}
              >
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-white text-primary font-medium rounded-full hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
            
            <p className="text-sm max-w-lg mx-auto mt-4 text-white/70">
              We send a monthly newsletter with community highlights, tutorials, and upcoming events. 
              You can unsubscribe at any time.
            </p>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Code of conduct section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
              <HeartIcon className="w-8 h-8 text-primary mr-3" />
              Our Community Values
            </h2>
            
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                The Frontend Hamroun community is dedicated to providing a welcoming and inclusive experience 
                for everyone, regardless of gender, gender identity and expression, sexual orientation, 
                disability, physical appearance, body size, race, age, religion, nationality, or level of experience.
              </p>
              
              <p>
                Our community thrives when we:
              </p>
              
              <ul>
                <li>Treat each other with respect and kindness</li>
                <li>Listen actively and consider different perspectives</li>
                <li>Support and encourage each other&apos;s growth and learning</li>
                <li>Welcome beginners and experienced developers alike</li>
                <li>Celebrate cultural diversity and international representation</li>
              </ul>
              
              <p>
                We are committed to these values in all community spaces, including online forums, chat channels, 
                social media, events, and conferences.
              </p>
              
              <div className="flex justify-center mt-8">
                <Link href="/code-of-conduct" className="bg-primary/10 text-primary px-6 py-3 rounded-lg hover:bg-primary/20 transition-colors">
                  Read our full Code of Conduct
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
