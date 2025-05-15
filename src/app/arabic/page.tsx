'use client';

import React from 'react';
import { 
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BookOpenIcon,
  VideoCameraIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import FloatingCard from '@/components/FloatingCard';

export default function ArabicPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section for Arabic community */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent arabic-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Arabic Developer Community</h1>
          </div>
          
          <p className="text-xl max-w-3xl mx-auto mb-8">
            A dedicated space for Arabic-speaking developers to collaborate, learn, and build with Frontend Hamroun.
          </p>
          
          <div className="arabic-text text-2xl font-bold mb-4">
            مجتمع المطورين العرب
          </div>
          
          <p className="arabic-text text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            مساحة مخصصة للمطورين الناطقين باللغة العربية للتعاون والتعلم والبناء باستخدام فرونت-اند حمرون
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/getting-started" className="btn-primary px-8 py-3 rounded-full">
              ابدأ الان
            </Link>
            <Link href="/community" className="btn-secondary px-8 py-3 rounded-full">
              انضم إلى المجتمع
            </Link>
          </div>
        </div>
      </section>
      
      {/* Resources section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <BookOpenIcon className="w-8 h-8 text-primary" />
              Arabic Resources
              <span className="arabic-text mr-2">الموارد العربية</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Documentation in Arabic",
                arabicTitle: "التوثيق باللغة العربية",
                description: "Complete framework documentation translated to Arabic",
                arabicDesc: "توثيق كامل للإطار مترجم إلى اللغة العربية",
                icon: <DocumentTextIcon className="w-6 h-6" />,
                link: "/docs/ar"
              },
              {
                title: "Video Tutorials",
                arabicTitle: "دروس فيديو",
                description: "Step-by-step video guides in Arabic",
                arabicDesc: "دروس فيديو خطوة بخطوة باللغة العربية",
                icon: <VideoCameraIcon className="w-6 h-6" />,
                link: "/tutorials/ar"
              },
              {
                title: "RTL Component Library",
                arabicTitle: "مكتبة مكونات RTL",
                description: "Pre-built components optimized for right-to-left layouts",
                arabicDesc: "مكونات جاهزة محسنة لتخطيطات من اليمين إلى اليسار",
                icon: <RocketLaunchIcon className="w-6 h-6" />,
                link: "/components/rtl"
              },
              {
                title: "Arabic UI Kit",
                arabicTitle: "مجموعة واجهة المستخدم العربية",
                description: "Design system with Arabic typography and cultural nuances",
                arabicDesc: "نظام تصميم مع الطباعة العربية والفروق الثقافية",
                icon: <GlobeAltIcon className="w-6 h-6" />,
                link: "/ui-kit/ar"
              },
              {
                title: "Community Forums",
                arabicTitle: "منتديات المجتمع",
                description: "Discussions, questions, and answers in Arabic",
                arabicDesc: "مناقشات وأسئلة وإجابات باللغة العربية",
                icon: <UserGroupIcon className="w-6 h-6" />,
                link: "/forums/ar"
              },
              {
                title: "Arabic Blog",
                arabicTitle: "مدونة عربية",
                description: "Articles and tutorials written by the Arabic community",
                arabicDesc: "مقالات ودروس كتبها مجتمع اللغة العربية",
                icon: <BookOpenIcon className="w-6 h-6" />,
                link: "/blog/ar"
              }
            ].map((resource, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <FloatingCard className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                  <h4 className="arabic-text text-lg mb-3">{resource.arabicTitle}</h4>
                  <p className="text-sm text-foreground/70 mb-1">{resource.description}</p>
                  <p className="arabic-text text-sm text-foreground/70 mb-4">{resource.arabicDesc}</p>
                  <Link href={resource.link} className="text-primary hover:underline arabic-text text-right block">
                    عرض المزيد →
                  </Link>
                </FloatingCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Arabic Projects
            </h2>
            <h3 className="arabic-text text-2xl font-bold text-center mb-12">
              مشاريع عربية مميزة
            </h3>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              {
                title: "Souk Online",
                arabicTitle: "سوق أونلاين",
                description: "E-commerce platform built with Frontend Hamroun",
                arabicDesc: "منصة تجارة إلكترونية مبنية باستخدام فرونت-اند حمرون",
                image: "/images/projects/souk-online.jpg"
              },
              {
                title: "Kitab Reader",
                arabicTitle: "قارئ كتاب",
                description: "Digital book reader with RTL support",
                arabicDesc: "قارئ كتب رقمي مع دعم RTL",
                image: "/images/projects/kitab-reader.jpg"
              }
            ].map((project, index) => (
              <RevealOnScroll key={index} delay={index * 200}>
                <div className="bg-secondary/20 rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 w-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-lg italic text-primary">Project Screenshot</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <h4 className="arabic-text text-lg mb-3">{project.arabicTitle}</h4>
                    <p className="mb-1">{project.description}</p>
                    <p className="arabic-text mb-4">{project.arabicDesc}</p>
                    <Link href="#" className="text-primary hover:underline">
                      View Project
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join community CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/40 to-accent/40 text-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-2">Join Our Arabic Community</h2>
            <h3 className="arabic-text text-2xl font-bold mb-8">انضم إلى مجتمعنا العربي</h3>
            <p className="max-w-2xl mx-auto mb-8">Connect with other Arabic-speaking developers, share resources, and collaborate on projects using your native language.</p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="https://discord.gg/hamroun-arabic" className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-colors">
                Discord
              </Link>
              <Link href="https://github.com/hamroun/arabic-community" className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                GitHub
              </Link>
              <Link href="https://twitter.com/HamrounArabic" className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                Twitter
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
