import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import type { Profile, ExperienceData, TechSkills, ContactInfo } from '../../types';

// Register fonts if needed, but standard fonts work fine for now.
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Inter',
    color: '#1f2937', // gray-800
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111827', // gray-900
  },
  title: {
    fontSize: 14,
    color: '#4b5563', // gray-600
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    fontSize: 10,
    color: '#6b7280', // gray-500
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'uppercase',
    color: '#4f46e5', // indigo-600
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gray-200
  },
  experienceItem: {
    marginBottom: 12,
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
    lineHeight: 1.4,
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
    gap: 16,
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
  skills: TechSkills;
  contact: ContactInfo;
}

export const CVDocument: React.FC<Props> = ({ profile, experiences, skills, contact }) => (
  <Document author={profile.name} title={`${profile.name} - CV`}>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{profile.name}</Text>
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
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{profile.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.work.slice(0, 4).map((exp, index) => ( // Show top 4 to fit page or use page wrapping
          <View key={index} style={styles.experienceItem} wrap={false}>
            <View style={styles.row}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
            </View>
            <Text style={styles.role}>{exp.role}</Text>
            <Text style={styles.description}>{exp.description}</Text>
            <View style={styles.techStackConfig}>
              {exp.techStack.slice(0, 8).map((tech, i) => (
                <Text key={i} style={styles.techBadge}>{tech}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillGroup}>
            <Text style={styles.skillCategory}>Runtime</Text>
            <Text style={styles.skillList}>{skills.runtime.map(s => s.name).join(', ')}</Text>
          </View>
          <View style={styles.skillGroup}>
            <Text style={styles.skillCategory}>Frontend</Text>
            <Text style={styles.skillList}>{skills.frontend.map(s => s.name).join(', ')}</Text>
          </View>
          <View style={styles.skillGroup}>
            <Text style={styles.skillCategory}>Backend</Text>
            <Text style={styles.skillList}>{skills.backend.map(s => s.name).join(', ')}</Text>
          </View>
          <View style={styles.skillGroup}>
            <Text style={styles.skillCategory}>DevOps & Cloud</Text>
            <Text style={styles.skillList}>{skills.devops.map(s => s.name).join(', ')}</Text>
          </View>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Education</Text>
        {experiences.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.row}>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
            </View>
            <Text style={styles.role}>{edu.degree}</Text>
          </View>
        ))}
      </View>

    </Page>
  </Document>
);
