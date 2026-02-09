import React, { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';
import type { Profile, ExperienceData, TechSkills, ContactInfo } from '../../types';

interface CVLogicProps {
  profile: Profile;
  experiences: ExperienceData;
  skills: TechSkills;
  contact: ContactInfo;
  lang?: string;
  ui?: any;
  onStateChange: (state: { url: string | null; loading: boolean; error: any }) => void;
}

const CVLogic: React.FC<CVLogicProps> = ({
  profile,
  experiences,
  skills,
  contact,
  lang,
  ui,
  onStateChange
}) => {
  const [instance, updateInstance] = usePDF({
    document: (
      <CVDocument
        profile={profile}
        experiences={experiences}
        skills={skills}
        contact={contact}
        lang={lang}
        ui={ui}
      />
    )
  });

  useEffect(() => {
    onStateChange({
      url: instance.url,
      loading: instance.loading,
      error: instance.error
    });
  }, [instance.url, instance.loading, instance.error, onStateChange]);

  // This component doesn't render anything visible
  return null;
};

export default CVLogic;
