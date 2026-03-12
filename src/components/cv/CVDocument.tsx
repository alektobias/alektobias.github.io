import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import type { Profile, ExperienceData, TechSkills, ContactInfo } from '../../types';

import cvSkills from '../../../docs/data/cv-skills.json';

// Standard fonts (Helvetica) are used by default
// Font.register({ ... }) removed to prevent network/CORS issues causing download failures

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    // fontFamily: 'Helvetica', // Default
    color: '#1f2937', // gray-800
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    alignItems: 'center', // Center content
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a', // Dark blue border
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1e3a8a', // Dark blue name
  },
  title: {
    fontSize: 14,
    color: '#4b5563', // gray-600
    marginBottom: 8,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    fontSize: 10,
    color: '#4b5563',
  },
  section: {
    marginBottom: 12,

  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#1e3a8a', // Dark blue section headers
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'baseline',
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  date: {
    fontSize: 10,
    color: '#6b7280',
  },
  role: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 4,
    color: '#374151',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.15,
    color: '#4b5563',
    marginBottom: 6,
  },
  techStackConfig: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  techBadge: {
    fontSize: 8,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#4b5563',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillGroup: {
    width: '45%',
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#374151',
  },
  skillList: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 8,
    color: '#4b5563',
  }
});

interface Props {
  profile: Profile;
  experiences: ExperienceData;
  contact: ContactInfo;
  lang?: string;
  ui?: any;
}

const formatDate = (dateStr: string, lang: string = 'en') => {
  if (!dateStr || dateStr.toLowerCase() === 'present') return dateStr;

  // Parse MM/YYYY
  const [month, year] = dateStr.split('/');
  if (!month || !year) return dateStr;

  try {
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const formatter = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' });
    const formatted = formatter.format(date);
    // Capitalize first letter for consistency (e.g. "dec 2026" -> "Dec 2026")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch (e) {
    return dateStr;
  }
};

export const CVDocument: React.FC<Props> = ({ profile, experiences, contact, lang = 'en', ui }) => (
  <Document author="Alek Tobias Barreira Lima" title="Alek Tobias Barreira Lima - CV">
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>Alek Tobias Barreira Lima</Text>
        <Text style={styles.title}>{profile.title[0]}</Text>
        <View style={styles.contactRow}>
          <Text>{contact.email}</Text>
          <Text>•</Text>
          <Text>{contact.github}</Text>
          <Text>•</Text>
          <Text>{contact.linkedin}</Text>
          <Text>•</Text>
          <Text>{profile.location}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{ui?.cv?.document?.summary || "Summary"}</Text>
        <Text style={styles.summary}>{profile.summary}</Text>
      </View>

      {/* Technical Skills (Moved UP) */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>{ui?.cv?.document?.technicalSkills || "Technical Skills"}</Text>
        <View style={[styles.skillsContainer, { justifyContent: 'space-between' }]}>
          <View style={{ width: '48%', marginBottom: 12 }}>
            <Text style={styles.skillCategory}>{ui?.cv?.document?.coreStack || "Core Stack & Expertise"}</Text>
            <Text style={styles.skillList}>{cvSkills.mainStack.join(', ')}</Text>
          </View>
          <View style={{ width: '48%', marginBottom: 12 }}>
            <Text style={styles.skillCategory}>{ui?.cv?.document?.professionalExperience || "Professional Experience & Familiarity"}</Text>
            <Text style={styles.skillList}>{cvSkills.workedWith.join(', ')}</Text>
          </View>
          <View style={{ width: '48%', marginBottom: 8 }}>
            <Text style={styles.skillCategory}>{ui?.cv?.document?.toolsPractices || "Tools & Practices"}</Text>
            <Text style={styles.skillList}>{cvSkills.toolsAndPractices.join(', ')}</Text>
          </View>
          <View style={{ width: '48%', marginBottom: 8 }}>
            <Text style={styles.skillCategory}>{ui?.cv?.document?.personalProjects || "Exploratory & Personal Projects"}</Text>
            <Text style={styles.skillList}>{cvSkills.hobbyist.join(', ')}</Text>
          </View>
        </View>
      </View>

      {/* Experience (Moved DOWN) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{ui?.cv?.document?.experience || "Experience"}</Text>
        {experiences.work.map((exp, index) => (
          <View key={index} style={styles.experienceItem} wrap={false}>
            <View style={styles.row}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>
                {formatDate(exp.startDate, lang)} - {exp.endDate === 'Present' ? (lang === 'pt' ? 'Atualmente' : exp.endDate) : formatDate(exp.endDate, lang)}
              </Text>
            </View>
            <Text style={styles.role}>{exp.role}</Text>

            {/* Description as bullet points */}
            {exp.description.split('.').map((sentence, i) => {
              const cleanSentence = sentence.trim();
              if (!cleanSentence) return null;
              return (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10, marginRight: 4, color: '#4b5563' }}>•</Text>
                  <Text style={{ ...styles.description, flex: 1, marginBottom: 0 }}>{cleanSentence}.</Text>
                </View>
              );
            })}

            <View style={{ ...styles.techStackConfig, marginTop: 4 }}>
              {exp.techStack.slice(0, 8).map((tech, i) => (
                <Text key={i} style={styles.techBadge}>{tech}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>{ui?.cv?.document?.education || "Education"}</Text>
        {experiences.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.row}>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.date}>
                {formatDate(edu.startDate, lang)} - {edu.endDate === 'Present' ? (lang === 'pt' ? 'Atualmente' : edu.endDate) : formatDate(edu.endDate, lang)}
              </Text>
            </View>
            <Text style={styles.role}>{edu.degree}</Text>
          </View>
        ))}
      </View>

    </Page>
  </Document>
);
