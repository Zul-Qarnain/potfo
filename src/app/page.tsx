
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkillBar } from '@/components/home/SkillBar';
import { skillsData, profileLinks, educationData, experienceData, skillsSectionData, resumeUrl } from '@/lib/data';
import * as LucideIcons from 'lucide-react';

// Helper function to get Lucide icon component by name
const getIcon = (iconName: string): React.ElementType => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle; // Fallback icon
};

export default function HomePage() {
  const EducationIcon = getIcon(educationData.icon);
  const ExperienceIcon = getIcon(experienceData.icon);
  const SkillsIcon = getIcon(skillsSectionData.icon);

  const programmingSkills = skillsData.filter(skill => skill.category === 'Programming Languages');
  const toolsFrameworksSkills = skillsData.filter(skill => skill.category === 'Tools & Frameworks');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section id="home" className="section-container pt-12 md:pt-20">
        <div className="grid md:grid-cols-3 gap-12 items-start"> {/* Changed items-center to items-start for better alignment with longer text */}
          {/* Left Column: Text Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline leading-tight">
                Hi, I&apos;m <span className="text-primary">Mohammad Shihab Hossain</span>
              </h1>
              <div className="mt-6 text-lg text-muted-foreground max-w-2xl space-y-4">
                <p>
                  I am a highly motivated and aspiring AI researcher with a strong background in deep learning, quantum computing, and web development. Over the past year, I have gained extensive experience in web development using React, application development, and have achieved proficiency in 14 programming languages. I have hands-on experience with PyTorch and large language models (LLMs), and I have also published a research paper focusing on Artificial Intelligence and LLMs.
                </p>
                <p>
                  My aspiration is to harness the power of AI to address some of the most pressing challenges of our time—such as cancer treatment, renewable energy solutions, and longevity—through the integration of AI with quantum physics, a field often referred to as Quantum AI. I am deeply interested in how AI can be used to create innovative, transformative solutions that contribute to a better future.
                </p>
                <p>
                  Currently, I am pursuing my undergraduate degree in Computer Science at American International University-Bangladesh (AIUB). My academic focus is on advancing computing technologies and making everyday life easier through intelligent, cutting-edge systems.
                </p>
                <p>
                  I am committed to continuing my research in AI and quantum computing, with a goal of contributing to pioneering innovations that solve real-world problems and shape the future of technology.
                </p>
              </div>
            </div>

            {/* Education Section */}
            <div className="animate-fade-in-up animation-delay-200 bg-card p-6 rounded-lg shadow-md border border-border">
              <div className="flex items-center mb-4">
                <EducationIcon className="mr-3 h-7 w-7 text-primary" />
                <h2 className="text-2xl font-headline font-semibold text-foreground">
                  Education
                </h2>
              </div>
              <p className="text-muted-foreground">
                Currently pursuing a {educationData.major} at <strong className="text-foreground">{educationData.university}</strong>.
              </p>
            </div>

            {/* Experience Section */}
             <div className="animate-fade-in-up animation-delay-400 bg-card p-6 rounded-lg shadow-md border border-border">
              <div className="flex items-center mb-4">
                <ExperienceIcon className="mr-3 h-7 w-7 text-primary" />
                <h2 className="text-2xl font-headline font-semibold text-foreground">
                  Experience
                </h2>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">
                {experienceData.summary}
              </p>
            </div>
          </div>

          {/* Right Column: Image and Links */}
          <div className="md:col-span-1 flex flex-col items-center md:items-center space-y-6 animate-fade-in-right mt-8 md:mt-0"> {/* Added mt-8 for spacing on small screens */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Mohammad Shihab Hossain - Profile Picture"
                width={400}
                height={400}
                className="rounded-full object-cover border-4 border-primary shadow-lg"
                priority
                data-ai-hint="profile portrait"
              />
            </div>
            <div className="flex space-x-4">
              {profileLinks.map((link) => {
                const Icon = getIcon(link.icon as string);
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </Link>
                );
              })}
            </div>
            <Button asChild size="lg" className="w-full max-w-xs shadow-md hover:shadow-lg transition-shadow">
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                View My Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="section-container bg-muted/30 dark:bg-muted/10 py-16 md:py-24 rounded-lg my-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-4 flex items-center justify-center">
            <SkillsIcon className="mr-3 h-8 w-8 text-primary" />
            My Skills
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Here&apos;s a snapshot of my technical capabilities and expertise.
          </p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-6 text-primary">Programming Languages</h3>
              {programmingSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} />
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-6 text-primary">Tools & Frameworks</h3>
              {toolsFrameworksSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
